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
      imageUrl: "https://i.imgur.com/example-of-your-image.jpg",
      questionText: "What is the historical significance of the carpet featured in the background of George Washington's portrait?",
      fullAnswerText: "This 18th-century Persian carpet, likely a Kerman or Isfahan, is featured prominently in the background of Gilbert Stuart's famous 'Landsdowne' portrait of George Washington, signifying wealth and global trade and reflecting the complex global commerce of the era. Its inclusion was a deliberate choice to elevate Washington's status.",
    },
    {
      id: 2,
      title: "Source: The Bayeux Tapestry",
      imageUrl: "https://i.imgur.com/bayeux-tapestry-example.jpg", // REPLACE with a real URL
      questionText: "What key event does this section of the Bayeux Tapestry depict, and what does it suggest about military tactics of the time?",
      fullAnswerText: "This section depicts the Battle of Hastings in 1066. It shows the Norman cavalry charging the English shield wall. The scene suggests that both sides employed specific, well-known military formations and tactics, with the Norman feigned retreat being a key element.",
    },
    // Add more questions here
  ];