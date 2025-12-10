'use client';

// Noticing Error Correction Task Component
import React, { useState } from 'react';
import { Task } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Textarea } from '@/components/ui/Textarea';

interface NoticingErrorCorrectionTaskProps {
  task: Task;
  onComplete: (response: any) => void;
}

export const NoticingErrorCorrectionTask: React.FC<NoticingErrorCorrectionTaskProps> = ({
  task,
  onComplete,
}) => {
  const [corrections, setCorrections] = useState<
    Array<{ original: string; corrected: string; explanation: string }>
  >([]);

  const sentences = task.config?.sentences || [];

  const handleCorrectionChange = (index: number, field: string, value: string) => {
    const sentence = sentences[index];
    const originalText = typeof sentence === 'string' 
      ? sentence 
      : sentence?.text || sentence?.original || '';
    
    const newCorrections = [...corrections];
    newCorrections[index] = {
      ...newCorrections[index],
      [field]: value,
      original: originalText,
    };
    setCorrections(newCorrections);
  };

  const handleSubmit = () => {
    onComplete({ corrections });
  };

  return (
    <Card>
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Error Correction</h3>
          <p className="text-gray-600">
            Identify and correct any errors in the following sentences. If there are no errors,
            write the same sentence again.
          </p>
        </div>

        <div className="space-y-6">
          {sentences.map((sentence: any, index: number) => {
            // Handle different sentence formats
            const sentenceText = typeof sentence === 'string' 
              ? sentence 
              : sentence?.text || sentence?.original || '';
            
            return (
              <div key={index} className="p-4 bg-gray-50 rounded-lg space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Sentence {index + 1}:
                  </p>
                  <p className="text-gray-900 italic">
                    {sentenceText}
                  </p>
                </div>

                <Textarea
                  label="Your Correction"
                  placeholder="Write the corrected sentence..."
                  rows={2}
                  value={corrections[index]?.corrected || ''}
                  onChange={(e) =>
                    handleCorrectionChange(index, 'corrected', e.target.value)
                  }
                />

                <Textarea
                  label="Explanation (Optional)"
                  placeholder="Explain what error you found and why you made this correction..."
                  rows={2}
                  value={corrections[index]?.explanation || ''}
                  onChange={(e) =>
                    handleCorrectionChange(index, 'explanation', e.target.value)
                  }
                />
              </div>
            );
          })}
        </div>

        <Button
          onClick={handleSubmit}
          className="w-full"
          disabled={corrections.filter((c) => c?.corrected).length !== sentences.length}
        >
          Submit Corrections
        </Button>
      </div>
    </Card>
  );
};
