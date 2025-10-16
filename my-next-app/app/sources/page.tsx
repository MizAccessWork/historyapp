'use client'; 

import React, { useState, useEffect } from 'react';

// --- CONFIGURATION CONSTANTS ---
const SOURCE_TITLE = "History Interview Simulator"; 
const IMAGE_URL = "https://i.imgur.com/example-of-your-image.jpg"; // Replace with your actual image URL
// The full text to be revealed word by word
const FULL_ANSWER_TEXT = "This 18th-century Persian carpet, likely a Kerman or Isfahan, is featured prominently in the background of Gilbert Stuart's famous 'Landsdowne' portrait of George Washington, signifying wealth and global trade and reflecting the complex global commerce of the era.";
const ANSWER_WORDS = FULL_ANSWER_TEXT.split(' '); 
const TYPING_SPEED_MS = 50; 
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
      
      {/* Main Title is kept here */}
      <h1 className="text-2xl font-bold mb-6 text-gray-800">{SOURCE_TITLE}</h1>

      {/* Two-Column Split: Image (Left) and Answer/Interaction (Right) */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* === LEFT COLUMN: Image Source Area === */}
        <div className="flex flex-col space-y-4 md:order-first order-first">
          {/* Simplified Heading: Just "Source:" */}
          <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">Source:</h2>
          
          {/* Image Container with specific fitting rules - Fills its half of the screen */}
          <div className="flex-1 flex justify-center items-center bg-white p-4 rounded-lg shadow-inner border border-gray-200 min-h-[300px]">
            <img 
              src={IMAGE_URL} 
              alt="Historical Source Image"
              className="max-w-full max-h-full object-contain rounded-md shadow-lg"
            />
          </div>
        </div>


        {/* === RIGHT COLUMN: Answer, Buttons, and Interaction Area === */}
        <div className="flex flex-col space-y-6 md:order-last order-last">
          {/* Simplified Heading: Just "Answer:" */}
          <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">Answer:</h2>

          {/* Main Content Box - The area that will display the question OR the animated answer */}
          <div className="flex-1 bg-white p-6 rounded-lg shadow-md border border-gray-200">
            
            {/* Question/Placeholder Area (Visible until button is clicked) */}
            {!isAnswerRevealed && (
              <div className="h-full">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Question Prompt:</h3>
                <p className="text-gray-600 italic">
                  What is the significance of the carpet in the 'Landsdowne' portrait of George Washington? 
                  Use evidence from the source to support your analysis.
                </p>
                {/* Text input area (placeholder) */}
                <textarea 
                    className="w-full mt-4 p-3 border border-gray-300 rounded-md resize-none" 
                    rows={8} 
                    placeholder="Type your analysis here..."
                    disabled
                ></textarea>
              </div>
            )}

            {/* Answer Reveal Area (Animates after button click) */}
            {/* **CRITICAL CHANGE**: The green background and extra padding are removed. */}
            {isAnswerRevealed && (
              <div className="h-full">
                <h3 className="text-lg font-bold text-green-700 mb-3">Correct Analysis:</h3>
                <p className="text-gray-700 whitespace-pre-wrap">
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