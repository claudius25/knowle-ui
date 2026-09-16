import * as ort from 'onnxruntime-web';
import { UnicodeProcessor } from './unicode-processor';
import { writeWavFile } from './wav-writer';
import {
  ExecutionProvider,
  SupertonicConfig,
  TtsConfig,
  TtsLanguage,
  TtsProgress,
  VoiceStyleRaw,
} from '../tts.types';
import { OpfsStorageService } from '../storage/opfs-storage.service';
import {
  REQUIRED_MODEL_FILES,
  TTS_MODEL_CACHE_VERSION,
  TtsModelManifest,
} from '../storage/tts-model-cache.service';

export class Style {
  constructor(
    public readonly ttl: ort.Tensor,
    public readonly dp: ort.Tensor,
  ) {}
}

export class SupertonicEngine {
  private dpSession: ort.InferenceSession | null = null;
  private textEncSession: ort.InferenceSession | null = null;
  private vectorEstSession: ort.InferenceSession | null = null;
  private vocoderSession: ort.InferenceSession | null = null;
  private textProcessor: UnicodeProcessor | null = null;
  private cfgs: SupertonicConfig | null = null;
  private voiceStyles = new Map<string, Style>();
  private activeProvider: ExecutionProvider = 'wasm';
  private initialized = false;

  get isInitialized(): boolean {
    return this.initialized;
  }

  get provider(): ExecutionProvider {
    return this.activeProvider;
  }

  get sampleRate(): number {
    return this.cfgs?.ae.sample_rate ?? 44100;
  }

  async init(
    config: TtsConfig,
    progressCallback?: (progress: TtsProgress) => void,
  ): Promise<ExecutionProvider> {
    const notify = (step: number, total: number, message: string): void => {
      progressCallback?.({ step, total, message });
    };

    notify(1, 6, 'Configuring ONNX Web runtime...');

    // Configure WASM paths
    if (config.wasmBasePath) {
      const base = config.wasmBasePath;
      const isAbsolute = base.startsWith('http://') || base.startsWith('https://');
      const origin =
        typeof self !== 'undefined' && self.location && self.location.origin
          ? self.location.origin
          : typeof window !== 'undefined' && window.location && window.location.origin
            ? window.location.origin
            : '';
      const resolvedWasmPath =
        isAbsolute || !origin ? base : `${origin}${base.startsWith('/') ? '' : '/'}${base}`;
      ort.env.wasm.wasmPaths = resolvedWasmPath;
    }
    // Set 1 thread to avoid requiring COOP/COEP headers for SharedArrayBuffer
    ort.env.wasm.numThreads = 1;

    notify(2, 6, 'Loading model configurations and tokenizer...');

    // Check if OPFS cache is available
    const opfsStorage = new OpfsStorageService();
    let useOpfs = false;

    if (opfsStorage.isSupported()) {
      try {
        const manifestExists = await opfsStorage.fileExists('supertonic/manifest.json');
        if (manifestExists) {
          const manifestText = await opfsStorage.readText('supertonic/manifest.json');
          const manifest = JSON.parse(manifestText) as TtsModelManifest;
          if (manifest && manifest.version === TTS_MODEL_CACHE_VERSION) {
            let allFilesPresent = true;
            for (const file of REQUIRED_MODEL_FILES) {
              const filePresent = await opfsStorage.fileExists(`supertonic/models/${file}`);
              if (!filePresent) {
                allFilesPresent = false;
                break;
              }
            }
            if (allFilesPresent) {
              useOpfs = true;
            }
          }
        }
      } catch (err) {
        console.warn('[TTS] Could not verify OPFS cache in engine:', err);
        useOpfs = false;
      }
    }

    if (useOpfs) {
      console.log('[TTS] Loading models from OPFS');
      const cfgText = await opfsStorage.readText('supertonic/models/tts.json');
      this.cfgs = JSON.parse(cfgText) as SupertonicConfig;

      const indexerText = await opfsStorage.readText('supertonic/models/unicode_indexer.json');
      const indexer = JSON.parse(indexerText) as number[];
      this.textProcessor = new UnicodeProcessor(indexer);
    } else {
      console.log('[TTS] OPFS unavailable, using fallback');
      const [cfgResponse, indexerResponse] = await Promise.all([
        fetch(`${config.modelBasePath}/tts.json`),
        fetch(`${config.modelBasePath}/unicode_indexer.json`),
      ]);

      if (!cfgResponse.ok || !indexerResponse.ok) {
        throw new Error('Failed to load Supertonic configuration or unicode indexer.');
      }

      this.cfgs = (await cfgResponse.json()) as SupertonicConfig;
      const indexer = (await indexerResponse.json()) as number[];
      this.textProcessor = new UnicodeProcessor(indexer);
    }

    // 2. Load ONNX models with WebGPU preferred, WASM fallback
    const modelDefinitions = [
      { name: 'Duration Predictor', file: 'duration_predictor.onnx' },
      { name: 'Text Encoder', file: 'text_encoder.onnx' },
      { name: 'Vector Estimator', file: 'vector_estimator.onnx' },
      { name: 'Vocoder', file: 'vocoder.onnx' },
    ];

    let chosenProvider: ExecutionProvider = 'wasm';
    const tryProviders: ExecutionProvider[] = config.preferWebGpu ? ['webgpu', 'wasm'] : ['wasm'];

    let loadedSessions: ort.InferenceSession[] | null = null;

    for (const ep of tryProviders) {
      try {
        notify(3, 6, `Initializing neural sessions via ${ep.toUpperCase()}...`);
        const sessionOptions: ort.InferenceSession.SessionOptions = {
          executionProviders: [ep],
          graphOptimizationLevel: 'all',
        };

        const sessions: ort.InferenceSession[] = [];
        for (let i = 0; i < modelDefinitions.length; i++) {
          const model = modelDefinitions[i];
          notify(3 + i, 6, `Loading ${model.name} (${ep.toUpperCase()})...`);

          let session: ort.InferenceSession;
          if (useOpfs) {
            const buffer = await opfsStorage.readFile(`supertonic/models/${model.file}`);
            session = await ort.InferenceSession.create(new Uint8Array(buffer), sessionOptions);
          } else {
            session = await ort.InferenceSession.create(
              `${config.modelBasePath}/${model.file}`,
              sessionOptions,
            );
          }
          sessions.push(session);
        }

        loadedSessions = sessions;
        chosenProvider = ep;
        break;
      } catch (err) {
        console.warn(`Failed to initialize models with ${ep}:`, err);
        if (ep === 'webgpu' && tryProviders.includes('wasm')) {
          notify(3, 6, 'WebGPU unavailable. Falling back to WebAssembly...');
        } else {
          throw err;
        }
      }
    }

    if (!loadedSessions || loadedSessions.length < 4) {
      throw new Error('Failed to instantiate ONNX model sessions.');
    }

    this.dpSession = loadedSessions[0];
    this.textEncSession = loadedSessions[1];
    this.vectorEstSession = loadedSessions[2];
    this.vocoderSession = loadedSessions[3];
    this.activeProvider = chosenProvider;

    // 3. Load default voice
    notify(6, 6, `Loading voice preset (${config.defaultVoice})...`);
    await this.loadVoiceStyle(
      config.defaultVoice,
      `${config.modelBasePath}/../voice_styles/${config.defaultVoice}.json`,
    );

    this.initialized = true;
    return this.activeProvider;
  }

  async loadVoiceStyle(voiceName: string, voicePath: string): Promise<Style> {
    if (this.voiceStyles.has(voiceName)) {
      return this.voiceStyles.get(voiceName)!;
    }

    const response = await fetch(voicePath);
    if (!response.ok) {
      throw new Error(`Failed to fetch voice style from ${voicePath}`);
    }

    const raw = (await response.json()) as VoiceStyleRaw;
    const ttlDims = raw.style_ttl.dims;
    const dpDims = raw.style_dp.dims;

    const ttlDim1 = ttlDims[1];
    const ttlDim2 = ttlDims[2];
    const dpDim1 = dpDims[1];
    const dpDim2 = dpDims[2];

    const ttlData = (raw.style_ttl.data as number[][][]).flat(2);
    const dpData = (raw.style_dp.data as number[][][]).flat(2);

    const ttlFlat = new Float32Array(ttlData);
    const dpFlat = new Float32Array(dpData);

    const ttlTensor = new ort.Tensor('float32', ttlFlat, [1, ttlDim1, ttlDim2]);
    const dpTensor = new ort.Tensor('float32', dpFlat, [1, dpDim1, dpDim2]);

    const style = new Style(ttlTensor, dpTensor);
    this.voiceStyles.set(voiceName, style);
    return style;
  }

  async synthesize(
    text: string,
    lang: TtsLanguage,
    voiceName: string,
    speed = 1.05,
    totalStep = 4,
    silenceDuration = 0.25,
    progressCallback?: (progress: TtsProgress) => void,
  ): Promise<{ wavBuffer: ArrayBuffer; duration: number; sampleRate: number }> {
    if (
      !this.initialized ||
      !this.dpSession ||
      !this.textEncSession ||
      !this.vectorEstSession ||
      !this.vocoderSession ||
      !this.textProcessor ||
      !this.cfgs
    ) {
      throw new Error('Supertonic engine is not initialized.');
    }

    let style = this.voiceStyles.get(voiceName);
    if (!style) {
      style =
        this.voiceStyles.get('F1') ||
        this.voiceStyles.get('M1') ||
        this.voiceStyles.values().next().value;
      if (!style) {
        throw new Error(`Voice ${voiceName} is not loaded.`);
      }
    }

    const maxLen = lang === 'ko' || lang === 'ja' ? 120 : 300;
    const chunks = this.chunkText(text, maxLen);
    if (chunks.length === 0) {
      throw new Error('No text to synthesize.');
    }

    let concatenatedWav: number[] = [];
    let totalDuration = 0;

    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      const chunkIndex = i + 1;
      const totalChunks = chunks.length;

      const { wav, duration } = await this.inferSingle(
        chunk,
        lang,
        style,
        totalStep,
        speed,
        (currentStep, maxSteps) => {
          progressCallback?.({
            step: currentStep + (chunkIndex - 1) * maxSteps,
            total: totalChunks * maxSteps,
            message: `Synthesizing part ${chunkIndex}/${totalChunks} (Step ${currentStep}/${maxSteps})...`,
          });
        },
      );

      if (concatenatedWav.length === 0) {
        concatenatedWav = wav;
        totalDuration = duration;
      } else {
        const silenceSamples = Math.floor(silenceDuration * this.sampleRate);
        const silence = new Array<number>(silenceSamples).fill(0);
        concatenatedWav = [...concatenatedWav, ...silence, ...wav];
        totalDuration += duration + silenceDuration;
      }
    }

    const wavBuffer = writeWavFile(concatenatedWav, this.sampleRate);
    return {
      wavBuffer,
      duration: totalDuration,
      sampleRate: this.sampleRate,
    };
  }

  private async inferSingle(
    text: string,
    lang: TtsLanguage,
    style: Style,
    totalStep: number,
    speed: number,
    stepCallback?: (step: number, total: number) => void,
  ): Promise<{ wav: number[]; duration: number }> {
    const bsz = 1;
    const { textIds, textMask } = this.textProcessor!.call([text], [lang]);

    const textIdsFlat = new BigInt64Array(textIds.flat().map((x) => BigInt(x)));
    const textIdsTensor = new ort.Tensor('int64', textIdsFlat, [bsz, textIds[0].length]);

    const textMaskFlat = new Float32Array(textMask.flat(2));
    const textMaskTensor = new ort.Tensor('float32', textMaskFlat, [bsz, 1, textMask[0][0].length]);

    // 1. Predict duration
    const dpOutputs = await this.dpSession!.run({
      text_ids: textIdsTensor,
      style_dp: style.dp,
      text_mask: textMaskTensor,
    });
    const durationArr = Array.from(dpOutputs['duration'].data as Float32Array);
    const duration = durationArr[0] / speed;

    // 2. Encode text
    const textEncOutputs = await this.textEncSession!.run({
      text_ids: textIdsTensor,
      style_ttl: style.ttl,
      text_mask: textMaskTensor,
    });
    const textEmb = textEncOutputs['text_emb'];

    // 3. Sample noisy latent
    let { xt, latentMask } = this.sampleNoisyLatent(
      [duration],
      this.sampleRate,
      this.cfgs!.ae.base_chunk_size,
      this.cfgs!.ttl.chunk_compress_factor,
      this.cfgs!.ttl.latent_dim,
    );

    const latentMaskFlat = new Float32Array(latentMask.flat(2));
    const latentMaskTensor = new ort.Tensor('float32', latentMaskFlat, [
      bsz,
      1,
      latentMask[0][0].length,
    ]);

    const totalStepTensor = new ort.Tensor('float32', new Float32Array([totalStep]), [bsz]);

    // 4. Flow-matching iterative denoising loop
    for (let step = 0; step < totalStep; step++) {
      stepCallback?.(step + 1, totalStep);

      const currentStepTensor = new ort.Tensor('float32', new Float32Array([step]), [bsz]);
      const xtFlat = new Float32Array(xt.flat(2));
      const xtTensor = new ort.Tensor('float32', xtFlat, [bsz, xt[0].length, xt[0][0].length]);

      const vectorEstOutputs = await this.vectorEstSession!.run({
        noisy_latent: xtTensor,
        text_emb: textEmb,
        style_ttl: style.ttl,
        latent_mask: latentMaskTensor,
        text_mask: textMaskTensor,
        current_step: currentStepTensor,
        total_step: totalStepTensor,
      });

      const denoised = Array.from(vectorEstOutputs['denoised_latent'].data as Float32Array);

      // Reshape back to 3D: [bsz, latentDim, latentLen]
      const latentDim = xt[0].length;
      const latentLen = xt[0][0].length;
      xt = [];
      let idx = 0;
      for (let b = 0; b < bsz; b++) {
        const batch: number[][] = [];
        for (let d = 0; d < latentDim; d++) {
          const row: number[] = [];
          for (let t = 0; t < latentLen; t++) {
            row.push(denoised[idx++]);
          }
          batch.push(row);
        }
        xt.push(batch);
      }
    }

    // 5. Vocoder synthesis
    const finalXtFlat = new Float32Array(xt.flat(2));
    const finalXtTensor = new ort.Tensor('float32', finalXtFlat, [
      bsz,
      xt[0].length,
      xt[0][0].length,
    ]);

    const vocoderOutputs = await this.vocoderSession!.run({
      latent: finalXtTensor,
    });

    const wavData = Array.from(vocoderOutputs['wav_tts'].data as Float32Array);

    // Sanitize and check for NaN or infinite values produced by GPU driver bugs
    let hasInvalid = false;
    for (let i = 0; i < wavData.length; i++) {
      if (!isFinite(wavData[i]) || isNaN(wavData[i])) {
        wavData[i] = 0;
        hasInvalid = true;
      }
    }

    if (hasInvalid) {
      console.warn('Supertonic TTS: Detected NaN or non-finite audio samples in model output.');
    }

    return { wav: wavData, duration };
  }

  private sampleNoisyLatent(
    duration: number[],
    sampleRate: number,
    baseChunkSize: number,
    chunkCompress: number,
    latentDim: number,
  ): { xt: number[][][]; latentMask: number[][][] } {
    const bsz = duration.length;
    const maxDur = Math.max(...duration);

    const wavLenMax = Math.floor(maxDur * sampleRate);
    const wavLengths = duration.map((d) => Math.floor(d * sampleRate));

    const chunkSize = baseChunkSize * chunkCompress;
    const latentLen = Math.floor((wavLenMax + chunkSize - 1) / chunkSize);
    const latentDimVal = latentDim * chunkCompress;

    const xt: number[][][] = [];
    for (let b = 0; b < bsz; b++) {
      const batch: number[][] = [];
      for (let d = 0; d < latentDimVal; d++) {
        const row: number[] = [];
        for (let t = 0; t < latentLen; t++) {
          // Box-Muller transform for standard Gaussian noise
          const u1 = Math.max(0.0001, Math.random());
          const u2 = Math.random();
          const val = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
          row.push(val);
        }
        batch.push(row);
      }
      xt.push(batch);
    }

    const latentLengths = wavLengths.map((len) => Math.floor((len + chunkSize - 1) / chunkSize));
    const latentMask = this.lengthToMask(latentLengths, latentLen);

    for (let b = 0; b < bsz; b++) {
      for (let d = 0; d < latentDimVal; d++) {
        for (let t = 0; t < latentLen; t++) {
          xt[b][d][t] *= latentMask[b][0][t];
        }
      }
    }

    return { xt, latentMask };
  }

  private lengthToMask(lengths: number[], maxLen: number | null = null): number[][][] {
    const actualMaxLen = maxLen || Math.max(...lengths);
    return lengths.map((len) => {
      const row = new Array<number>(actualMaxLen).fill(0.0);
      for (let j = 0; j < Math.min(len, actualMaxLen); j++) {
        row[j] = 1.0;
      }
      return [row];
    });
  }

  private chunkText(text: string, maxLen = 300): string[] {
    if (typeof text !== 'string') {
      return [];
    }

    const paragraphs = text
      .trim()
      .split(/\n\s*\n+/)
      .filter((p) => p.trim());
    const chunks: string[] = [];

    for (let paragraph of paragraphs) {
      paragraph = paragraph.trim();
      if (!paragraph) continue;

      const sentences = paragraph.split(
        /(?<!Mr\.|Mrs\.|Ms\.|Dr\.|Prof\.|Sr\.|Jr\.|Ph\.D\.|etc\.|e\.g\.|i\.e\.|vs\.|Inc\.|Ltd\.|Co\.|Corp\.|St\.|Ave\.|Blvd\.)(?<!\b[A-Z]\.)(?<=[.!?])\s+/,
      );

      let currentChunk = '';
      for (const sentence of sentences) {
        if (currentChunk.length + sentence.length + 1 <= maxLen) {
          currentChunk += (currentChunk ? ' ' : '') + sentence;
        } else {
          if (currentChunk) {
            chunks.push(currentChunk.trim());
          }
          currentChunk = sentence;
        }
      }

      if (currentChunk) {
        chunks.push(currentChunk.trim());
      }
    }

    return chunks;
  }
}
