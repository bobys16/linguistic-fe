'use client';

// Form-Meaning Mapping Task Component
import React, { useState } from 'react';
import { Task } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

interface FormMeaningMappingTaskProps {
  task: Task;
  onComplete: (response: any) => void;
}

export const FormMeaningMappingTask: React.FC<FormMeaningMappingTaskProps> = ({
  task,
  onComplete,
}) => {
  const correctMappings = task.config?.correctMappings || [];
  
  // Extract forms and meanings separately and shuffle meanings
  const forms = correctMappings.map((m: any) => m.form);
  const meanings = [...correctMappings.map((m: any) => m.meaning)].sort(() => Math.random() - 0.5);
  
  const [selectedMappings, setSelectedMappings] = useState<{ [key: string]: string }>({});

  const handleMappingSelect = (form: string, meaning: string) => {
    setSelectedMappings(prev => ({
      ...prev,
      [form]: meaning,
    }));
  };

  const handleSubmit = () => {
    const mappings = Object.entries(selectedMappings).map(([form, meaning]) => ({
      form,
      selectedMeaning: meaning,
    }));
    
    onComplete({ mappings });
  };

  const isComplete = forms.length > 0 && forms.every((form: string) => selectedMappings[form]);

  return (
    <Card>
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Form-Meaning Mapping</h3>
          <p className="text-gray-600">
            Match each grammatical form with its correct meaning or function.
          </p>
        </div>

        <div className="space-y-4">
          {forms.map((form: string, index: number) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="mb-3">
                <p className="text-sm font-medium text-gray-700 mb-1">Form:</p>
                <p className="text-lg font-semibold text-gray-900">{form}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Select meaning:</p>
                <div className="space-y-2">
                  {meanings.map((meaning: string, mIndex: number) => (
                    <label
                      key={mIndex}
                      className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                        selectedMappings[form] === meaning
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`mapping-${index}`}
                        value={meaning}
                        checked={selectedMappings[form] === meaning}
                        onChange={() => handleMappingSelect(form, meaning)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-3 text-gray-900">{meaning}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button
          onClick={handleSubmit}
          className="w-full"
          disabled={!isComplete}
        >
          Submit Mappings
        </Button>
      </div>
    </Card>
  );
};
