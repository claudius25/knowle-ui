import { Language } from '../services/language.service';

export type UiTextKey =
  | 'gameName'
  | 'category'
  | 'challenge'
  | 'question'
  | 'check'
  | 'language'
  | 'answers'
  | 'categoriesFor'
  | 'loading'
  | 'errorTitle'
  | 'backendError'
  | 'activityError'
  | 'retry'
  | 'checking'
  | 'correct'
  | 'correctPrompt'
  | 'continue'
  | 'tryAgain'
  | 'incorrectPrompt'
  | 'unsupportedTitle'
  | 'unsupportedMessage'
  | 'trueFalse'
  | 'trueLabel'
  | 'falseLabel'
  | 'classify'
  | 'ttsTest'
  | 'ttsSpeaking';

const UI_TRANSLATIONS: Record<Language, Record<UiTextKey, string>> = {
  ro: {
    gameName: 'Knowledge Adventure',
    category: 'Cultură generală',
    challenge: 'O nouă provocare',
    question: 'Întrebarea ta',
    check: 'Verifică',
    language: 'Limbă',
    answers: 'Variante de răspuns',
    categoriesFor: 'Categorii pentru',
    loading: 'Se încarcă...',
    errorTitle: 'A apărut o eroare.',
    backendError: 'Jocul nu poate fi încărcat. Verifică dacă backend-ul rulează.',
    activityError: 'Activitatea nu poate fi încărcată.',
    retry: 'Încearcă din nou',
    checking: 'Verificăm răspunsul...',
    correct: 'Răspuns corect!',
    correctPrompt: 'Foarte bine. Ești gata pentru următoarea întrebare?',
    continue: 'Continuă',
    tryAgain: 'Mai încearcă o dată.',
    incorrectPrompt: 'Privește cu atenție variantele și alege din nou.',
    unsupportedTitle: 'Activitate în pregătire',
    unsupportedMessage: 'Acest tip de activitate nu este încă implementat.',
    trueFalse: 'Adevărat sau fals?',
    trueLabel: 'ADEVĂRAT',
    falseLabel: 'FALS',
    classify: 'Clasifică elementele',
    ttsTest: 'Ascultă „Hello World”',
    ttsSpeaking: 'Redare audio...',
  },
  en: {
    gameName: 'Knowledge Adventure',
    category: 'General knowledge',
    challenge: 'A new challenge',
    question: 'Your question',
    check: 'Check',
    language: 'Language',
    answers: 'Answer options',
    categoriesFor: 'Categories for',
    loading: 'Loading...',
    errorTitle: 'An error occurred.',
    backendError: 'The game cannot be loaded. Check that the backend is running.',
    activityError: 'The activity could not be loaded.',
    retry: 'Try again',
    checking: 'Checking your answer...',
    correct: 'Correct answer!',
    correctPrompt: 'Great job. Ready for the next question?',
    continue: 'Continue',
    tryAgain: 'Try again.',
    incorrectPrompt: 'Look closely at the options and choose again.',
    unsupportedTitle: 'Activity in progress',
    unsupportedMessage: 'This activity type is not implemented yet.',
    trueFalse: 'True or false?',
    trueLabel: 'TRUE',
    falseLabel: 'FALSE',
    classify: 'Classify the items',
    ttsTest: 'Speak "Hello World"',
    ttsSpeaking: 'Playing audio...',
  },
};

export function uiText(language: Language, key: UiTextKey): string {
  return UI_TRANSLATIONS[language][key];
}
