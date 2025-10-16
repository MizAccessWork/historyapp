'use client'; 

import React, { useState, useEffect } from 'react';

// --- CONFIGURATION CONSTANTS ---
const SOURCE_TITLE = "History Interview Simulator"; 
const IMAGE_URL = "https://i.imgur.com/example-of-your-image.jpg"; // Replace with your actual image URL
// The full text to be revealed word by word
const QUESTION_TEXT = "What is the historical significance of the carpet featured in the background of George Washington's portrait?";
const FULL_ANSWER_TEXT = "This 18th-century Persian carpet, likely a Kerman or Isfahan, is featured prominently in the background of Gilbert Stuart's famous 'Landsdowne' portrait of George Washington, signifying wealth and global trade and reflecting the complex global commerce of the era. Its inclusion was a deliberate choice to elevate Washington's status.";
const ANSWER_WORDS = FULL_ANSWER_TEXT.split(' '); 
const TYPING_SPEED_MS = 45; // Slightly faster typing speed
// --- END CONFIGURATION ---

type HistorySimulatorProps = {};

const HistorySimulator: React.FC<HistorySimulatorProps> = () => {
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  // Dynamically build the answer string based on the current wordCount
  const displayedAnswer = ANSWER_WORDS.slice(0, wordCount).join(' ');

  // Determine if the full answer has been displayed
  const isAnimationComplete = wordCount >= ANSWER_WORDS.length;

  // useEffect hook to handle the word-by-word animation
  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (isAnswerRevealed && !isAnimationComplete) {
      // Start the interval timer
      intervalId = setInterval(() => {
        setWordCount(prevCount => prevCount + 1);
      }, TYPING_SPEED_MS);
    } else if (!isAnswerRevealed) {
        // If the answer is hidden, reset the word count
        setWordCount(0);
    }

    // Cleanup function to clear the interval
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isAnswerRevealed, isAnimationComplete]); 

  const handleRevealAnswer = () => {
    if (!isAnswerRevealed) {
      setIsAnswerRevealed(true);
    }
  };

  const handleSkipQuestion = () => {
    console.log('Skipping question and resetting...');
    setIsAnswerRevealed(false);
    setWordCount(0);
    // Add logic here to load the next question/image
  };


  return (
    // Main container (fills the available content space)
    <div className="flex flex-col p-4 md:p-8 min-h-screen bg-gray-50">
      
      {/* Main Title */}
      <h1 className="text-2xl font-bold mb-6 text-gray-800">{SOURCE_TITLE}</h1>

      {/* Two-Column Split: Image (Left) and Answer/Interaction (Right) */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* === LEFT COLUMN: Image Source Area === */}
        <div className="flex flex-col space-y-4 md:order-first order-first">
          {/* Heading: "Source:" */}
          <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">Source:</h2>
          
          {/* Image Container */}
          <div className="flex-1 flex justify-center items-center bg-white p-4 rounded-lg shadow-inner border border-gray-200 min-h-[300px]">
            <img 
              src={IMAGE_URL} 
              alt="Historical Source Image"
              className="max-w-full max-h-full object-contain rounded-md shadow-lg"
            />
          </div>
        </div>


        {/* === RIGHT COLUMN: Answer/Interaction Area === */}
        <div className="flex flex-col space-y-6 md:order-last order-last">
          {/* Heading: "Answer:" */}
          <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">Answer:</h2>

          {/* Main Content Box - The area that will display the question OR the animated answer */}
          <div className="flex-1 bg-white p-6 rounded-lg shadow-md border border-gray-200 flex flex-col justify-center items-center text-center">
            
            {/* Question Area (Prominent, Centered, Hidden on Reveal) */}
            {!isAnswerRevealed && (
              <div className="h-full flex flex-col justify-center items-center p-4">
                <h3 className="text-3xl font-extrabold text-gray-900 mb-4 tracking-tight">
                  Question:
                </h3>
                <p className="text-2xl text-gray-700 font-medium italic max-w-lg">
                  {QUESTION_TEXT}
                </p>
              </div>
            )}

            {/* Answer Reveal Area (Takes up the whole box on Reveal) */}
            {isAnswerRevealed && (
              // Reset alignment for the answer text
              <div className="h-full w-full text-left">
                <h3 className="text-xl font-bold text-green-700 mb-3">Correct Analysis:</h3>
                <p className="text-lg text-gray-800 whitespace-pre-wrap leading-relaxed">
                  {displayedAnswer}
                  {/* Subtle cursor blink animation while typing */}
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