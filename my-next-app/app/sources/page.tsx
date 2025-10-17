'use client'; 

import React, { useState, useEffect, useMemo } from 'react';
// Assuming your data structure is in place:
import { allHistoryQuestions, HistoryQuestion } from '@/app/data/historyData'; 

// --- CONFIGURATION CONSTANTS ---
const TYPING_SPEED_MS = 45; 
// --- END CONFIGURATION ---

type HistorySimulatorProps = {};

const HistorySimulator: React.FC<HistorySimulatorProps> = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  // --- DERIVED STATE / MEMOIZED VALUES ---
  const currentQuestion: HistoryQuestion = allHistoryQuestions[currentQuestionIndex];
  const ANSWER_WORDS = useMemo(() => currentQuestion.fullAnswerText.split(' '), [currentQuestion.fullAnswerText]);
  const displayedAnswer = ANSWER_WORDS.slice(0, wordCount).join(' ');
  const isAnimationComplete = wordCount >= ANSWER_WORDS.length;
  // ----------------------------------------

  // useEffect hook for typing animation... (omitted for brevity, no change needed)
  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    if (isAnswerRevealed && !isAnimationComplete) {
      intervalId = setInterval(() => {
        setWordCount(prevCount => prevCount + 1);
      }, TYPING_SPEED_MS);
    } else if (!isAnswerRevealed) {
        setWordCount(0);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isAnswerRevealed, isAnimationComplete, currentQuestion.id]); 

  // Navigation handlers... (omitted for brevity, no change needed)
  const goToNextQuestion = () => {
    const nextIndex = (currentQuestionIndex + 1) % allHistoryQuestions.length;
    setCurrentQuestionIndex(nextIndex);
    setIsAnswerRevealed(false); 
    setWordCount(0); 
  }

  const handleRevealAnswer = () => {
    if (!isAnswerRevealed) {
      setIsAnswerRevealed(true);
    }
  };

  const handleSkipQuestion = () => {
    goToNextQuestion();
  };


  return (
    // Main container. Use 'overflow-hidden' to ensure the page itself does not scroll 
    // from internal content that tries to break out, although min-h-screen should prevent this.
    <div className="flex flex-col p-4 md:p-8 min-h-screen bg-gray-50">
      
      {/* Main Title */}
      <h1 className="text-2xl font-bold mb-6 text-gray-800">{currentQuestion.title}</h1>

      {/* Two-Column Split: Image (Left) and Answer/Interaction (Right) */}
      {/* flex-1 ensures this grid takes up the rest of the vertical space */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* === LEFT COLUMN: Image Source Area === */}
        <div className="flex flex-col space-y-4 md:order-first order-first">
          <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">Source:</h2>
          
          {/* 
            CRITICAL FIX: 
            1. Use 'flex-1' to make it grow to fill the available space.
            2. Use a specific maximum height (e.g., max-h-[75vh]) to ensure 
               it can't push the viewport, leaving space for the header/footer/padding.
          */}
          <div className="flex-1 flex justify-center items-center bg-white p-4 rounded-lg shadow-inner border border-gray-200 min-h-[300px] max-h-[75vh]">
            <img 
              src={currentQuestion.imageUrl}
              alt={currentQuestion.title}
              // max-h-full now strictly refers to the parent's max-h-[75vh] limit
              className="max-w-full max-h-full object-contain rounded-md shadow-lg"
            />
          </div>
        </div>


        {/* === RIGHT COLUMN: Answer/Interaction Area === */}
        <div className="flex flex-col space-y-6 md:order-last order-last">
          <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">Answer:</h2>

          {/* Answer Box: Also needs to take vertical space using flex-1 */}
          <div className="flex-1 bg-white p-6 rounded-lg shadow-md border border-gray-200 flex flex-col justify-center items-center text-center">
            
            {/* Question Area */}
            {!isAnswerRevealed && (
              <div className="h-full flex flex-col justify-center items-center p-4">
                <h3 className="text-3xl font-extrabold text-gray-900 mb-4 tracking-tight">
                  Question:
                </h3>
                <p className="text-2xl text-gray-700 font-medium italic max-w-lg">
                  {currentQuestion.questionText}
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
                  : (isAnswerRevealed ? 'bg-gray-400 text-gray-600 cursor-wait' : 'bg-gray-900 text-white hover:bg-blue-700')
                }`}
            >
              {isAnswerRevealed && isAnimationComplete ? 'Analysis Complete' : 'Reveal Answer'}
            </button>
            <button
              onClick={handleSkipQuestion}
              className="px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition duration-150"
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