/** Speech bubble lines Torti can say when the player answers correctly. */
export const TORTI_HAPPY_LINES: readonly string[] = [
  'happyLine1',
  'happyLine2',
  'happyLine3',
  'happyLine4',
  'happyLine5',
];

/** Speech bubble lines Torti can say when the player answers incorrectly. */
export const TORTI_SAD_LINES: readonly string[] = [
  'sadLine1',
  'sadLine2',
  'sadLine3',
  'sadLine4',
  'sadLine5',
];

export function pickRandomLine(lines: readonly string[]): string {
  return lines[Math.floor(Math.random() * lines.length)];
}
