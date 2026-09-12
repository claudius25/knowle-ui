import { BehaviorSubject, Observable } from 'rxjs';
import {
  FacingDirection,
  SpriteFrame,
  TortiAnimation,
  TortiPosition,
  TortiReaction,
  TortiState,
  WalkOptions,
} from './torti.types';
import { TORTI_ANIMATIONS } from './torti.animations';

export class TortiCharacter {
  private currentAnimationSubject = new BehaviorSubject<TortiAnimation>('idle');
  private currentStateSubject = new BehaviorSubject<TortiState>('idle');
  private positionSubject = new BehaviorSubject<TortiPosition>({ x: 0, y: 0 });
  private facingSubject = new BehaviorSubject<FacingDirection>('right');
  private currentFrameSubject = new BehaviorSubject<SpriteFrame>(TORTI_ANIMATIONS.idle.frames[0]);
  private isTalkingSubject = new BehaviorSubject<boolean>(false);

  readonly currentAnimation$: Observable<TortiAnimation> =
    this.currentAnimationSubject.asObservable();
  readonly currentState$: Observable<TortiState> = this.currentStateSubject.asObservable();
  readonly position$: Observable<TortiPosition> = this.positionSubject.asObservable();
  readonly facing$: Observable<FacingDirection> = this.facingSubject.asObservable();
  readonly currentFrame$: Observable<SpriteFrame> = this.currentFrameSubject.asObservable();
  readonly isTalking$: Observable<boolean> = this.isTalkingSubject.asObservable();

  private frameIndex = 0;
  private animationTimer: number | null = null;
  private walkRafId: number | null = null;
  private activeMoveResolve: (() => void) | null = null;
  private activeAnimationTimeout: number | null = null;

  constructor(
    initialPosition: TortiPosition = { x: 0, y: 0 },
    initialFacing: FacingDirection = 'right',
  ) {
    this.positionSubject.next(initialPosition);
    this.facingSubject.next(initialFacing);
    this.startAnimationLoop('idle');
  }

  get currentAnimation(): TortiAnimation {
    return this.currentAnimationSubject.value;
  }

  get currentState(): TortiState {
    return this.currentStateSubject.value;
  }

  get position(): TortiPosition {
    return this.positionSubject.value;
  }

  get facing(): FacingDirection {
    return this.facingSubject.value;
  }

  get currentFrame(): SpriteFrame {
    return this.currentFrameSubject.value;
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

  playAnimation(animation: TortiAnimation, returnToIdleOnComplete = true): Promise<void> {
    return new Promise((resolve) => {
      this.clearTimeouts();
      this.currentAnimationSubject.next(animation);

      const animDef = TORTI_ANIMATIONS[animation];
      this.startAnimationLoop(animation);

      if (!animDef.loop && returnToIdleOnComplete) {
        const totalDurationMs = (animDef.frames.length / animDef.fps) * 1000;
        this.activeAnimationTimeout = window.setTimeout(() => {
          this.currentAnimationSubject.next('idle');
          this.currentStateSubject.next('idle');
          this.startAnimationLoop('idle');
          resolve();
        }, totalDurationMs);
      } else {
        resolve();
      }
    });
  }

  react(reaction: TortiReaction): Promise<void> {
    this.currentStateSubject.next('reacting');
    return this.playAnimation(reaction, true);
  }

  startTalking(): void {
    this.isTalkingSubject.next(true);
    this.currentStateSubject.next('talking');
    this.playAnimation('talk', false);
  }

  stopTalking(): void {
    this.isTalkingSubject.next(false);
    if (this.currentStateSubject.value === 'talking') {
      this.currentStateSubject.next('idle');
      this.playAnimation('idle', false);
    }
  }

  setTalking(talking: boolean): void {
    if (talking) {
      this.startTalking();
    } else {
      this.stopTalking();
    }
  }

  point(): Promise<void> {
    this.currentStateSubject.next('reacting');
    return this.playAnimation('point', true);
  }

  wave(): Promise<void> {
    this.currentStateSubject.next('waving');
    return this.playAnimation('wave', true);
  }

  sleep(): void {
    this.currentStateSubject.next('sleeping');
    this.playAnimation('sleep', false);
  }

  wakeUp(): void {
    this.currentStateSubject.next('idle');
    this.playAnimation('idle', false);
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

      this.currentStateSubject.next('walking');
      this.playAnimation('walk', false);

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
          this.currentStateSubject.next('idle');
          this.playAnimation('idle', false);
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
    this.clearTimeouts();
    if (this.animationTimer !== null) {
      clearInterval(this.animationTimer);
      this.animationTimer = null;
    }
  }

  private startAnimationLoop(animation: TortiAnimation): void {
    if (this.animationTimer !== null) {
      clearInterval(this.animationTimer);
      this.animationTimer = null;
    }

    const animDef = TORTI_ANIMATIONS[animation] || TORTI_ANIMATIONS.idle;
    this.frameIndex = 0;
    this.currentFrameSubject.next(animDef.frames[0]);

    const intervalMs = Math.round(1000 / animDef.fps);
    this.animationTimer = window.setInterval(() => {
      this.frameIndex++;
      if (this.frameIndex >= animDef.frames.length) {
        if (animDef.loop) {
          this.frameIndex = 0;
        } else {
          this.frameIndex = animDef.frames.length - 1;
          if (this.animationTimer !== null) {
            clearInterval(this.animationTimer);
            this.animationTimer = null;
          }
        }
      }
      this.currentFrameSubject.next(animDef.frames[this.frameIndex]);
    }, intervalMs);
  }

  private clearTimeouts(): void {
    if (this.activeAnimationTimeout !== null) {
      clearTimeout(this.activeAnimationTimeout);
      this.activeAnimationTimeout = null;
    }
  }
}
