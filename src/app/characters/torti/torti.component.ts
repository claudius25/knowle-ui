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
import {
  FacingDirection,
  SpriteFrame,
  TortiAnimation,
  TortiPosition,
  TortiReaction,
  TortiState,
  WalkOptions,
} from './torti.types';
import { TortiCharacter } from './torti-character';
import { TORTI_ANIMATIONS } from './torti.animations';

@Component({
  selector: 'app-torti',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
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
  @Input() initialAnimation: TortiAnimation = 'idle';
  @Input() speechText = '';
  @Input() showBubble = false;

  @Output() movementFinished = new EventEmitter<void>();
  @Output() animationFinished = new EventEmitter<TortiAnimation>();
  @Output() characterClick = new EventEmitter<TortiCharacter>();

  readonly character = new TortiCharacter();
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly changeDetector = inject(ChangeDetectorRef);
  private subs = new Subscription();
  private resizeObserver?: ResizeObserver;
  private fittedScale = 0.28;

  get currentScale(): number | string {
    return this.fitToContainer ? this.fittedScale : this.scale;
  }

  ngOnInit(): void {
    this.character.setPosition(this.x, this.y);
    this.character.setFacing(this.facing);

    if (this.initialAnimation !== 'idle') {
      this.character.playAnimation(this.initialAnimation);
    }

    this.subs.add(
      this.character.currentState$.subscribe((state) => {
        if (state === 'idle') {
          this.movementFinished.emit();
        }
      }),
    );

    this.subs.add(
      this.character.currentAnimation$.subscribe((anim) => {
        this.animationFinished.emit(anim);
      }),
    );
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
    if (changes['initialAnimation'] && !changes['initialAnimation'].firstChange) {
      this.character.playAnimation(this.initialAnimation);
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
    this.resizeObserver?.disconnect();
    this.character.destroy();
  }

  // Public Proxy API for template refs (#torti)
  walkTo(x: number, y: number, options?: WalkOptions): Promise<void> {
    return this.character.walkTo(x, y, options);
  }

  playAnimation(animation: TortiAnimation): Promise<void> {
    return this.character.playAnimation(animation);
  }

  react(type: TortiReaction): Promise<void> {
    return this.character.react(type);
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

  point(): Promise<void> {
    return this.character.point();
  }

  sleep(): void {
    this.character.sleep();
  }

  wakeUp(): void {
    this.character.wakeUp();
  }

  // Computed style for outer container positioning
  getContainerStyle(pos: TortiPosition, facing: FacingDirection): Record<string, string> {
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

  // Computed style for the inner sprite slice
  getSpriteStyle(
    frame: SpriteFrame,
    facing: FacingDirection,
    anim: TortiAnimation,
  ): Record<string, string> {
    const scaleX = facing === 'left' ? -1 : 1;
    const anchorX = frame.anchorX ?? frame.width / 2;
    const anchorY = frame.anchorY ?? frame.height;

    const animDef = TORTI_ANIMATIONS[anim] || TORTI_ANIMATIONS.idle;
    const sheetUrl = frame.spriteSheetUrl || animDef.spriteSheetUrl;
    const sheetWidth = frame.sheetWidth || animDef.sheetWidth;
    const sheetHeight = frame.sheetHeight || animDef.sheetHeight;
    const numericScale = typeof this.currentScale === 'number' ? this.currentScale : 0.28;

    return {
      width: `${frame.width * numericScale}px`,
      height: `${frame.height * numericScale}px`,
      backgroundImage: `url('${sheetUrl}')`,
      backgroundPosition: `-${frame.x * numericScale}px -${frame.y * numericScale}px`,
      backgroundSize: `${sheetWidth * numericScale}px ${sheetHeight * numericScale}px`,
      transform: this.centered
        ? scaleX === -1
          ? 'scaleX(-1)'
          : 'none'
        : `scale(${this.currentScale}) scaleX(${scaleX}) translate(-${anchorX}px, -${anchorY}px)`,
      ...(this.centered
        ? {
            left: `-${anchorX * numericScale}px`,
            top: `-${anchorY * numericScale}px`,
          }
        : {}),
    };
  }

  getBubbleStyle(facing: FacingDirection): Record<string, string> {
    const numericScale = typeof this.currentScale === 'number' ? this.currentScale : 0.28;
    const headTopPx = 542 * numericScale;
    return {
      bottom: `${headTopPx + 16}px`,
      left: facing === 'left' ? 'auto' : `${20 * numericScale}px`,
      right: facing === 'left' ? `${20 * numericScale}px` : 'auto',
    };
  }

  onClick(): void {
    this.characterClick.emit(this.character);
  }
}
