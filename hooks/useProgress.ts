'use client';

// Custom hooks for progress
import { useQuery } from '@tanstack/react-query';
import { progressAPI } from '@/lib/apiClient';
import { Progress } from '@/lib/types';

export const useProgress = () => {
  return useQuery({
    queryKey: ['progress'],
    queryFn: async () => {
      try {
        const response = await progressAPI.getMy();
        return response.data.data.progress as Progress;
      } catch (error: any) {
        // If no progress exists yet, return default values
        if (error.response?.status === 404) {
          return {
            totalTasksCompleted: 0,
            uniqueTasksCompleted: 0,
            totalAttempts: 0,
            averageAccuracy: 0,
            averageScore: 0,
            lastActivityDate: null,
            streak: 0,
            moduleProgress: [],
            recentActivity: [],
          } as Progress;
        }
        throw error;
      }
    },
  });
};

export const useModuleProgress = (moduleId: string) => {
  return useQuery({
    queryKey: ['progress', 'module', moduleId],
    queryFn: async () => {
      try {
        const response = await progressAPI.getModule(moduleId);
        return response.data.data.progress;
      } catch (error: any) {
        // If no progress exists yet for this module, return default values
        if (error.response?.status === 404) {
          return {
            progressPercentage: 0,
            completedTasks: 0,
            totalTasks: 0,
            averageAccuracy: 0,
            attemptsCount: 0,
            taskProgress: [],
          };
        }
        throw error;
      }
    },
    enabled: !!moduleId,
  });
};
