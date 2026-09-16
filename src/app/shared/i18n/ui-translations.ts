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
  | 'matching'
  | 'matchingInstruction'
  | 'ordering'
  | 'orderingInstruction'
  | 'audioListen'
  | 'audioSpeaking'
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
  | 'exitConfirmNo'
  | 'chapterComplete'
  | 'chapterDoneSubtitle'
  | 'playAgain'
  | 'happyLine1'
  | 'happyLine2'
  | 'happyLine3'
  | 'happyLine4'
  | 'happyLine5'
  | 'sadLine1'
  | 'sadLine2'
  | 'sadLine3'
  | 'sadLine4'
  | 'sadLine5';

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
    matching: 'Potrivește perechile',
    matchingInstruction: 'Alege un element din stânga și perechea lui din dreapta',
    ordering: 'Ordonează elementele',
    orderingInstruction: 'Așază elementele în ordinea corectă',
    audioListen: 'Ascultă',
    audioSpeaking: 'Redare audio...',
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
    exitConfirmMessage:
      'Progresul acestei sesiuni se va pierde dacă te întorci acum la pagina principală.',
    exitConfirmYes: 'Da, ieși',
    exitConfirmNo: 'Nu, rămân',
    chapterComplete: 'Capitol finalizat!',
    chapterDoneSubtitle: 'Ai demonstrat cunoștințe excelente și ai învățat lucruri noi!',
    playAgain: 'Joacă din nou',
    happyLine1: 'Felicitări!',
    happyLine2: 'Ai făcut o treabă grozavă!',
    happyLine3: 'Continuă să explorezi și să înveți!',
    happyLine4: 'Bucură-te de fiecare moment al aventurii tale!',
    happyLine5: 'Animalule',
    sadLine1: 'Ups, nu chiar.',
    sadLine2: 'Nu-ți face griji, încearcă din nou!',
    sadLine3: 'A fost aproape! Mai încearcă o dată.',
    sadLine4: 'Hmm, nu este corect.',
    sadLine5: 'Esti patetic!',
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
    matching: 'Match the pairs',
    matchingInstruction: 'Tap an item on the left, then its match on the right',
    ordering: 'Order the items',
    orderingInstruction: 'Arrange the items in the correct order',
    audioListen: 'Listen',
    audioSpeaking: 'Playing audio...',
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
    exitConfirmMessage:
      'Your progress in this session will be lost if you go back to the home page now.',
    exitConfirmYes: 'Yes, leave',
    exitConfirmNo: 'No, stay',
    chapterComplete: 'Chapter complete!',
    chapterDoneSubtitle: 'You demonstrated great knowledge and learned new things!',
    playAgain: 'Play again',
    happyLine1: 'Congratulations!',
    happyLine2: 'You did a great job!',
    happyLine3: 'Keep exploring and learning!',
    happyLine4: 'Enjoy every moment of your adventure!',
    happyLine5: 'You little animal',
    sadLine1: 'Oops, not quite.',
    sadLine2: "Don't worry, try again!",
    sadLine3: 'So close! Give it another shot.',
    sadLine4: 'Hmm, that is not it.',
    sadLine5: 'You are pathetic!',
  },
};

export function uiText(language: Language, key: UiTextKey): string {
  return UI_TRANSLATIONS[language]?.[key];
}
