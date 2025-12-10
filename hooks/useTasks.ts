'use client';

// Custom hooks for tasks
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { tasksAPI, attemptsAPI } from '@/lib/apiClient';
import { Task, Attempt } from '@/lib/types';

export const useTask = (id: string) => {
  return useQuery({
    queryKey: ['task', id],
    queryFn: async () => {
      const response = await tasksAPI.getById(id);
      return response.data.data.task as Task;
    },
    enabled: !!id,
  });
};

export const useSubmitAttempt = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (attemptData: {
      taskId: string;
      startTime: string;
      endTime: string;
      response: any;
    }) => {
      const response = await attemptsAPI.create(attemptData);
      return response.data.data.attempt as Attempt;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attempts'] });
      queryClient.invalidateQueries({ queryKey: ['progress'] });
    },
  });
};
