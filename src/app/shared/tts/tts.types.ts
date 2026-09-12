export type SupportedTtsLanguage =
  | 'en'
  | 'ko'
  | 'ja'
  | 'ar'
  | 'bg'
  | 'cs'
  | 'da'
  | 'de'
  | 'el'
  | 'es'
  | 'et'
  | 'fi'
  | 'fr'
  | 'hi'
  | 'hr'
  | 'hu'
  | 'id'
  | 'it'
  | 'lt'
  | 'lv'
  | 'nl'
  | 'pl'
  | 'pt'
  | 'ro'
  | 'ru'
  | 'sk'
  | 'sl'
  | 'sv'
  | 'tr'
  | 'uk'
  | 'vi'
  | 'na';

export type TtsLanguage = 'ro' | 'en' | SupportedTtsLanguage;

export type ExecutionProvider = 'webgpu' | 'wasm';

export type TtsStatus = 'uninitialized' | 'loading' | 'ready' | 'generating' | 'speaking' | 'error';

export interface TtsProgress {
  step: number;
  total: number;
  message: string;
}

export interface TtsConfig {
  modelBasePath: string;
  wasmBasePath: string;
  defaultVoice: string;
  preferWebGpu: boolean;
  totalStep: number;
  speed: number;
}

export interface TtsOptions {
  lang?: TtsLanguage;
  voice?: string;
  speed?: number;
  steps?: number;
  silenceDuration?: number;
}

export interface VoiceStyleRaw {
  style_ttl: {
    dims: number[];
    data: number[] | number[][] | number[][][];
  };
  style_dp: {
    dims: number[];
    data: number[] | number[][] | number[][][];
  };
}

export interface SupertonicConfig {
  ae: {
    sample_rate: number;
    base_chunk_size: number;
  };
  ttl: {
    chunk_compress_factor: number;
    latent_dim: number;
  };
}

// Worker message protocol
export type WorkerRequest =
  | {
      id: string;
      type: 'INIT';
      config: TtsConfig;
    }
  | {
      id: string;
      type: 'SYNTHESIZE';
      text: string;
      lang: TtsLanguage;
      voice: string;
      speed: number;
      steps: number;
      silenceDuration: number;
    }
  | {
      id: string;
      type: 'LOAD_VOICE';
      voice: string;
      voicePath: string;
    }
  | {
      id: string;
      type: 'CANCEL';
    };

export type WorkerResponse =
  | {
      id: string;
      type: 'INIT_SUCCESS';
      provider: ExecutionProvider;
      sampleRate: number;
    }
  | {
      id: string;
      type: 'SYNTHESIZE_SUCCESS';
      audioBuffer: ArrayBuffer;
      duration: number;
      sampleRate: number;
    }
  | {
      id: string;
      type: 'LOAD_VOICE_SUCCESS';
      voice: string;
    }
  | {
      id: string;
      type: 'PROGRESS';
      progress: TtsProgress;
    }
  | {
      id: string;
      type: 'ERROR';
      error: string;
    };
