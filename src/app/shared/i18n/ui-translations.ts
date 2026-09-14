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
  | 'ttsSpeaking'
  | 'introButton'
  | 'introSkip'
  | 'introNext'
  | 'introStart'
  | 'introPage1Title'
  | 'introPage1Body'
  | 'introPage2Title'
  | 'introPage2Body'
  | 'introPage3Title'
  | 'introPage3Body'
  | 'exitConfirmTitle'
  | 'exitConfirmMessage'
  | 'exitConfirmYes'
  | 'exitConfirmNo';

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
    introButton: 'Intro',
    introSkip: 'Sari peste',
    introNext: 'Continuă',
    introStart: 'Începe jocul',
    introPage1Title: 'Bine ai venit!',
    introPage1Body: 'Descoperă lumea GNOSIS alături de Torti, ghidul tău prietenos.',
    introPage2Title: 'Învață jucându-te',
    introPage2Body: 'Răspunde la întrebări, clasifică elemente și testează-ți cunoștințele.',
    introPage3Title: 'Câștigă monede și progres',
    introPage3Body: 'Adună monede, urmărește-ți progresul și ai grijă de sănătatea ta.',
    exitConfirmTitle: 'Părăsești jocul?',
    exitConfirmMessage: 'Progresul acestei sesiuni se va pierde dacă te întorci acum la pagina principală.',
    exitConfirmYes: 'Da, ieși',
    exitConfirmNo: 'Nu, rămân',
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
    introButton: 'Intro',
    introSkip: 'Skip',
    introNext: 'Next',
    introStart: 'Start the game',
    introPage1Title: 'Welcome!',
    introPage1Body: 'Discover the world of GNOSIS together with Torti, your friendly guide.',
    introPage2Title: 'Learn by playing',
    introPage2Body: 'Answer questions, classify items, and test your knowledge.',
    introPage3Title: 'Earn coins and progress',
    introPage3Body: 'Collect coins, track your progress, and take care of your health.',
    exitConfirmTitle: 'Leave the game?',
    exitConfirmMessage: 'Your progress in this session will be lost if you go back to the home page now.',
    exitConfirmYes: 'Yes, leave',
    exitConfirmNo: 'No, stay',
  },
};

export function uiText(language: Language, key: UiTextKey): string {
  return UI_TRANSLATIONS[language][key];
}
