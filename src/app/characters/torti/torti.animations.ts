import { SpriteAnimation, TortiAnimation } from './torti.types';

export const SPRITE_SHEET_WIDTH = 2172;
export const SPRITE_SHEET_HEIGHT = 724;
export const SPRITE_SHEET_URL = '/assets/characters/torti/idle_sprite.png';

export const TORTI_ANIMATIONS: Record<TortiAnimation, SpriteAnimation> = {
  // New Dedicated Idle Sprite Sheet (3 frames, 2172x724 -> 3 frames of 724x724)
  idle: {
    fps: 3,
    loop: true,
    spriteSheetUrl: '/assets/characters/torti/idle_sprite.png',
    sheetWidth: 2172,
    sheetHeight: 724,
    frames: [
      { x: 0, y: 0, width: 724, height: 724, anchorX: 362, anchorY: 600 },
      { x: 724, y: 0, width: 724, height: 724, anchorX: 362, anchorY: 600 },
      { x: 1448, y: 0, width: 724, height: 724, anchorX: 362, anchorY: 600 },
    ],
  },

  // New Dedicated Wave Sprite Sheet (3 frames, 2172x724 -> 3 frames of 724x724)
  wave: {
    fps: 4,
    loop: false,
    spriteSheetUrl: '/assets/characters/torti/wave_sprite.png',
    sheetWidth: 2172,
    sheetHeight: 724,
    frames: [
      { x: 0, y: 0, width: 724, height: 724, anchorX: 362, anchorY: 600 },
      { x: 724, y: 0, width: 724, height: 724, anchorX: 362, anchorY: 600 },
      { x: 1448, y: 0, width: 724, height: 724, anchorX: 362, anchorY: 600 },
    ],
  },

  // Existing fallback animations mapped to general sheet or aliasable
  walk: {
    fps: 9,
    loop: true,
    spriteSheetUrl: '/assets/characters/torti/torti-sprites.png',
    sheetWidth: 1536,
    sheetHeight: 1024,
    frames: [
      { x: 34, y: 147, width: 136, height: 131, anchorX: 68, anchorY: 131 },
      { x: 195, y: 146, width: 143, height: 132, anchorX: 71, anchorY: 132 },
      { x: 368, y: 148, width: 147, height: 130, anchorX: 73, anchorY: 130 },
      { x: 536, y: 147, width: 142, height: 130, anchorX: 71, anchorY: 130 },
      { x: 702, y: 146, width: 150, height: 131, anchorX: 75, anchorY: 131 },
      { x: 873, y: 146, width: 143, height: 132, anchorX: 71, anchorY: 132 },
      { x: 1040, y: 145, width: 145, height: 132, anchorX: 72, anchorY: 132 },
      { x: 1206, y: 145, width: 141, height: 131, anchorX: 70, anchorY: 131 },
      { x: 1374, y: 144, width: 133, height: 131, anchorX: 66, anchorY: 131 },
    ],
  },

  talk: {
    fps: 4,
    loop: true,
    spriteSheetUrl: '/assets/characters/torti/wave_sprite.png',
    sheetWidth: 2172,
    sheetHeight: 724,
    frames: [
      { x: 0, y: 0, width: 724, height: 724, anchorX: 362, anchorY: 600 },
      { x: 724, y: 0, width: 724, height: 724, anchorX: 362, anchorY: 600 },
      { x: 1448, y: 0, width: 724, height: 724, anchorX: 362, anchorY: 600 },
      { x: 724, y: 0, width: 724, height: 724, anchorX: 362, anchorY: 600 },
    ],
  },

  happy: {
    fps: 4,
    loop: false,
    spriteSheetUrl: '/assets/characters/torti/wave_sprite.png',
    sheetWidth: 2172,
    sheetHeight: 724,
    frames: [
      { x: 0, y: 0, width: 724, height: 724, anchorX: 362, anchorY: 600 },
      { x: 724, y: 0, width: 724, height: 724, anchorX: 362, anchorY: 600 },
      { x: 1448, y: 0, width: 724, height: 724, anchorX: 362, anchorY: 600 },
    ],
  },

  surprised: {
    fps: 4,
    loop: false,
    spriteSheetUrl: '/assets/characters/torti/wave_sprite.png',
    sheetWidth: 2172,
    sheetHeight: 724,
    frames: [
      { x: 724, y: 0, width: 724, height: 724, anchorX: 362, anchorY: 600 },
      { x: 1448, y: 0, width: 724, height: 724, anchorX: 362, anchorY: 600 },
      { x: 0, y: 0, width: 724, height: 724, anchorX: 362, anchorY: 600 },
    ],
  },

  thinking: {
    fps: 3,
    loop: false,
    spriteSheetUrl: '/assets/characters/torti/idle_sprite.png',
    sheetWidth: 2172,
    sheetHeight: 724,
    frames: [
      { x: 0, y: 0, width: 724, height: 724, anchorX: 362, anchorY: 600 },
      { x: 724, y: 0, width: 724, height: 724, anchorX: 362, anchorY: 600 },
      { x: 1448, y: 0, width: 724, height: 724, anchorX: 362, anchorY: 600 },
    ],
  },

  point: {
    fps: 4,
    loop: false,
    spriteSheetUrl: '/assets/characters/torti/wave_sprite.png',
    sheetWidth: 2172,
    sheetHeight: 724,
    frames: [
      { x: 0, y: 0, width: 724, height: 724, anchorX: 362, anchorY: 600 },
      { x: 724, y: 0, width: 724, height: 724, anchorX: 362, anchorY: 600 },
      { x: 1448, y: 0, width: 724, height: 724, anchorX: 362, anchorY: 600 },
    ],
  },

  sad: {
    fps: 3,
    loop: false,
    spriteSheetUrl: '/assets/characters/torti/idle_sprite.png',
    sheetWidth: 2172,
    sheetHeight: 724,
    frames: [
      { x: 1448, y: 0, width: 724, height: 724, anchorX: 362, anchorY: 600 },
      { x: 724, y: 0, width: 724, height: 724, anchorX: 362, anchorY: 600 },
      { x: 0, y: 0, width: 724, height: 724, anchorX: 362, anchorY: 600 },
    ],
  },

  sleep: {
    fps: 2,
    loop: true,
    spriteSheetUrl: '/assets/characters/torti/idle_sprite.png',
    sheetWidth: 2172,
    sheetHeight: 724,
    frames: [
      { x: 1448, y: 0, width: 724, height: 724, anchorX: 362, anchorY: 600 },
      { x: 724, y: 0, width: 724, height: 724, anchorX: 362, anchorY: 600 },
    ],
  },
};
