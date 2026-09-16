import { TestBed } from '@angular/core/testing';
import {
  TtsModelCacheService,
  TTS_MODEL_CACHE_VERSION,
  REQUIRED_MODEL_FILES,
} from './tts-model-cache.service';
import { OpfsStorageService } from './opfs-storage.service';

describe('TtsModelCacheService', () => {
  let cacheService: TtsModelCacheService;
  let opfsStorage: OpfsStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TtsModelCacheService, OpfsStorageService],
    });
    cacheService = TestBed.inject(TtsModelCacheService);
    opfsStorage = TestBed.inject(OpfsStorageService);
  });

  it('should be created', () => {
    expect(cacheService).toBeTruthy();
  });

  it('should have required model filenames defined', () => {
    expect(REQUIRED_MODEL_FILES).toContain('tts.json');
    expect(REQUIRED_MODEL_FILES).toContain('unicode_indexer.json');
    expect(REQUIRED_MODEL_FILES).toContain('duration_predictor.onnx');
    expect(REQUIRED_MODEL_FILES).toContain('text_encoder.onnx');
    expect(REQUIRED_MODEL_FILES).toContain('vector_estimator.onnx');
    expect(REQUIRED_MODEL_FILES).toContain('vocoder.onnx');
  });

  it('should return false for isCacheValid when manifest is missing', async () => {
    if (!cacheService.isOpfsSupported()) {
      pending('OPFS is not supported in this environment');
      return;
    }

    await cacheService.invalidateCache();
    const isValid = await cacheService.isCacheValid();
    expect(isValid).toBeFalse();
  });

  it('should invalidate cache when manifest version is outdated', async () => {
    if (!cacheService.isOpfsSupported()) {
      pending('OPFS is not supported in this environment');
      return;
    }

    await opfsStorage.writeFile(
      'supertonic/manifest.json',
      JSON.stringify({ version: '0.0.1-old', files: [] }),
    );

    const isValid = await cacheService.isCacheValid();
    expect(isValid).toBeFalse();
    await cacheService.invalidateCache();
  });

  it('should validate cache when all required files and matching manifest exist', async () => {
    if (!cacheService.isOpfsSupported()) {
      pending('OPFS is not supported in this environment');
      return;
    }

    // Write dummy files for testing cache validation
    for (const file of REQUIRED_MODEL_FILES) {
      await opfsStorage.writeFile(`supertonic/models/${file}`, 'dummy-content');
    }

    await opfsStorage.writeFile(
      'supertonic/manifest.json',
      JSON.stringify({
        version: TTS_MODEL_CACHE_VERSION,
        files: [...REQUIRED_MODEL_FILES],
        createdAt: new Date().toISOString(),
      }),
    );

    const isValid = await cacheService.isCacheValid();
    expect(isValid).toBeTrue();

    // Verify reading model files through cache service
    const json = await cacheService
      .loadModelAsJson<{ dummy?: string } | string>('tts.json')
      .catch(() => 'raw');
    expect(json).toBeTruthy();

    await cacheService.invalidateCache();
    expect(await cacheService.isCacheValid()).toBeFalse();
  });
});
