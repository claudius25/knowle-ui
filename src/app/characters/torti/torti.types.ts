export type TortiAnimation =
  | 'idle'
  | 'wave'
  | 'walk'
  | 'talk'
  | 'happy'
  | 'surprised'
  | 'thinking'
  | 'point'
  | 'sad'
  | 'sleep';

export type TortiState =
  | 'idle'
  | 'waving'
  | 'walking'
  | 'talking'
  | 'reacting'
  | 'sleeping';

export type TortiReaction = 'happy' | 'surprised' | 'thinking' | 'sad' | 'wave';

export type FacingDirection = 'left' | 'right';

export interface SpriteFrame {
  x: number;
  y: number;
  width: number;
  height: number;
  anchorX?: number; // relative horizontal center in pixels
  anchorY?: number; // relative bottom ground baseline in pixels
  spriteSheetUrl?: string; // Optional per-frame or per-animation sprite sheet
  sheetWidth?: number;
  sheetHeight?: number;
}

export interface SpriteAnimation {
  frames: SpriteFrame[];
  fps: number;
  loop: boolean;
  spriteSheetUrl: string;
  sheetWidth: number;
  sheetHeight: number;
}

export interface TortiPosition {
  x: number;
  y: number;
}

export interface WalkOptions {
  speed?: number; // pixels per second (default: 160)
  facing?: FacingDirection;
}

export interface SpeechOptions {
  durationMs?: number;
  autoStop?: boolean;
}
