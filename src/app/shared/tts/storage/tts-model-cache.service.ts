import { Injectable, inject } from '@angular/core';
import { OpfsStorageService } from './opfs-storage.service';
import { TtsProgress } from '../tts.types';

export const TTS_MODEL_CACHE_VERSION = '1.1.0';

export const REQUIRED_MODEL_FILES = [
  'tts.json',
  'unicode_indexer.json',
  'duration_predictor.onnx',
  'text_encoder.onnx',
  'vector_estimator.onnx',
  'vocoder.onnx',
] as const;

export type RequiredModelFile = (typeof REQUIRED_MODEL_FILES)[number];

export interface TtsModelManifest {
  version: string;
  files: string[];
  createdAt: string;
}

const OPFS_DIR = 'supertonic';
const OPFS_MODELS_DIR = `${OPFS_DIR}/models`;
const OPFS_MANIFEST_PATH = `${OPFS_DIR}/manifest.json`;
const ESTIMATED_TOTAL_BYTES = 420 * 1024 * 1024; // ~420 MB total for all ONNX model assets

@Injectable({ providedIn: 'root' })
export class TtsModelCacheService {
  private readonly opfsStorage = inject(OpfsStorageService);

  get storage(): OpfsStorageService {
    return this.opfsStorage;
  }

  /**
   * Checks if OPFS is supported in the current environment.
   */
  isOpfsSupported(): boolean {
    return this.opfsStorage.isSupported();
  }

  /**
   * Requests persistent storage if supported, preventing browser from evicting cached models.
   */
  async requestPersistence(): Promise<boolean> {
    if (typeof navigator === 'undefined' || !navigator.storage?.persist) {
      return false;
    }
    try {
      const isPersisted = await navigator.storage.persisted();
      if (isPersisted) return true;
      return await navigator.storage.persist();
    } catch {
      return false;
    }
  }

  /**
   * Verifies that the browser has enough estimated storage quota for the model files.
   */
  async checkStorageQuota(requiredBytes = ESTIMATED_TOTAL_BYTES): Promise<boolean> {
    if (typeof navigator === 'undefined' || !navigator.storage?.estimate) {
      return true; // Assume sufficient if quota estimation is not supported
    }
    try {
      const { quota, usage } = await navigator.storage.estimate();
      if (quota !== undefined && usage !== undefined) {
        const available = quota - usage;
        if (available < requiredBytes) {
          console.warn(
            `[TTS] Insufficient storage quota. Required: ~${(requiredBytes / 1024 / 1024).toFixed(1)}MB, Available: ${(available / 1024 / 1024).toFixed(1)}MB`,
          );
          return false;
        }
      }
      return true;
    } catch {
      return true;
    }
  }

  /**
   * Validates whether all required model files exist in OPFS and match the current version.
   */
  async isCacheValid(): Promise<boolean> {
    if (!this.isOpfsSupported()) {
      return false;
    }

    console.log('[TTS] Checking OPFS model cache');

    try {
      const manifestExists = await this.opfsStorage.fileExists(OPFS_MANIFEST_PATH);
      if (!manifestExists) {
        console.log('[TTS] Model cache missing');
        return false;
      }

      const manifestContent = await this.opfsStorage.readText(OPFS_MANIFEST_PATH);
      const manifest = JSON.parse(manifestContent) as TtsModelManifest;

      if (!manifest || manifest.version !== TTS_MODEL_CACHE_VERSION) {
        console.log(
          `[TTS] Model cache version changed (found: ${manifest?.version ?? 'none'}, expected: ${TTS_MODEL_CACHE_VERSION})`,
        );
        return false;
      }

      // Verify every required file exists and is non-empty / valid
      for (const fileName of REQUIRED_MODEL_FILES) {
        const filePath = `${OPFS_MODELS_DIR}/${fileName}`;
        const exists = await this.opfsStorage.fileExists(filePath);
        if (!exists) {
          console.log(`[TTS] Model cache missing required file: ${fileName}`);
          return false;
        }

        // Check if an ONNX file in cache is a corrupted Git LFS text pointer file
        if (fileName.endsWith('.onnx')) {
          const fileSize = await this.opfsStorage.getFileSize(filePath);
          if (fileSize < 1000) {
            const sampleText = await this.opfsStorage.readText(filePath).catch(() => '');
            if (sampleText.startsWith('version https://git-lfs')) {
              console.warn(`[TTS] Corrupted Git LFS pointer found in OPFS cache for ${fileName}`);
              await this.opfsStorage.deleteFile(OPFS_MANIFEST_PATH);
              return false;
            }
          }
        }
      }

      console.log('[TTS] Model cache found');
      return true;
    } catch (err) {
      console.warn('[TTS] Error checking OPFS cache validity:', err);
      return false;
    }
  }

  /**
   * Ensures all required Supertonic model files are stored in OPFS.
   * Downloads missing files sequentially to minimize peak memory consumption.
   */
  async ensureModelsCached(
    baseUrl: string,
    progressCallback?: (progress: TtsProgress) => void,
  ): Promise<boolean> {
    if (!this.isOpfsSupported()) {
      console.log('[TTS] OPFS unavailable, using fallback');
      return false;
    }

    const isValid = await this.isCacheValid();
    if (isValid) {
      return true;
    }

    // Cache is missing, incomplete, or outdated
    await this.requestPersistence();
    await this.checkStorageQuota();

    // Invalidate incomplete/old cache files before downloading
    await this.opfsStorage.deleteFile(OPFS_MANIFEST_PATH);
    await this.opfsStorage.createDirectory(OPFS_MODELS_DIR);

    const totalFiles = REQUIRED_MODEL_FILES.length;
    const cleanBaseUrl = baseUrl.replace(/\/+$/, '');

    try {
      for (let i = 0; i < totalFiles; i++) {
        const fileName = REQUIRED_MODEL_FILES[i];
        const stepNum = i + 1;
        const targetPath = `${OPFS_MODELS_DIR}/${fileName}`;

        // Check if individual file is already valid (e.g. from previous partial run)
        const alreadyExists = await this.opfsStorage.fileExists(targetPath);
        if (alreadyExists) {
          progressCallback?.({
            step: stepNum,
            total: totalFiles,
            message: `Verifying cached asset ${stepNum}/${totalFiles}: ${fileName}...`,
          });
          continue;
        }

        console.log(`[TTS] Downloading model: ${fileName}`);
        progressCallback?.({
          step: stepNum,
          total: totalFiles,
          message: `Downloading TTS model ${stepNum}/${totalFiles}: ${fileName}...`,
        });

        const fileUrl = `${cleanBaseUrl}/${fileName}`;
        const response = await fetch(fileUrl);
        if (!response.ok) {
          throw new Error(
            `Failed to download model file ${fileName} (${response.status} ${response.statusText})`,
          );
        }

        const arrayBuffer = await response.arrayBuffer();

        // Check if the downloaded ONNX file is a Git LFS pointer file instead of real binary weights
        if (fileName.endsWith('.onnx') && arrayBuffer.byteLength < 2000) {
          const headerText = new TextDecoder().decode(
            new Uint8Array(arrayBuffer, 0, Math.min(64, arrayBuffer.byteLength)),
          );
          if (headerText.startsWith('version https://git-lfs')) {
            throw new Error(
              `Model file ${fileName} is a Git LFS pointer file (not the real binary model). Ensure Git LFS pulled real files on your hosting platform.`,
            );
          }
        }

        console.log(`[TTS] Saving model to OPFS: ${fileName}`);
        progressCallback?.({
          step: stepNum,
          total: totalFiles,
          message: `Saving to persistent OPFS storage: ${fileName}...`,
        });

        await this.opfsStorage.writeFile(targetPath, arrayBuffer);
        // Explicitly let arrayBuffer go out of scope before the next download to free RAM
      }

      // Write manifest only after ALL files have been successfully stored
      const manifest: TtsModelManifest = {
        version: TTS_MODEL_CACHE_VERSION,
        files: [...REQUIRED_MODEL_FILES],
        createdAt: new Date().toISOString(),
      };

      await this.opfsStorage.writeFile(OPFS_MANIFEST_PATH, JSON.stringify(manifest, null, 2));
      console.log('[TTS] Model cache saved successfully to OPFS');
      return true;
    } catch (err) {
      console.error('[TTS] Failed to cache models into OPFS:', err);
      // Remove manifest so cache is not marked valid
      await this.opfsStorage.deleteFile(OPFS_MANIFEST_PATH);
      throw err;
    }
  }

  /**
   * Reads a model file from OPFS as an ArrayBuffer.
   */
  async loadModelAsArrayBuffer(fileName: string): Promise<ArrayBuffer> {
    const filePath = `${OPFS_MODELS_DIR}/${fileName}`;
    return await this.opfsStorage.readFile(filePath);
  }

  /**
   * Reads and parses a JSON model file from OPFS.
   */
  async loadModelAsJson<T>(fileName: string): Promise<T> {
    const filePath = `${OPFS_MODELS_DIR}/${fileName}`;
    const text = await this.opfsStorage.readText(filePath);
    return JSON.parse(text) as T;
  }

  /**
   * Invalidates and clears the model cache from OPFS.
   */
  async invalidateCache(): Promise<void> {
    if (!this.isOpfsSupported()) return;
    await this.opfsStorage.deleteFile(OPFS_MANIFEST_PATH);
    await this.opfsStorage.clearDirectory(OPFS_MODELS_DIR);
  }
}
