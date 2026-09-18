import { TortiPose } from './torti.types';

export const TORTI_POSE_BASE_URL = '/assets/torti';

// Reference height (px) the static poses are designed around; used to compute scale.
export const TORTI_POSE_BASE_HEIGHT = 724;

export const TORTI_POSES: readonly TortiPose[] = [
  'idle',
  'wave',
  'happy',
  'sad',
  'rage',
  'thumbs-up',
  'thumbs-down',
  'heart',
  'clueless',
  'elvis',
  'explorer',
  'gotyou',
  'jako',
  'photo',
  'tennis',
];

export function tortiPoseUrl(pose: TortiPose): string {
  return `${TORTI_POSE_BASE_URL}/${pose}.png`;
}

/** Poses suitable for a "happy reaction" (e.g. correct answer, clicked happily). */
export const TORTI_HAPPY_POSES: readonly TortiPose[] = [
  'happy',
  'wave',
  'heart',
  'photo',
  'thumbs-up',
  'gotyou',
  'elvis',
  'tennis',
  'jako',
];
