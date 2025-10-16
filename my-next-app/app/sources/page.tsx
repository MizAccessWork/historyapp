'use client'; 

import React, { useState, useEffect } from 'react';

// Define the content constants outside the component to avoid re-creation on every render
const SOURCE_TITLE = "Source: George Washington's Portrait"; 
const IMAGE_URL = "https://i.imgur.com/example-of-your-image.jpg"; // Replace with your actual image URL
const FULL_ANSWER_TEXT = "This 18th-century Persian carpet, likely a Kerman or Isfahan, is featured prominently in the background of Gilbert Stuart's famous 'Landsdowne' portrait of George Washington, signifying wealth and global trade.";
const ANSWER_WORDS = FULL_ANSWER_TEXT.split(' '); // Split the answer into an array of words
const TYPING_SPEED_MS = 60; // Adjust this value to control the speed of the animation

type HistorySimulatorProps = {};

const HistorySimulator: React.FC<HistorySimulatorProps> = () => {
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  // Combine the displayed words back into a single string
  const displayedAnswer = ANSWER_WORDS.slice(0, wordCount).join(' ') + 
    (wordCount < ANSWER_WORDS.length ? (wordCount > 0 ? '...' : '') : '');

  // useEffect hook to handle the word-by-word animation
  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (isAnswerRevealed && wordCount < ANSWER_WORDS.length) {
      // Start the interval timer
      intervalId = setInterval(() => {
        setWordCount(prevCount => {
          // If we reach the end of the text, clear the interval
          if (prevCount >= ANSWER_WORDS.length) {
            if (intervalId) clearInterval(intervalId);
            return prevCount;
          }
          // Otherwise, increment the count
          return prevCount + 1;
        });
      }, TYPING_SPEED_MS);
    } else if (!isAnswerRevealed) {
        // If the answer is hidden, reset the word count
        setWordCount(0);
    }

    // Cleanup function to clear the interval when the component unmounts 
    // or when dependencies change (i.e., when animation finishes)
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isAnswerRevealed, wordCount]); // Depend on isAnswerRevealed and wordCount

  const handleRevealAnswer = () => {
    if (!isAnswerRevealed) {
      setIsAnswerRevealed(true);
      // setWordCount(1); // Start with the first word
    }
  };

  const handleSkipQuestion = () => {
    console.log('Skipping question and resetting...');
    setIsAnswerRevealed(false);
    setWordCount(0);
    // Add logic here to load the next question/image
  };

  // Determine if the full answer has been displayed
  const isAnimationComplete = wordCount >= ANSWER_WORDS.length;

  return (
    // Main container. Assumes it takes up the full width/height of the content area next to the sidebar.
    <div className="flex flex-col p-4 md:p-8 min-h-screen bg-gray-50">
      
      {/* Source Title / Context */}
      <h1 className="text-2xl font-bold mb-6 text-gray-800">{SOURCE_TITLE}</h1>

      {/* Two-Column Split: Answer (Left) and Source (Right) */}
      {/* md:grid-cols-2 ensures the split view on desktop */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* === LEFT COLUMN: Answer, Buttons, and Interaction Area (Order-first on mobile) === */}
        <div className="flex flex-col space-y-6 md:order-first order-first">
          <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">Your Analysis / Question</h2>

          {/* Area for User's Input / Current Question (Placeholder) */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex-1 min-h-[150px]">
            <p className="text-gray-500 italic">
              *Space for the interview question or where the user will provide their answer.*
            </p>
          </div>

          {/* Answer Reveal Area */}
          <div 
            // Only show the answer area once the button is clicked
            className={`transition-all duration-500 ease-in-out ${isAnswerRevealed ? 'opacity-100 max-h-screen p-6 border-green-200' : 'opacity-0 max-h-0 overflow-hidden p-0 border-transparent'} bg-green-50 rounded-lg border`}
          >
            <h3 className="text-lg font-bold text-green-800 mb-2">Correct Answer & Analysis:</h3>
            <p className="text-gray-700 whitespace-pre-wrap">
              {displayedAnswer}
            </p>
          </div>
          
          {/* Action Buttons */}
          <div className="flex justify-between pt-4">
            <button
              onClick={handleRevealAnswer}
              // Disable button only when animation is running or complete
              disabled={isAnswerRevealed && isAnimationComplete}
              className={`px-6 py-3 font-semibold rounded-lg shadow-md transition duration-150 
                ${isAnswerRevealed && isAnimationComplete
                  ? 'bg-green-600 text-white cursor-not-allowed' // Change color when revealed
                  : (isAnswerRevealed ? 'bg-gray-400 text-gray-600 cursor-wait' : 'bg-blue-600 text-white hover:bg-blue-700') // Show 'wait' cursor during typing
                }`}
            >
              {isAnswerRevealed && isAnimationComplete ? 'Answer Revealed' : 'Reveal Answer'}
            </button>
            <button
              onClick={handleSkipQuestion}
              className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition duration-150"
            >
              Skip Question
            </button>
          </div>
        </div>

        {/* === RIGHT COLUMN: Image Source Area (Order-last on mobile) === */}
        <div className="flex flex-col space-y-4 md:order-last order-first">
          <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">Visual Source Image</h2>
          
          {/* Image Container with specific fitting rules */}
          <div className="flex-1 flex justify-center items-center bg-white p-4 rounded-lg shadow-inner border border-gray-200 min-h-[300px]">
            <img 
              src={IMAGE_URL} 
              alt="Historical Source Image"
              // Image fitting: max-w-full and max-h-[85vh] (to ensure it doesn't dominate)
              className="max-w-full max-h-[85vh] object-contain rounded-md shadow-lg"
            />
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default HistorySimulator;