import { SpriteAnimation, TortiAnimation } from './torti.types';

export const SPRITE_SHEET_WIDTH = 1536;
export const SPRITE_SHEET_HEIGHT = 1024;
export const SPRITE_SHEET_URL = '/assets/characters/torti/torti-sprites.png';

// Normalized bounding boxes based on the 1536x1024 sprite sheet
export const TORTI_ANIMATIONS: Record<TortiAnimation, SpriteAnimation> = {
  // Row 1: Idle Breathing / Stance (4 frames)
  idle: {
    fps: 4,
    loop: true,
    frames: [
      { x: 43, y: 7, width: 118, height: 129, anchorX: 59, anchorY: 129 },
      { x: 226, y: 8, width: 122, height: 128, anchorX: 61, anchorY: 128 },
      { x: 415, y: 8, width: 121, height: 128, anchorX: 60, anchorY: 128 },
      { x: 600, y: 8, width: 123, height: 128, anchorX: 61, anchorY: 128 },
    ],
  },

  // Row 2: Walk Cycle with Backpack (9 frames)
  walk: {
    fps: 9,
    loop: true,
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

  // Row 3: Talk Cycle / Explaining (6 frames)
  talk: {
    fps: 6,
    loop: true,
    frames: [
      { x: 40, y: 297, width: 129, height: 133, anchorX: 64, anchorY: 133 },
      { x: 210, y: 296, width: 129, height: 134, anchorX: 64, anchorY: 134 },
      { x: 375, y: 298, width: 138, height: 133, anchorX: 69, anchorY: 133 },
      { x: 548, y: 298, width: 131, height: 132, anchorX: 65, anchorY: 132 },
      { x: 708, y: 298, width: 131, height: 133, anchorX: 65, anchorY: 133 },
      { x: 879, y: 298, width: 130, height: 134, anchorX: 65, anchorY: 134 },
    ],
  },

  // Row 4: Happy Reaction / Celebration (4 frames)
  happy: {
    fps: 5,
    loop: false,
    frames: [
      { x: 42, y: 438, width: 124, height: 125, anchorX: 62, anchorY: 125 },
      { x: 210, y: 437, width: 138, height: 126, anchorX: 69, anchorY: 126 },
      { x: 388, y: 444, width: 128, height: 118, anchorX: 64, anchorY: 118 },
      { x: 566, y: 441, width: 125, height: 121, anchorX: 62, anchorY: 121 },
    ],
  },

  // Row 5: Surprised Reaction (4 frames)
  surprised: {
    fps: 5,
    loop: false,
    frames: [
      { x: 40, y: 572, width: 118, height: 119, anchorX: 59, anchorY: 119 },
      { x: 212, y: 572, width: 124, height: 119, anchorX: 62, anchorY: 119 },
      { x: 380, y: 569, width: 124, height: 123, anchorX: 62, anchorY: 123 },
      { x: 559, y: 570, width: 121, height: 123, anchorX: 60, anchorY: 123 },
    ],
  },

  // Row 6: Thinking / Inspecting (4 frames)
  thinking: {
    fps: 4,
    loop: false,
    frames: [
      { x: 42, y: 697, width: 113, height: 128, anchorX: 56, anchorY: 128 },
      { x: 212, y: 699, width: 119, height: 126, anchorX: 59, anchorY: 126 },
      { x: 389, y: 700, width: 138, height: 125, anchorX: 69, anchorY: 125 },
      { x: 569, y: 698, width: 107, height: 118, anchorX: 53, anchorY: 118 },
    ],
  },

  // Row 6 (subset): Pointing Gesture (4 frames)
  point: {
    fps: 4,
    loop: false,
    frames: [
      { x: 42, y: 697, width: 113, height: 128, anchorX: 56, anchorY: 128 },
      { x: 389, y: 700, width: 138, height: 125, anchorX: 69, anchorY: 125 },
      { x: 569, y: 698, width: 107, height: 118, anchorX: 53, anchorY: 118 },
      { x: 212, y: 699, width: 119, height: 126, anchorX: 59, anchorY: 126 },
    ],
  },

  // Row 7: Sad / Tired / Slumped (4 frames)
  sad: {
    fps: 4,
    loop: false,
    frames: [
      { x: 43, y: 825, width: 133, height: 110, anchorX: 66, anchorY: 110 },
      { x: 228, y: 825, width: 127, height: 110, anchorX: 63, anchorY: 110 },
      { x: 428, y: 825, width: 157, height: 108, anchorX: 78, anchorY: 108 },
      { x: 713, y: 825, width: 138, height: 103, anchorX: 69, anchorY: 103 },
    ],
  },

  // Row 8: Sleeping inside shell (4 frames)
  sleep: {
    fps: 3,
    loop: true,
    frames: [
      { x: 41, y: 935, width: 123, height: 89, anchorX: 61, anchorY: 89 },
      { x: 227, y: 935, width: 114, height: 89, anchorX: 57, anchorY: 89 },
      { x: 395, y: 935, width: 117, height: 89, anchorX: 58, anchorY: 89 },
      { x: 562, y: 935, width: 114, height: 89, anchorX: 57, anchorY: 89 },
    ],
  },
};
