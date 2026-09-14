import { BehaviorSubject, Observable } from 'rxjs';
import { FacingDirection, TortiPose, TortiPosition, WalkOptions } from './torti.types';

const DEFAULT_REACTION_HOLD_MS = 1800;

export class TortiCharacter {
  private poseSubject = new BehaviorSubject<TortiPose>('idle');
  private positionSubject = new BehaviorSubject<TortiPosition>({ x: 0, y: 0 });
  private facingSubject = new BehaviorSubject<FacingDirection>('right');
  private isTalkingSubject = new BehaviorSubject<boolean>(false);

  readonly pose$: Observable<TortiPose> = this.poseSubject.asObservable();
  readonly position$: Observable<TortiPosition> = this.positionSubject.asObservable();
  readonly facing$: Observable<FacingDirection> = this.facingSubject.asObservable();
  readonly isTalking$: Observable<boolean> = this.isTalkingSubject.asObservable();

  private walkRafId: number | null = null;
  private activeMoveResolve: (() => void) | null = null;
  private reactionTimeout: number | null = null;

  constructor(
    initialPosition: TortiPosition = { x: 0, y: 0 },
    initialFacing: FacingDirection = 'right',
    initialPose: TortiPose = 'idle',
  ) {
    this.positionSubject.next(initialPosition);
    this.facingSubject.next(initialFacing);
    this.poseSubject.next(initialPose);
  }

  get pose(): TortiPose {
    return this.poseSubject.value;
  }

  get position(): TortiPosition {
    return this.positionSubject.value;
  }

  get facing(): FacingDirection {
    return this.facingSubject.value;
  }

  get isTalking(): boolean {
    return this.isTalkingSubject.value;
  }

  setPosition(x: number, y: number): void {
    this.positionSubject.next({ x, y });
  }

  setFacing(direction: FacingDirection): void {
    this.facingSubject.next(direction);
  }

  /** Transition to a new pose and stay there. */
  setPose(pose: TortiPose): Promise<void> {
    this.clearReactionTimeout();
    this.poseSubject.next(pose);
    return Promise.resolve();
  }

  /** Transition to a pose temporarily, then return to idle. */
  react(pose: TortiPose, holdMs = DEFAULT_REACTION_HOLD_MS): Promise<void> {
    this.clearReactionTimeout();
    this.poseSubject.next(pose);

    return new Promise((resolve) => {
      this.reactionTimeout = window.setTimeout(() => {
        this.reactionTimeout = null;
        this.poseSubject.next('idle');
        resolve();
      }, holdMs);
    });
  }

  startTalking(): void {
    this.isTalkingSubject.next(true);
  }

  stopTalking(): void {
    this.isTalkingSubject.next(false);
  }

  setTalking(talking: boolean): void {
    if (talking) {
      this.startTalking();
    } else {
      this.stopTalking();
    }
  }

  walkTo(targetX: number, targetY: number, options?: WalkOptions): Promise<void> {
    this.cancelMovement();

    return new Promise((resolve) => {
      this.activeMoveResolve = resolve;
      const startPos = this.positionSubject.value;
      const dx = targetX - startPos.x;
      const dy = targetY - startPos.y;
      const distance = Math.hypot(dx, dy);

      if (distance < 1) {
        this.setPosition(targetX, targetY);
        resolve();
        return;
      }

      // Determine facing direction
      if (options?.facing) {
        this.setFacing(options.facing);
      } else if (Math.abs(dx) > 2) {
        this.setFacing(dx > 0 ? 'right' : 'left');
      }

      const speed = options?.speed ?? 160; // px/sec
      const durationMs = (distance / speed) * 1000;
      const startTime = performance.now();

      const step = (now: number): void => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / durationMs, 1);

        const currentX = startPos.x + dx * progress;
        const currentY = startPos.y + dy * progress;
        this.setPosition(currentX, currentY);

        if (progress < 1) {
          this.walkRafId = requestAnimationFrame(step);
        } else {
          this.walkRafId = null;
          const res = this.activeMoveResolve;
          this.activeMoveResolve = null;
          res?.();
        }
      };

      this.walkRafId = requestAnimationFrame(step);
    });
  }

  cancelMovement(): void {
    if (this.walkRafId !== null) {
      cancelAnimationFrame(this.walkRafId);
      this.walkRafId = null;
    }
    if (this.activeMoveResolve) {
      const res = this.activeMoveResolve;
      this.activeMoveResolve = null;
      res();
    }
  }

  destroy(): void {
    this.cancelMovement();
    this.clearReactionTimeout();
  }

  private clearReactionTimeout(): void {
    if (this.reactionTimeout !== null) {
      clearTimeout(this.reactionTimeout);
      this.reactionTimeout = null;
    }
  }
}

