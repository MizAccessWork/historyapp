'use client'; 

import React, { useState, useEffect, useMemo } from 'react';
// Assuming your data structure is in place:
import { allHistoryQuestions, HistoryQuestion } from '@/app/data/historyData'; 

// --- CONFIGURATION CONSTANTS ---
// Renamed for clarity: this is now the delay between section/paragraph reveals
const SECTION_REVEAL_DELAY_MS = 300; 
// NEW: Constant for how many lines make up one animated section
const LINES_PER_REVEAL_SECTION = 3; 
// --- END CONFIGURATION ---

type HistorySimulatorProps = {};

const HistorySimulator: React.FC<HistorySimulatorProps> = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  
  // CHANGED: Tracks the number of sections revealed, not words
  const [sectionIndex, setSectionIndex] = useState(0); 

  // --- DERIVED STATE / MEMOIZED VALUES ---
  const currentQuestion: HistoryQuestion = allHistoryQuestions[currentQuestionIndex];
  
  // MODIFIED: Split the answer into sections of 3 lines for the animation
  const ANSWER_SECTIONS = useMemo(() => {
    // 1. Split the entire answer text into individual lines
    const lines = currentQuestion.fullAnswerText.split('\n');
    const sections: string[] = [];
    
    // 2. Group lines into sections of LINES_PER_REVEAL_SECTION
    for (let i = 0; i < lines.length; i += LINES_PER_REVEAL_SECTION) {
      // Slice the array to get the next chunk of lines
      const sectionLines = lines.slice(i, i + LINES_PER_REVEAL_SECTION);
      // Join the lines back with a single newline (\n) to preserve the line breaks 
      // within the newly created section.
      sections.push(sectionLines.join('\n')); 
    }
    
    return sections;
  }, [currentQuestion.fullAnswerText]);
  
  // CHANGED: Displayed answer is now the join of the revealed sections.
  // We use '\n\n' to visually separate the revealed 3-line chunks like new paragraphs.
  const displayedAnswer = ANSWER_SECTIONS.slice(0, sectionIndex).join('\n\n');
  
  // CHANGED: Animation complete when all sections are revealed
  const isAnimationComplete = sectionIndex >= ANSWER_SECTIONS.length;
  // ----------------------------------------

  // useEffect hook for section-by-section animation
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    
    // Check if revealed and not complete
    if (isAnswerRevealed && !isAnimationComplete) {
      // Use setTimeout for a delay between sections
      timeoutId = setTimeout(() => {
        setSectionIndex(prevIndex => prevIndex + 1);
      }, SECTION_REVEAL_DELAY_MS);
    } 
    // Reset section index when answer is hidden
    else if (!isAnswerRevealed) {
        setSectionIndex(0);
    }
    
    // Cleanup function
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  // Dependencies include sectionIndex to trigger the next reveal after a delay
  }, [isAnswerRevealed, isAnimationComplete, currentQuestion.id, sectionIndex]); 

  // Navigation handlers
  const goToNextQuestion = () => {
    const nextIndex = (currentQuestionIndex + 1) % allHistoryQuestions.length;
    setCurrentQuestionIndex(nextIndex);
    setIsAnswerRevealed(false); 
    setSectionIndex(0); // Reset section index
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
    <div className="flex flex-col p-4 md:p-8 min-h-screen bg-gray-50">
      
      {/* Main Title */}
      <h1 className="text-2xl font-bold mb-6 text-gray-800">{currentQuestion.title}</h1>

      {/* Two-Column Split: Image (Left) and Answer/Interaction (Right) */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* === LEFT COLUMN: Image Source Area (No changes needed here for the request) === */}
        <div className="flex flex-col space-y-4 md:order-first order-first">
          <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">Source:</h2>
          
          <div className="flex-1 flex justify-center items-center bg-white p-4 rounded-lg shadow-inner border border-gray-200 min-h-[300px] max-h-[75vh]">
            <img 
              src={currentQuestion.imageUrl}
              alt={currentQuestion.title}
              className="max-w-full max-h-full object-contain rounded-md shadow-lg"
            />
          </div>
        </div>


        {/* === RIGHT COLUMN: Answer/Interaction Area === */}
        <div className="flex flex-col space-y-6 md:order-last order-last">
          <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">Answer:</h2>

          {/* 
            Answer Box: 
            - Use flex-1 to fill vertical space.
            - When answer is revealed, content should align to the start (no justify-center/items-center).
          */}
          <div 
            className={`flex flex-col bg-white p-6 rounded-lg shadow-md border border-gray-200 
              ${!isAnswerRevealed ? 'justify-center items-center text-center' : ''}`}
            style={{ height: '60vh', minHeight: '400px', overflow: 'hidden' }}  
          >
            
            {/* Question Area (Centering is fine here) */}
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
              // CRITICAL: h-full makes it take up the available space from the flex-1 parent.
              // overflow-y-auto adds the scroll bar when content exceeds height, 
              // fulfilling the requirement for internal scrolling.
              <div className="w-full text-left overflow-y-auto flex-1 pr-2"> 
                {/* 
                  Sticky header for the "Correct Analysis" title 
                  (z-10, top-0, bg-white for background)
                */}
                <h3 className="text-xl font-bold text-green-700 mb-3 sticky top-0 bg-white z-10 pb-2 border-b">
                  Correct Analysis:
                </h3>
                
                <p className="text-lg text-gray-800 whitespace-pre-wrap leading-relaxed pt-2">
                  {/* Text appears in sections grouped by 3 lines */}
                  {displayedAnswer} 
                  
                  {/* Blinking cursor/indicator shows animation is ongoing */}
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