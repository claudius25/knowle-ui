export type TortiAnimation =
  | 'idle'
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
  | 'walking'
  | 'talking'
  | 'reacting'
  | 'sleeping';

export type TortiReaction = 'happy' | 'surprised' | 'thinking' | 'sad';

export type FacingDirection = 'left' | 'right';

export interface SpriteFrame {
  x: number;
  y: number;
  width: number;
  height: number;
  anchorX?: number; // relative horizontal center in pixels
  anchorY?: number; // relative bottom ground baseline in pixels
}

export interface SpriteAnimation {
  frames: SpriteFrame[];
  fps: number;
  loop: boolean;
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
