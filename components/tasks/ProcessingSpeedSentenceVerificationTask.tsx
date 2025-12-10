'use client';

// Processing Speed Sentence Verification Task Component
import React, { useState, useEffect } from 'react';
import { Task } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

interface ProcessingSpeedSentenceVerificationTaskProps {
  task: Task;
  onComplete: (response: any) => void;
}

export const ProcessingSpeedSentenceVerificationTask: React.FC<
  ProcessingSpeedSentenceVerificationTaskProps
> = ({ task, onComplete }) => {
  const [currentTrial, setCurrentTrial] = useState(0);
  const [responses, setResponses] = useState<any[]>([]);
  const [startTime, setStartTime] = useState<number>(0);
  const [showReady, setShowReady] = useState(true);

  const sentences = task.config?.sentences || [];

  useEffect(() => {
    if (currentTrial < sentences.length && !showReady) {
      setStartTime(Date.now());
    }
  }, [currentTrial, showReady]);

  const handleResponse = (isTrue: boolean) => {
    const reactionTime = Date.now() - startTime;
    const newResponses = [...responses, { response: isTrue, reactionTime }];
    setResponses(newResponses);

    if (currentTrial < sentences.length - 1) {
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
            You will see sentences. Decide if each one is true or false.
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

  const currentSentence = sentences[currentTrial];

  // Safely extract text from various possible sentence formats
  const getSentenceText = (sentence: any): string => {
    if (typeof sentence === 'string') return sentence;
    if (sentence?.text) return sentence.text;
    if (sentence?.sentence) return sentence.sentence;
    if (sentence?.statement) return sentence.statement;
    return '';
  };

  return (
    <Card>
      <div className="space-y-8">
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-4">
            Trial {currentTrial + 1} of {sentences.length}
          </p>
          <div className="py-8 px-4">
            <p className="text-xl text-gray-900 leading-relaxed">
              {getSentenceText(currentSentence)}
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
            True
          </Button>
          <Button
            onClick={() => handleResponse(false)}
            variant="secondary"
            size="lg"
            className="py-6"
          >
            False
          </Button>
        </div>

        <p className="text-center text-sm text-gray-500">
          Respond as quickly and accurately as possible
        </p>
      </div>
    </Card>
  );
};
