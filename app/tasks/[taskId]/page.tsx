'use client';

// Task Page
import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { TaskRunner } from '@/components/tasks/TaskRunner';
import { useTask, useSubmitAttempt } from '@/hooks/useTasks';

function TaskContent() {
  const params = useParams();
  const router = useRouter();
  const taskId = params.taskId as string;

  const { data: task, isLoading: taskLoading } = useTask(taskId);
  const submitAttempt = useSubmitAttempt();

  const [startTime] = useState(new Date().toISOString());
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleTaskComplete = async (response: any) => {
    const endTime = new Date().toISOString();

    try {
      const attempt = await submitAttempt.mutateAsync({
        taskId,
        startTime,
        endTime,
        response,
      });

      setResults(attempt);
      setShowResults(true);
    } catch (error) {
      console.error('Failed to submit attempt:', error);
      alert('Failed to submit your response. Please try again.');
    }
  };

  const handleBackToModule = () => {
    if (task?.moduleId) {
      router.push(`/modules/${task.moduleId}`);
    } else {
      router.push('/modules');
    }
  };

  const handleTryAgain = () => {
    setShowResults(false);
    setResults(null);
    router.refresh();
  };

  if (taskLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!task) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <p className="text-center text-gray-600 py-8">Task not found</p>
        </Card>
      </div>
    );
  }

  if (showResults && results) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-green-100 rounded-full mx-auto flex items-center justify-center">
              <span className="text-4xl">✓</span>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Task Complete!
              </h2>
              <p className="text-gray-600">
                Great job! Here are your results:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Score</p>
                <p className="text-3xl font-bold text-gray-900">{results.score}</p>
              </div>

              {results.accuracy !== null && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Accuracy</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {results.accuracy.toFixed(1)}%
                  </p>
                </div>
              )}

              {results.reactionTime !== null && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Avg. Time</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {results.reactionTime.toFixed(0)}ms
                  </p>
                </div>
              )}
            </div>

            {results.metadata && (
              <div className="p-4 bg-blue-50 rounded-lg text-left">
                <h3 className="font-bold text-gray-900 mb-2">Feedback:</h3>
                <div className="space-y-1 text-sm text-gray-700">
                  {results.metadata.correctTrials !== undefined && (
                    <p>
                      Correct trials: {results.metadata.correctTrials} /{' '}
                      {results.metadata.totalTrials}
                    </p>
                  )}
                  {results.metadata.feedback && (
                    <p className="mt-2">{results.metadata.feedback}</p>
                  )}
                </div>
              </div>
            )}

            <div className="flex items-center justify-center space-x-4 pt-4">
              <Button onClick={handleTryAgain} variant="outline">
                Try Again
              </Button>
              <Button onClick={handleBackToModule}>
                Back to Module
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title={task.title}
        actions={
          <Button variant="outline" onClick={handleBackToModule}>
            Back
          </Button>
        }
      />

      <div className="mb-6 flex items-center space-x-2">
        <Badge variant="info">{task.type.replace(/_/g, ' ')}</Badge>
        {task.module && (
          <Badge variant="default">{task.module.title}</Badge>
        )}
      </div>

      <TaskRunner task={task} onComplete={handleTaskComplete} />
    </div>
  );
}

export default function TaskPage() {
  return (
    <ProtectedRoute>
      <TaskContent />
    </ProtectedRoute>
  );
}
