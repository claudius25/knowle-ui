import { SupportedTtsLanguage, TtsLanguage } from '../tts.types';

export const AVAILABLE_LANGS: readonly SupportedTtsLanguage[] = [
  'en',
  'ko',
  'ja',
  'ar',
  'bg',
  'cs',
  'da',
  'de',
  'el',
  'es',
  'et',
  'fi',
  'fr',
  'hi',
  'hr',
  'hu',
  'id',
  'it',
  'lt',
  'lv',
  'nl',
  'pl',
  'pt',
  'ro',
  'ru',
  'sk',
  'sl',
  'sv',
  'tr',
  'uk',
  'vi',
  'na',
];

export function isValidLang(lang: string): lang is SupportedTtsLanguage {
  return AVAILABLE_LANGS.includes(lang as SupportedTtsLanguage);
}

export class UnicodeProcessor {
  constructor(private readonly indexer: number[]) {}

  call(textList: string[], langList: TtsLanguage[]): { textIds: number[][]; textMask: number[][][] } {
    const processedTexts = textList.map((text, i) => this.preprocessText(text, langList[i]));
    const textIdsLengths = processedTexts.map((text) => text.length);
    const maxLen = Math.max(...textIdsLengths);

    const textIds = processedTexts.map((text) => {
      const row = new Array<number>(maxLen).fill(0);
      for (let j = 0; j < text.length; j++) {
        const codePoint = text.codePointAt(j);
        if (codePoint !== undefined && codePoint < this.indexer.length) {
          row[j] = this.indexer[codePoint];
        } else {
          row[j] = -1;
        }
      }
      return row;
    });

    const textMask = this.getTextMask(textIdsLengths);
    return { textIds, textMask };
  }

  preprocessText(text: string, lang: TtsLanguage): string {
    text = text.normalize('NFKD');

    // Remove emojis
    const emojiPattern =
      /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}]+/gu;
    text = text.replace(emojiPattern, '');

    // Normalize dashes and symbols
    const replacements: Record<string, string> = {
      '–': '-',
      '‑': '-',
      '—': '-',
      _: ' ',
      '\u201C': '"',
      '\u201D': '"',
      '\u2018': "'",
      '\u2019': "'",
      '´': "'",
      '`': "'",
      '[': ' ',
      ']': ' ',
      '|': ' ',
      '/': ' ',
      '#': ' ',
      '→': ' ',
      '←': ' ',
    };
    for (const [k, v] of Object.entries(replacements)) {
      text = text.replaceAll(k, v);
    }

    // Remove special symbols
    text = text.replace(/[♥☆♡©\\]/g, '');

    // Replace known expressions
    const exprReplacements: Record<string, string> = {
      '@': ' at ',
      'e.g.,': 'for example, ',
      'i.e.,': 'that is, ',
    };
    for (const [k, v] of Object.entries(exprReplacements)) {
      text = text.replaceAll(k, v);
    }

    // Fix spacing around punctuation
    text = text.replace(/ ,/g, ',');
    text = text.replace(/ \./g, '.');
    text = text.replace(/ !/g, '!');
    text = text.replace(/ \?/g, '?');
    text = text.replace(/ ;/g, ';');
    text = text.replace(/ :/g, ':');
    text = text.replace(/ '/g, "'");

    // Remove duplicate quotes
    while (text.includes('""')) {
      text = text.replace('""', '"');
    }
    while (text.includes("''")) {
      text = text.replace("''", "'");
    }
    while (text.includes('``')) {
      text = text.replace('``', '`');
    }

    // Remove extra spaces
    text = text.replace(/\s+/g, ' ').trim();

    // If text does not end with punctuation, quotes, or closing brackets, add a period
    if (!/[.!?;:,'"'\)\]}…。」』】〉》›»]$/.test(text)) {
      text += '.';
    }

    const effectiveLang = isValidLang(lang) ? lang : 'en';

    // Wrap text with language tags (Supertonic multilingual tokenization)
    return `<${effectiveLang}>${text}</${effectiveLang}>`;
  }

  private getTextMask(textIdsLengths: number[]): number[][][] {
    const maxLen = Math.max(...textIdsLengths);
    return this.lengthToMask(textIdsLengths, maxLen);
  }

  private lengthToMask(lengths: number[], maxLen: number | null = null): number[][][] {
    const actualMaxLen = maxLen || Math.max(...lengths);
    return lengths.map((len) => {
      const row = new Array<number>(actualMaxLen).fill(0.0);
      for (let j = 0; j < Math.min(len, actualMaxLen); j++) {
        row[j] = 1.0;
      }
      return [row];
    });
  }
}
