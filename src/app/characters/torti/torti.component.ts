import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  AfterViewInit,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { FacingDirection, TortiPose, TortiPosition, WalkOptions } from './torti.types';
import { TortiCharacter } from './torti-character';
import { TORTI_POSE_BASE_HEIGHT, tortiPoseUrl } from './torti.poses';
import { AudioPlayerService } from '../../shared/services/audio-player.service';
import { CoinDisplayComponent } from '../../components/ui/coin-display/coin-display.component';
import { HealthDisplayComponent } from '../../components/ui/health-display/health-display.component';

/** How long the crossfade between two poses takes, in ms. Keep in sync with the CSS transition. */
const POSE_TRANSITION_MS = 260;

interface PoseLayer {
  id: number;
  pose: TortiPose;
  visible: boolean;
}

@Component({
  selector: 'app-torti',
  standalone: true,
  imports: [CommonModule, AsyncPipe, CoinDisplayComponent, HealthDisplayComponent],
  templateUrl: './torti.component.html',
  styleUrl: './torti.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TortiComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  @Input() scale: number | string = 0.28;
  @Input() fitToContainer = false;
  @Input() centered = false;
  @Input() x = 0;
  @Input() y = 0;
  @Input() facing: FacingDirection = 'right';
  @Input() initialPose: TortiPose = 'idle';
  @Input() speechText = '';
  @Input() showBubble = false;
  /** Set to false to hide the mute/unmute control on the character. */
  @Input() showMuteButton = true;
  @Input() showCoinButton = false;
  @Input() showHealthDisplay = false;
  @Input() coins = 0;
  @Input() health = 100;

  @Output() movementFinished = new EventEmitter<void>();
  @Output() poseChanged = new EventEmitter<TortiPose>();
  @Output() characterClick = new EventEmitter<TortiCharacter>();

  readonly character = new TortiCharacter();
  protected layers: PoseLayer[] = [];

  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly changeDetector = inject(ChangeDetectorRef);
  private readonly audioPlayer = inject(AudioPlayerService);
  protected readonly isMuted$ = this.audioPlayer.characterMuted$;
  private subs = new Subscription();
  private resizeObserver?: ResizeObserver;
  private fittedScale = 0.28;
  private nextLayerId = 0;
  private cleanupTimeout: number | null = null;

  get currentScale(): number | string {
    return this.fitToContainer ? this.fittedScale : this.scale;
  }

  ngOnInit(): void {
    this.character.setPosition(this.x, this.y);
    this.character.setFacing(this.facing);
    this.layers = [{ id: this.nextLayerId++, pose: this.initialPose, visible: true }];

    if (this.initialPose === 'idle') {
      this.character.setPose('idle');
    } else {
      // Show the initial pose briefly, then settle back to idle.
      this.character.react(this.initialPose);
    }

    this.subs.add(
      this.character.pose$.subscribe((pose) => {
        // Skip the very first emission; it's already reflected in the initial layer above.
        if (this.layers.length === 1 && this.layers[0].pose === pose) {
          return;
        }
        this.pushPoseLayer(pose);
        this.poseChanged.emit(pose);
      }),
    );

    this.audioPlayer.makeCharacterMuted();
  }

  ngAfterViewInit(): void {
    if (!this.fitToContainer) {
      return;
    }

    this.resizeObserver = new ResizeObserver(([entry]) => {
      const availableHeight = entry.contentRect.height;
      this.fittedScale = Math.min(0.55, Math.max(0.18, (availableHeight * 0.72) / 724));
      this.changeDetector.markForCheck();
    });
    this.resizeObserver.observe(this.elementRef.nativeElement);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['x'] || changes['y']) {
      if (!changes['x']?.firstChange && !changes['y']?.firstChange) {
        this.character.setPosition(this.x, this.y);
      }
    }
    if (changes['facing'] && !changes['facing'].firstChange) {
      this.character.setFacing(this.facing);
    }
    if (changes['initialPose'] && !changes['initialPose'].firstChange) {
      this.character.setPose(this.initialPose);
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
    this.resizeObserver?.disconnect();
    if (this.cleanupTimeout !== null) {
      window.clearTimeout(this.cleanupTimeout);
    }
    this.character.destroy();
  }

  // Public Proxy API for template refs (#torti)
  walkTo(x: number, y: number, options?: WalkOptions): Promise<void> {
    return this.character.walkTo(x, y, options).then(() => this.movementFinished.emit());
  }

  setPose(pose: TortiPose): Promise<void> {
    return this.character.setPose(pose);
  }

  react(pose: TortiPose, holdMs?: number): Promise<void> {
    return this.character.react(pose, holdMs);
  }

  startTalking(): void {
    this.character.startTalking();
  }

  stopTalking(): void {
    this.character.stopTalking();
  }

  setTalking(talking: boolean): void {
    this.character.setTalking(talking);
  }

  // Computed style for outer container positioning
  getContainerStyle(pos: TortiPosition): Record<string, string> {
    if (this.centered) {
      return {
        left: '50%',
        top: '50%',
      };
    }

    return {
      transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
    };
  }

  poseUrl(pose: TortiPose): string {
    return tortiPoseUrl(pose);
  }

  // Computed style for the static pose image
  getSpriteStyle(facing: FacingDirection): Record<string, string> {
    const scaleX = facing === 'left' ? -1 : 1;
    const numericScale = typeof this.currentScale === 'number' ? this.currentScale : 0.28;
    const heightPx = TORTI_POSE_BASE_HEIGHT * numericScale;

    return {
      height: `${heightPx}px`,
      width: 'auto',
      transform: this.centered
        ? `translate(-50%, -50%) scaleX(${scaleX})`
        : `translate(-50%, -100%) scaleX(${scaleX})`,
    };
  }

  getShadowStyle(): Record<string, string> {
    const numericScale = typeof this.currentScale === 'number' ? this.currentScale : 0.28;
    const heightPx = TORTI_POSE_BASE_HEIGHT * numericScale;
    const shadowWidthPx = 410 * numericScale;
    const shadowHeightPx = 72 * numericScale;
    const topPx = this.centered ? heightPx / 2 - shadowHeightPx * 0.35 : -shadowHeightPx * 0.35;

    return {
      width: `${shadowWidthPx}px`,
      height: `${shadowHeightPx}px`,
      top: `${topPx}px`,
      transform: 'translate(-50%, -50%)',
    };
  }

  getBubbleStyle(facing: FacingDirection): Record<string, string> {
    const numericScale = typeof this.currentScale === 'number' ? this.currentScale : 0.28;
    const heightPx = TORTI_POSE_BASE_HEIGHT * numericScale;
    const headTopPx = 542 * numericScale;
    // In centered mode the sprite is anchored at its own vertical middle, so shift the
    // bubble down by half the sprite height to keep it near the head instead of floating off-screen.
    const bottomPx = this.centered ? headTopPx + 16 - heightPx / 2 : headTopPx + 16;
    return {
      bottom: `${bottomPx}px`,
      left: facing === 'left' ? 'auto' : `${20 * numericScale}px`,
      right: facing === 'left' ? `${20 * numericScale}px` : 'auto',
    };
  }

  onClick(): void {
    this.characterClick.emit(this.character);
  }

  /** Toggles whether the character's spoken audio is muted; doesn't trigger a click reaction. */
  toggleMute(event: Event): void {
    event.stopPropagation();
    this.audioPlayer.toggleCharacterMute();
  }

  private pushPoseLayer(pose: TortiPose): void {
    const id = this.nextLayerId++;
    this.layers.forEach((layer) => (layer.visible = false));
    this.layers = [...this.layers, { id, pose, visible: false }];
    this.changeDetector.markForCheck();

    requestAnimationFrame(() => {
      this.layers = this.layers.map((layer) =>
        layer.id === id ? { ...layer, visible: true } : layer,
      );
      this.changeDetector.markForCheck();

      if (this.cleanupTimeout !== null) {
        window.clearTimeout(this.cleanupTimeout);
      }
      this.cleanupTimeout = window.setTimeout(() => {
        this.cleanupTimeout = null;
        this.layers = this.layers.filter((layer) => layer.id === id);
        this.changeDetector.markForCheck();
      }, POSE_TRANSITION_MS);
    });
  }
}
