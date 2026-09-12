/// <reference lib="webworker" />

import { SupertonicEngine } from './engine/tts-engine';
import { WorkerRequest, WorkerResponse } from './tts.types';

const engine = new SupertonicEngine();

addEventListener('message', async ({ data }: MessageEvent<WorkerRequest>) => {
  const req = data;
  if (!req || !req.type) return;

  try {
    switch (req.type) {
      case 'INIT': {
        const provider = await engine.init(req.config, (progress) => {
          const resp: WorkerResponse = {
            id: req.id,
            type: 'PROGRESS',
            progress,
          };
          postMessage(resp);
        });

        const resp: WorkerResponse = {
          id: req.id,
          type: 'INIT_SUCCESS',
          provider,
          sampleRate: engine.sampleRate,
        };
        postMessage(resp);
        break;
      }

      case 'LOAD_VOICE': {
        await engine.loadVoiceStyle(req.voice, req.voicePath);
        const resp: WorkerResponse = {
          id: req.id,
          type: 'LOAD_VOICE_SUCCESS',
          voice: req.voice,
        };
        postMessage(resp);
        break;
      }

      case 'SYNTHESIZE': {
        const { wavBuffer, duration, sampleRate } = await engine.synthesize(
          req.text,
          req.lang,
          req.voice,
          req.speed,
          req.steps,
          req.silenceDuration,
          (progress) => {
            const resp: WorkerResponse = {
              id: req.id,
              type: 'PROGRESS',
              progress,
            };
            postMessage(resp);
          }
        );

        const resp: WorkerResponse = {
          id: req.id,
          type: 'SYNTHESIZE_SUCCESS',
          audioBuffer: wavBuffer,
          duration,
          sampleRate,
        };
        postMessage(resp, [wavBuffer]);
        break;
      }

      case 'CANCEL': {
        // Handled gracefully
        break;
      }
    }
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    const resp: WorkerResponse = {
      id: req.id,
      type: 'ERROR',
      error: errorMessage,
    };
    postMessage(resp);
  }
});
