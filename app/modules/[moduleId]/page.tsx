'use client';

// Module Detail Page
import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useModule } from '@/hooks/useModules';
import { useModuleProgress } from '@/hooks/useProgress';

function ModuleDetailContent() {
  const params = useParams();
  const moduleId = params.moduleId as string;

  const { data: module, isLoading: moduleLoading } = useModule(moduleId);
  const { data: progress } = useModuleProgress(moduleId);

  if (moduleLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!module) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <p className="text-center text-gray-600 py-8">Module not found</p>
        </Card>
      </div>
    );
  }

  const getTaskStatus = (taskId: string): 'completed' | 'in-progress' | 'not-started' => {
    if (!progress?.taskProgress) return 'not-started';
    const taskProgress = progress.taskProgress.find((tp: any) => tp.taskId === taskId);
    if (!taskProgress) return 'not-started';
    if (taskProgress.attemptsCount > 0) return 'completed';
    return 'in-progress';
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="success">Completed</Badge>;
      case 'in-progress':
        return <Badge variant="warning">In Progress</Badge>;
      default:
        return <Badge variant="default">Not Started</Badge>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title={module.title}
        description={module.description}
        actions={
          <Link href="/modules">
            <Button variant="outline">Back to Modules</Button>
          </Link>
        }
      />

      {/* Module Progress Summary */}
      {progress && (
        <Card className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">Progress</p>
              <p className="text-2xl font-bold text-gray-900">
                {progress.progressPercentage || 0}%
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Tasks Completed</p>
              <p className="text-2xl font-bold text-gray-900">
                {progress.completedTasks || 0}/{progress.totalTasks || 0}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Avg. Accuracy</p>
              <p className="text-2xl font-bold text-gray-900">
                {(progress.averageAccuracy || 0).toFixed(1)}%
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Attempts</p>
              <p className="text-2xl font-bold text-gray-900">
                {progress.attemptsCount || 0}
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Tasks List */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Tasks</h2>
        <div className="space-y-4">
          {module.tasks && module.tasks.length > 0 ? (
            module.tasks.map((task) => {
              const status = getTaskStatus(task.id);
              return (
                <Card key={task.id} hover>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-bold text-gray-900">
                          {task.title}
                        </h3>
                        {getStatusBadge(status)}
                      </div>
                      <p className="text-gray-600 mb-4">{task.description}</p>
                      <Link href={`/tasks/${task.id}`}>
                        <Button size="sm">
                          {status === 'completed' ? 'Try Again' : 'Start Task'}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              );
            })
          ) : (
            <Card>
              <p className="text-center text-gray-600 py-8">
                No tasks available in this module yet.
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ModuleDetailPage() {
  return (
    <ProtectedRoute>
      <ModuleDetailContent />
    </ProtectedRoute>
  );
}
