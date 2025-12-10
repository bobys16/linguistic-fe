'use client';

// Reflection Prompt Task Component
import React, { useState } from 'react';
import { Task } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Textarea } from '@/components/ui/Textarea';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';

interface ReflectionPromptTaskProps {
  task: Task;
  onComplete: (response: any) => void;
}

export const ReflectionPromptTask: React.FC<ReflectionPromptTaskProps> = ({
  task,
  onComplete,
}) => {
  const [content, setContent] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const prompt = task.config?.prompt || task.instructions;
  const minWords = task.config?.minWords || 50;

  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;

  const handleAddTag = () => {
    const trimmedTag = tagInput.trim().toLowerCase();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = () => {
    onComplete({ content, tags });
  };

  return (
    <Card>
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Reflection</h3>
          {prompt && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-gray-900">{prompt}</p>
            </div>
          )}
        </div>

        <Textarea
          label="Your Reflection"
          placeholder="Share your thoughts, insights, and observations..."
          rows={12}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">
            Word count: {wordCount} {minWords && `/ ${minWords} minimum`}
          </span>
          {wordCount < minWords && (
            <span className="text-yellow-600">
              {minWords - wordCount} more words needed
            </span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tags (Optional)
          </label>
          <div className="flex items-center space-x-2 mb-2">
            <Input
              placeholder="Add a tag..."
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
            />
            <Button type="button" onClick={handleAddTag} size="sm">
              Add
            </Button>
          </div>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="info">
                  {tag}
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-2 text-blue-800 hover:text-blue-900"
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>

        <Button
          onClick={handleSubmit}
          className="w-full"
          disabled={!content.trim() || wordCount < minWords}
        >
          Submit Reflection
        </Button>
      </div>
    </Card>
  );
};
