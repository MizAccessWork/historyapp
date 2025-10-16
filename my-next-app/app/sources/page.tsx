// pages/app/sources/page.tsx (or similar)

import Image from 'next/image';
import allSources from '@/app/data/sources.json'; 

// Define the interface for the full data structure
interface ModelAnswer {
  // Define the structure of your answer here later (e.g., key_points: string[])
  [key: string]: any; // Use a more permissive type for now
}

interface Source {
  id: number;
  source_title: string;
  source_type: 'Image' | 'Text'; 
  source_file?: string; 
  source_content?: string; 
  question: string;
  model_answer: ModelAnswer; // MUST BE PRESENT IN THE JSON
}

// Tell TypeScript that the imported JSON array conforms to the Source interface
const sourcesData: Source[] = allSources as Source[];


export default function FirstSourceDisplay() {
  // Use the correctly typed array for finding the source
  const firstSource = sourcesData.find(source => source.id === 1);

  // The rest of your display logic is correct:
  if (!firstSource) {
    return <div>Source not found.</div>;
  }
  
  const isImageSource = firstSource.source_type === 'Image';

  return (
    <div className="source-interview-area">
      <h1>Source: {firstSource.source_title}</h1>
      
      {isImageSource && firstSource.source_file && (
        <div className="source-image-wrapper">
          <Image
            src={firstSource.source_file}
            alt={`Historical Source: ${firstSource.source_title}`}
            width={600} 
            height={400}
            style={{ objectFit: 'contain' }}
          />
        </div>
      )}

      {!isImageSource && <p>This source is a Text document.</p>}
      
      <h2>Question:</h2>
      <p>{firstSource.question}</p>
      
    </div>
  );
}