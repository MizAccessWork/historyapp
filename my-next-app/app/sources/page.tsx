'use client'; 

import React, { useState, useEffect, useMemo } from 'react';
// Import the data and interface
import { allHistoryQuestions, HistoryQuestion } from '@/app/data/historyData'; // Adjust path if needed

// --- CONFIGURATION CONSTANTS ---
const TYPING_SPEED_MS = 45; 
// --- END CONFIGURATION ---

type HistorySimulatorProps = {};

const HistorySimulator: React.FC<HistorySimulatorProps> = () => {
  // State to track the current question being displayed (index in the array)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  // --- DERIVED STATE / MEMOIZED VALUES ---
  // Get the current question object from the array
  const currentQuestion: HistoryQuestion = allHistoryQuestions[currentQuestionIndex];
  // Split the answer for the typing animation
  const ANSWER_WORDS = useMemo(() => currentQuestion.fullAnswerText.split(' '), [currentQuestion.fullAnswerText]);
  const displayedAnswer = ANSWER_WORDS.slice(0, wordCount).join(' ');
  const isAnimationComplete = wordCount >= ANSWER_WORDS.length;
  // ----------------------------------------

  // useEffect hook to handle the word-by-word animation
  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (isAnswerRevealed && !isAnimationComplete) {
      intervalId = setInterval(() => {
        setWordCount(prevCount => prevCount + 1);
      }, TYPING_SPEED_MS);
    } else if (!isAnswerRevealed) {
        // When question changes or answer is hidden, reset word count
        setWordCount(0);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isAnswerRevealed, isAnimationComplete, currentQuestion.id]); // Added currentQuestion.id to reset animation on question change

  // Function to move to the next question
  const goToNextQuestion = () => {
    const nextIndex = (currentQuestionIndex + 1) % allHistoryQuestions.length;
    setCurrentQuestionIndex(nextIndex);
    setIsAnswerRevealed(false); // Reset reveal state for the new question
    setWordCount(0); // Reset animation state
  }

  const handleRevealAnswer = () => {
    if (!isAnswerRevealed) {
      setIsAnswerRevealed(true);
    }
  };

  const handleSkipQuestion = () => {
    console.log(`Skipping question ${currentQuestion.id} and moving to the next.`);
    goToNextQuestion();
  };


  return (
    // Main container 
    <div className="flex flex-col p-4 md:p-8 min-h-screen bg-gray-50">
      
      {/* Main Title - Use the specific title from the JSON */}
      <h1 className="text-2xl font-bold mb-6 text-gray-800">{currentQuestion.title}</h1>

      {/* Two-Column Split: Image (Left) and Answer/Interaction (Right) */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* === LEFT COLUMN: Image Source Area === */}
        <div className="flex flex-col space-y-4 md:order-first order-first">
          <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">Source:</h2>
          
          <div className="flex-1 flex justify-center items-center bg-white p-4 rounded-lg shadow-inner border border-gray-200 min-h-[300px]">
            <img 
              src={currentQuestion.imageUrl} // Use data from JSON
              alt={currentQuestion.title}
              className="max-w-full max-h-full object-contain rounded-md shadow-lg"
            />
          </div>
        </div>


        {/* === RIGHT COLUMN: Answer/Interaction Area === */}
        <div className="flex flex-col space-y-6 md:order-last order-last">
          <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">Answer:</h2>

          <div className="flex-1 bg-white p-6 rounded-lg shadow-md border border-gray-200 flex flex-col justify-center items-center text-center">
            
            {/* Question Area */}
            {!isAnswerRevealed && (
              <div className="h-full flex flex-col justify-center items-center p-4">
                <h3 className="text-3xl font-extrabold text-gray-900 mb-4 tracking-tight">
                  Question:
                </h3>
                <p className="text-2xl text-gray-700 font-medium italic max-w-lg">
                  {currentQuestion.questionText} {/* Use data from JSON */}
                </p>
              </div>
            )}

            {/* Answer Reveal Area */}
            {isAnswerRevealed && (
              <div className="h-full w-full text-left">
                <h3 className="text-xl font-bold text-green-700 mb-3">Correct Analysis:</h3>
                <p className="text-lg text-gray-800 whitespace-pre-wrap leading-relaxed">
                  {displayedAnswer}
                  {!isAnimationComplete && (
                      <span className="animate-pulse inline-block w-1.5 h-4 bg-gray-700 ml-1"></span>
                  )}
                </p>
              </div>
            )}
          </div>
          
          {/* Action Buttons */}
          <div className="flex justify-between pt-4">
            <button
              onClick={handleRevealAnswer}
              disabled={isAnswerRevealed && isAnimationComplete}
              className={`px-6 py-3 font-semibold rounded-lg shadow-md transition duration-150 
                ${isAnswerRevealed && isAnimationComplete
                  ? 'bg-green-600 text-white cursor-not-allowed' 
                  : (isAnswerRevealed ? 'bg-gray-400 text-gray-600 cursor-wait' : 'bg-blue-600 text-white hover:bg-blue-700')
                }`}
            >
              {isAnswerRevealed && isAnimationComplete ? 'Analysis Complete' : 'Reveal Answer'}
            </button>
            <button
              onClick={handleSkipQuestion}
              className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition duration-150"
            >
              Skip Question
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default HistorySimulator;