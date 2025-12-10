'use client';

// Processing Speed Lexical Decision Task Component
import React, { useState, useEffect } from 'react';
import { Task } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

interface ProcessingSpeedLexicalDecisionTaskProps {
  task: Task;
  onComplete: (response: any) => void;
}

export const ProcessingSpeedLexicalDecisionTask: React.FC<
  ProcessingSpeedLexicalDecisionTaskProps
> = ({ task, onComplete }) => {
  const [currentTrial, setCurrentTrial] = useState(0);
  const [responses, setResponses] = useState<any[]>([]);
  const [startTime, setStartTime] = useState<number>(0);
  const [showReady, setShowReady] = useState(true);

  const stimuli = task.config?.items || task.config?.stimuli || [];

  useEffect(() => {
    if (currentTrial < stimuli.length && !showReady) {
      setStartTime(Date.now());
    }
  }, [currentTrial, showReady, stimuli.length]);

  const handleResponse = (isWord: boolean) => {
    const reactionTime = Date.now() - startTime;
    const newResponses = [...responses, { response: isWord, reactionTime }];
    setResponses(newResponses);

    if (currentTrial < stimuli.length - 1) {
      setShowReady(true);
      setTimeout(() => {
        setCurrentTrial(currentTrial + 1);
        setShowReady(false);
      }, 500);
    } else {
      onComplete({ trials: newResponses });
    }
  };

  if (showReady && currentTrial === 0) {
    return (
      <Card>
        <div className="text-center py-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Get Ready!</h3>
          <p className="text-gray-600 mb-8">
            You will see a series of letter strings. Decide if each one is a real word or not.
          </p>
          <Button onClick={() => setShowReady(false)}>Start</Button>
        </div>
      </Card>
    );
  }

  if (showReady) {
    return (
      <Card>
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-blue-600 rounded-full mx-auto flex items-center justify-center">
            <span className="text-white text-2xl font-bold">+</span>
          </div>
        </div>
      </Card>
    );
  }

  const currentStimulus = stimuli[currentTrial];

  return (
    <Card>
      <div className="space-y-8">
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-4">
            Trial {currentTrial + 1} of {stimuli.length}
          </p>
          <div className="py-12">
            <p className="text-4xl font-bold text-gray-900">
              {currentStimulus?.word || currentStimulus?.text || currentStimulus}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={() => handleResponse(true)}
            variant="primary"
            size="lg"
            className="py-6"
          >
            Real Word
          </Button>
          <Button
            onClick={() => handleResponse(false)}
            variant="secondary"
            size="lg"
            className="py-6"
          >
            Not a Word
          </Button>
        </div>

        <p className="text-center text-sm text-gray-500">
          Respond as quickly and accurately as possible
        </p>
      </div>
    </Card>
  );
};
