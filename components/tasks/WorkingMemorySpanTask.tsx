'use client';

// Working Memory Span Task Component
import React, { useState, useEffect } from 'react';
import { Task } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

interface WorkingMemorySpanTaskProps {
  task: Task;
  onComplete: (response: any) => void;
}

export const WorkingMemorySpanTask: React.FC<WorkingMemorySpanTaskProps> = ({
  task,
  onComplete,
}) => {
  const [currentTrial, setCurrentTrial] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [responses, setResponses] = useState<any[]>([]);
  const [showingSequence, setShowingSequence] = useState(false);
  const [currentSequence, setCurrentSequence] = useState<any[]>([]);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [showingAllSentences, setShowingAllSentences] = useState(false);

  const isReadingSpan = task.type === 'READING_SPAN';
  const sentences = task.config?.sentences || [];
  const sequences = task.config?.correctSequences || task.config?.sequences || [];

  useEffect(() => {
    if (isReadingSpan && currentTrial === 0 && !showingAllSentences) {
      // For reading span, show sentences one by one
      setShowingAllSentences(true);
      showSentencesSequentially();
    } else if (!isReadingSpan && currentTrial < sequences.length) {
      showSequence(sequences[currentTrial]);
    }
  }, [currentTrial]);

  const showSentencesSequentially = () => {
    if (sentences.length === 0) return;
    
    setCurrentSentenceIndex(0);
    setShowingSequence(true);
    
    const showNextSentence = (index: number) => {
      if (index < sentences.length) {
        setCurrentSentenceIndex(index);
        setTimeout(() => {
          showNextSentence(index + 1);
        }, 3000); // Show each sentence for 3 seconds
      } else {
        setShowingSequence(false);
      }
    };
    
    showNextSentence(0);
  };

  const showSequence = (sequence: any[]) => {
    setShowingSequence(true);
    setCurrentSequence(sequence);

    setTimeout(() => {
      setShowingSequence(false);
      setCurrentSequence([]);
    }, 2000 + sequence.length * 500);
  };

  const handleSubmit = () => {
    const input = userInput.trim().split(/[\s,]+/).map(item => {
      const num = parseInt(item);
      return isNaN(num) ? item : num;
    });

    const newResponses = [...responses, { userInput: input }];
    setResponses(newResponses);
    setUserInput('');

    if (currentTrial < sequences.length - 1) {
      setCurrentTrial(currentTrial + 1);
    } else {
      onComplete({ trials: newResponses });
    }
  };

  if (showingSequence) {
    if (isReadingSpan) {
      // Show current sentence for reading span
      const currentSentence = sentences[currentSentenceIndex];
      return (
        <Card>
          <div className="text-center py-12">
            <p className="text-gray-600 mb-8">
              Read this sentence carefully:
            </p>
            <p className="text-2xl text-gray-900 mb-4">
              {typeof currentSentence === 'string' ? currentSentence : currentSentence?.text}
            </p>
            <p className="text-sm text-gray-500">
              Sentence {currentSentenceIndex + 1} of {sentences.length}
            </p>
          </div>
        </Card>
      );
    } else {
      // Show digit sequence for digit span
      return (
        <Card>
          <div className="text-center py-12">
            <p className="text-gray-600 mb-8">Remember this sequence:</p>
            <div className="flex items-center justify-center space-x-4">
              {currentSequence.map((item, idx) => (
                <div
                  key={idx}
                  className="w-16 h-16 bg-blue-600 text-white rounded-lg flex items-center justify-center text-2xl font-bold"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </Card>
      );
    }
  }

  return (
    <Card>
      <div className="space-y-6">
        <div className="text-center">
          <p className="text-lg font-medium text-gray-900 mb-2">
            {isReadingSpan ? 'Recall Task' : `Trial ${currentTrial + 1} of ${sequences.length}`}
          </p>
          <p className="text-gray-600">
            {isReadingSpan 
              ? 'Enter the last word of each sentence (separate with spaces or commas)'
              : 'Enter the sequence you just saw (separate with spaces or commas)'}
          </p>
        </div>

        <div>
          <input
            type="text"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-lg"
            placeholder={isReadingSpan ? "e.g., mat car bright" : "e.g., 3 7 2"}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
            autoFocus
          />
        </div>

        <Button onClick={handleSubmit} className="w-full" disabled={!userInput.trim()}>
          Submit Answer
        </Button>
      </div>
    </Card>
  );
};
