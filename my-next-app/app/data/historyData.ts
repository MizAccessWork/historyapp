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
      title: "Source: Carpet",
      imageUrl: "/images/sources/carpet.webp",
      questionText: "What can you infer about a historical period using this source",
      fullAnswerText: "The carpet's complexity and uniformity show it was made by",
    },
    {
      id: 2,
      title: "Source: Douglas Speech",
      imageUrl: "/images/sources/americanspeech.jpeg",
      questionText: "What does this speech tell us about the historical period?",
      fullAnswerText: "Analysis of an unknown historical source revealing a literate, formerly enslaved speaker addressing a July 4th public celebration to expose the fundamental contradiction between America's founding ideals of freedom and the reality of millions enslaved, arguing that slavery corrupts the nation's republicanism, moral authority, and unity while reclaiming the Constitution as a freedom document against pro-slavery defenders, reflecting a period of active public debate when this urgent, divisive issue remained unresolved.",
    },
    // Add more questions here
  ];