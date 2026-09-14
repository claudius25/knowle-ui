export type TortiPose =
  | 'idle'
  | 'wave'
  | 'happy'
  | 'sad'
  | 'rage'
  | 'thumbs-up'
  | 'thumbs-down'
  | 'heart'
  | 'clueless'
  | 'elvis'
  | 'explorer'
  | 'gotyou'
  | 'jako'
  | 'photo'
  | 'tennis';

export type FacingDirection = 'left' | 'right';

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
