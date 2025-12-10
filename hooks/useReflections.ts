'use client';

// Custom hooks for reflections
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { reflectionsAPI } from '@/lib/apiClient';
import { Reflection } from '@/lib/types';

export const useReflections = (limit: number = 50, offset: number = 0, tags?: string) => {
  return useQuery({
    queryKey: ['reflections', limit, offset, tags],
    queryFn: async () => {
      const response = await reflectionsAPI.getAll(limit, offset, tags);
      return {
        reflections: response.data.data.reflections as Reflection[],
        total: response.data.data.total,
      };
    },
  });
};

export const useCreateReflection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ content, tags }: { content: string; tags?: string[] }) => {
      const response = await reflectionsAPI.create(content, tags || []);
      return response.data.data.reflection as Reflection;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reflections'] });
    },
  });
};

export const useUpdateReflection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ 
      id, 
      data 
    }: { 
      id: string; 
      data: { content?: string; tags?: string[] } 
    }) => {
      const response = await reflectionsAPI.update(id, data);
      return response.data.data.reflection as Reflection;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reflections'] });
    },
  });
};

export const useDeleteReflection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await reflectionsAPI.delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reflections'] });
    },
  });
};
