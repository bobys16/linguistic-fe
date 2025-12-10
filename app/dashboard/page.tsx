'use client';

// Dashboard Page
import React from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatCard } from '@/components/ui/StatCard';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useProgress } from '@/hooks/useProgress';
import { useAuth } from '@/hooks/useAuth';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';

function DashboardContent() {
  const { user } = useAuth();
  const { data: progress, isLoading, error } = useProgress();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-600">Failed to load progress data</p>
      </div>
    );
  }

  const stats = [
    {
      title: 'Tasks Completed',
      value: progress?.totalTasksCompleted || 0,
      icon: '✓',
    },
    {
      title: 'Average Accuracy',
      value: `${(progress?.averageAccuracy || 0).toFixed(1)}%`,
      icon: '🎯',
    },
    {
      title: 'Average Score',
      value: (progress?.averageScore || 0).toFixed(1),
      icon: '⭐',
    },
    {
      title: 'Current Streak',
      value: `${progress?.streak || 0} days`,
      icon: '🔥',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title={`Welcome back, ${user?.name}!`}
        description="Track your progress and continue your learning journey"
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={<span className="text-2xl">{stat.icon}</span>}
          />
        ))}
      </div>

      {/* Module Progress */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Module Progress</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {progress?.moduleProgress.map((module) => (
            <Link key={module.moduleId} href={`/modules/${module.moduleId}`}>
              <Card hover>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {module.moduleTitle}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {module.completedTasks} of {module.totalTasks} tasks completed
                    </p>
                  </div>
                  <Badge variant={module.progressPercentage === 100 ? 'success' : 'info'}>
                    {module.progressPercentage}%
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${module.progressPercentage}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Avg. Accuracy: {module.averageAccuracy.toFixed(1)}%</span>
                    <span>{module.attemptsCount} attempts</span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}

          {(!progress?.moduleProgress || progress.moduleProgress.length === 0) && (
            <Card>
              <p className="text-gray-600 text-center py-8">
                No modules started yet.{' '}
                <Link href="/modules" className="text-blue-600 hover:text-blue-700 font-medium">
                  Explore modules
                </Link>
              </p>
            </Card>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Activity</h2>
        <Card>
          {progress?.recentActivity && progress.recentActivity.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {progress.recentActivity.slice(0, 5).map((activity) => (
                <div key={activity.attemptId} className="py-4 first:pt-0 last:pb-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {activity.taskTitle}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {activity.moduleTitle}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge variant={activity.accuracy && activity.accuracy >= 80 ? 'success' : 'default'}>
                        {activity.accuracy ? `${activity.accuracy}%` : `Score: ${activity.score}`}
                      </Badge>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatDate(activity.completedAt)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center py-8">
              No activity yet. Start by completing a task!
            </p>
          )}
        </Card>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
