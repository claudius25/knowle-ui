/** Speech bubble lines Torti can say when the player answers correctly. */
export const TORTI_HAPPY_LINES: readonly string[] = [
  'Yes! You got it!',
  'Great job!',
  'Awesome work!',
  "That's exactly right!",
  'You are on fire!',
];

/** Speech bubble lines Torti can say when the player answers incorrectly. */
export const TORTI_SAD_LINES: readonly string[] = [
  'Oops, not quite.',
  "Don't worry, try again!",
  'So close! Give it another shot.',
  'Hmm, that is not it.',
  "Let's try that again!",
];

export function pickRandomLine(lines: readonly string[]): string {
  return lines[Math.floor(Math.random() * lines.length)];
}
