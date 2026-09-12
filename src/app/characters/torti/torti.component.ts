import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
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
export class TortiComponent implements OnInit, OnChanges, OnDestroy {
  @Input() scale = 0.28;
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
  private subs = new Subscription();

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

    return {
      width: `${frame.width}px`,
      height: `${frame.height}px`,
      backgroundImage: `url('${sheetUrl}')`,
      backgroundPosition: `-${frame.x}px -${frame.y}px`,
      backgroundSize: `${sheetWidth}px ${sheetHeight}px`,
      transform: `scale(${this.scale}) scaleX(${scaleX}) translate(-${anchorX}px, -${anchorY}px)`,
      transformOrigin: '0 0',
    };
  }

  getBubbleStyle(facing: FacingDirection): Record<string, string> {
    const headTopPx = 542 * this.scale;
    return {
      bottom: `${headTopPx + 16}px`,
      left: facing === 'left' ? 'auto' : `${20 * this.scale}px`,
      right: facing === 'left' ? `${20 * this.scale}px` : 'auto',
    };
  }

  onClick(): void {
    this.characterClick.emit(this.character);
  }
}
