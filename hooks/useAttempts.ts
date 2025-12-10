'use client';

// Custom hooks for attempts
import { useQuery } from '@tanstack/react-query';
import { attemptsAPI } from '@/lib/apiClient';
import { Attempt } from '@/lib/types';

export const useLatestAttempts = (limit: number = 10) => {
  return useQuery({
    queryKey: ['attempts', 'latest', limit],
    queryFn: async () => {
      const response = await attemptsAPI.getLatest(limit);
      return response.data.data.attempts as Attempt[];
    },
  });
};

export const useAttemptSummary = (moduleId?: string) => {
  return useQuery({
    queryKey: ['attempts', 'summary', moduleId],
    queryFn: async () => {
      const response = await attemptsAPI.getSummary(moduleId);
      return response.data.data.summary;
    },
  });
};

export const useTaskAttempts = (taskId: string) => {
  return useQuery({
    queryKey: ['attempts', 'task', taskId],
    queryFn: async () => {
      const response = await attemptsAPI.getByTask(taskId);
      return response.data.data.attempts as Attempt[];
    },
    enabled: !!taskId,
  });
};
