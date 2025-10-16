// Define the TypeScript interface for a single question object
export interface HistoryQuestion {
    id: number;
    title: string;
    imageUrl: string;
    questionText: string;
    fullAnswerText: string;
  }
  
  // The array of all questions
  export const allHistoryQuestions: HistoryQuestion[] = [
    {
      id: 1,
      title: "Source: George Washington's Portrait",
      imageUrl: "/images/sources/carpet.webp",
      questionText: "What is the historical significance of the carpet featured in the background of George Washington's portrait?",
      fullAnswerText: "This 18th-century Persian carpet, likely a Kerman or Isfahan, is featured prominently in the background of Gilbert Stuart's famous 'Landsdowne' portrait of George Washington, signifying wealth and global trade and reflecting the complex global commerce of the era. Its inclusion was a deliberate choice to elevate Washington's status.",
    },
    {
      id: 2,
      title: "Source: sdadas",
      imageUrl: "/images/sources/americanspeech.jpeg",
      questionText: "What key event does this section of the Bayeux Tapestry depict, and what does it suggest about military tactics of the time?",
      fullAnswerText: "Analysis of an unknown historical source revealing a literate, formerly enslaved speaker addressing a July 4th public celebration to expose the fundamental contradiction between America's founding ideals of freedom and the reality of millions enslaved, arguing that slavery corrupts the nation's republicanism, moral authority, and unity while reclaiming the Constitution as a freedom document against pro-slavery defenders, reflecting a period of active public debate when this urgent, divisive issue remained unresolved.",
    },
    // Add more questions here
  ];