'use client';

// Modules List Page
import React from 'react';
import Link from 'next/link';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useModules } from '@/hooks/useModules';
import { useProgress } from '@/hooks/useProgress';
import { ModuleType } from '@/lib/types';

function ModulesContent() {
  const { data: modules, isLoading: modulesLoading } = useModules();
  const { data: progress } = useProgress();

  if (modulesLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const getModuleProgress = (moduleId: string) => {
    return progress?.moduleProgress.find((mp) => mp.moduleId === moduleId);
  };

  const getModuleIcon = (type: ModuleType): string => {
    const icons: Record<ModuleType, string> = {
      WORKING_MEMORY: '🧠',
      PROCESSING_SPEED: '⚡',
      NOTICING: '👁️',
      REFLECTIVE_PRACTICE: '💭',
    };
    return icons[type] || '📚';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title="Learning Modules"
        description="Explore psycholinguistic concepts through interactive activities"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules?.map((module) => {
          const moduleProgress = getModuleProgress(module.id);
          const progressPercentage = moduleProgress?.progressPercentage || 0;
          const tasksCompleted = moduleProgress?.completedTasks || 0;
          const totalTasks = module.tasks?.length || 0;

          return (
            <Link key={module.id} href={`/modules/${module.id}`}>
              <Card hover className="h-full">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-4xl">{getModuleIcon(module.type)}</span>
                  {progressPercentage > 0 && (
                    <Badge variant={progressPercentage === 100 ? 'success' : 'info'}>
                      {progressPercentage}%
                    </Badge>
                  )}
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {module.title}
                </h3>

                <p className="text-gray-600 mb-4 line-clamp-3">
                  {module.description}
                </p>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{totalTasks} tasks</span>
                    {tasksCompleted > 0 && (
                      <span>{tasksCompleted} completed</span>
                    )}
                  </div>

                  {progressPercentage > 0 && (
                    <ProgressBar value={progressPercentage} showPercentage={false} />
                  )}

                  {moduleProgress && (
                    <div className="text-sm text-gray-600">
                      Avg. Accuracy: {moduleProgress.averageAccuracy.toFixed(1)}%
                    </div>
                  )}
                </div>
              </Card>
            </Link>
          );
        })}
      </div>

      {(!modules || modules.length === 0) && (
        <Card>
          <p className="text-center text-gray-600 py-8">
            No modules available at the moment.
          </p>
        </Card>
      )}
    </div>
  );
}

export default function ModulesPage() {
  return (
    <ProtectedRoute>
      <ModulesContent />
    </ProtectedRoute>
  );
}
