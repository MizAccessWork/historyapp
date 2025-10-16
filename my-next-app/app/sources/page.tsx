'use client'; 

import React, { useState } from 'react';

// Define a type for the component props if needed, but for a structural component, it's often empty
type HistorySimulatorProps = {};

/**
 * A Next.js/React component for the History Interview Simulator.
 * It provides a two-column layout for the question/answer and the source image.
 */
const HistorySimulator: React.FC<HistorySimulatorProps> = () => {
  // Placeholder state for demonstration
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  
  // --- PLACEHOLDER DATA: REPLACE WITH REAL DATA/PROPS LATER ---
  const sourceTitle = "Source: George Washington's Portrait"; 
  // NOTE: Replace this with the actual URL or local path to your image
  const imageUrl = "https://i.imgur.com/example-of-your-image.jpg"; 
  const answerText = "This 18th-century Persian carpet, likely a Kerman or Isfahan, is featured prominently in the background of Gilbert Stuart's famous 'Landsdowne' portrait of George Washington, signifying wealth and global trade.";
  // -----------------------------------------------------------

  return (
    // Main container. Assumes it takes up the full width/height of the content area next to the sidebar.
    <div className="flex flex-col p-4 md:p-8 min-h-screen bg-gray-50">
      
      {/* Source Title / Context */}
      <h1 className="text-2xl font-bold mb-6 text-gray-800">{sourceTitle}</h1>

      {/* Two-Column Split: Answer (Left) and Source (Right) */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* === LEFT COLUMN: Answer, Buttons, and Interaction Area === */}
        <div className="flex flex-col space-y-6">
          <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">Your Analysis / Question</h2>

          {/* Area for User's Input / Current Question (Placeholder) */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex-1 min-h-[150px]">
            <p className="text-gray-500 italic">
              *Space for the interview question or where the user will provide their answer.*
            </p>
          </div>

          {/* Answer Reveal Area (Conditional Display) */}
          <div 
            className={`transition-all duration-500 ease-in-out ${isAnswerRevealed ? 'opacity-100 max-h-screen p-6 border-green-200' : 'opacity-0 max-h-0 overflow-hidden p-0 border-transparent'} bg-green-50 rounded-lg border`}
          >
            <h3 className="text-lg font-bold text-green-800 mb-2">Correct Answer & Analysis:</h3>
            <p className="text-gray-700">{answerText}</p>
          </div>
          
          {/* Action Buttons */}
          <div className="flex justify-between pt-4">
            <button
              onClick={() => setIsAnswerRevealed(true)} 
              disabled={isAnswerRevealed}
              className={`px-6 py-3 font-semibold rounded-lg shadow-md transition duration-150 
                ${isAnswerRevealed 
                  ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
            >
              {isAnswerRevealed ? 'Answer Revealed' : 'Reveal Answer'}
            </button>
            <button
              onClick={() => {
                console.log('Skipping question and resetting...');
                setIsAnswerRevealed(false);
                // Add logic here to load the next question/image
              }}
              className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition duration-150"
            >
              Skip Question
            </button>
          </div>
        </div>

        {/* === RIGHT COLUMN: Image Source Area === */}
        <div className="flex flex-col space-y-4 md:order-last order-first">
          <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">Visual Source Image</h2>
          
          {/* Image Container with specific fitting rules */}
          <div className="flex-1 flex justify-center items-center bg-white p-4 rounded-lg shadow-inner border border-gray-200 min-h-[300px]">
            <img 
              src={imageUrl} 
              alt="Historical Source Image"
              // The key to fitting: max-w-full and max-h-[85vh] (to ensure it doesn't take the full screen height)
              // object-contain scales the image to fit fully within the container without cropping.
              className="max-w-full max-h-[85vh] object-contain rounded-md shadow-lg"
            />
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default HistorySimulator;