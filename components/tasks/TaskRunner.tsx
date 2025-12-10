'use client';

// Task Runner Component - Orchestrates different task types
import React, { useState } from 'react';
import { Task } from '@/lib/types';
import { WorkingMemorySpanTask } from './WorkingMemorySpanTask';
import { ProcessingSpeedLexicalDecisionTask } from './ProcessingSpeedLexicalDecisionTask';
import { ProcessingSpeedSentenceVerificationTask } from './ProcessingSpeedSentenceVerificationTask';
import { NoticingErrorCorrectionTask } from './NoticingErrorCorrectionTask';
import { FormMeaningMappingTask } from './FormMeaningMappingTask';
import { ReflectionPromptTask } from './ReflectionPromptTask';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface TaskRunnerProps {
  task: Task;
  onComplete: (response: any) => void;
}

export const TaskRunner: React.FC<TaskRunnerProps> = ({ task, onComplete }) => {
  const [showInstructions, setShowInstructions] = useState(true);

  if (showInstructions) {
    return (
      <Card>
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{task.title}</h2>
            <p className="text-gray-600">{task.description}</p>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-bold text-gray-900 mb-2">Instructions:</h3>
            <p className="text-gray-900 whitespace-pre-line">{task.instructions}</p>
          </div>

          <Button onClick={() => setShowInstructions(false)} className="w-full" size="lg">
            Start Task
          </Button>
        </div>
      </Card>
    );
  }

  // Route to appropriate task component based on task type
  switch (task.type) {
    case 'WORKING_MEMORY_SPAN':
    case 'DIGIT_SPAN':
    case 'READING_SPAN':
      return <WorkingMemorySpanTask task={task} onComplete={onComplete} />;

    case 'PROCESSING_SPEED_LEXICAL_DECISION':
    case 'LEXICAL_DECISION':
      return <ProcessingSpeedLexicalDecisionTask task={task} onComplete={onComplete} />;

    case 'PROCESSING_SPEED_SENTENCE_VERIFICATION':
    case 'SENTENCE_VERIFICATION':
      return <ProcessingSpeedSentenceVerificationTask task={task} onComplete={onComplete} />;

    case 'NOTICING_ERROR_CORRECTION':
    case 'ERROR_CORRECTION':
      return <NoticingErrorCorrectionTask task={task} onComplete={onComplete} />;

    case 'FORM_MEANING_MAPPING':
      return <FormMeaningMappingTask task={task} onComplete={onComplete} />;

    case 'REFLECTION_PROMPT':
    case 'GUIDED_REFLECTION':
    case 'FREE_REFLECTION':
      return <ReflectionPromptTask task={task} onComplete={onComplete} />;

    default:
      return (
        <Card>
          <div className="text-center py-12">
            <p className="text-red-600">
              Task type &quot;{task.type}&quot; is not yet implemented.
            </p>
          </div>
        </Card>
      );
  }
};
