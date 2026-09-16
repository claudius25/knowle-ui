import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MultipleChoiceActivityData } from '../../../shared/models/game.types';
import { UiTextService } from '../../../shared/services/ui-text.service';
import { TtsService } from '../../../shared/tts/tts.service';
import { LanguageService } from '../../../shared/services/language.service';

@Component({
  selector: 'app-multiple-choice',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './multiple-choice.component.html',
  styleUrl: './multiple-choice.component.css',
})
export class MultipleChoiceComponent {
  protected readonly uiText = inject(UiTextService);
  private readonly tts = inject(TtsService);
  private readonly languageService = inject(LanguageService);

  @Input({ required: true }) data!: MultipleChoiceActivityData;
  @Input() disabled = false;
  @Input() selectedAnswer: string | null = null;
  @Output() answerSelected = new EventEmitter<string>();

  protected readonly isSpeaking$ = this.tts.isSpeaking$;

  protected select(answer: string): void {
    if (!this.disabled) {
      this.answerSelected.emit(answer);
    }
  }

  protected speak(): void {
    if (this.tts.isSpeaking) {
      this.tts.stop();
      return;
    }

    const parts: string[] = [];
    if (this.data.description) {
      parts.push(this.data.description.trim());
    }
    if (this.data.question) {
      parts.push(this.data.question.trim());
    }

    const textToSpeak = parts.join('. ');
    if (!textToSpeak) return;

    const lang = this.languageService.getCurrentLanguage() || 'ro';
    void this.tts.speak(textToSpeak, { lang });
  }
}
