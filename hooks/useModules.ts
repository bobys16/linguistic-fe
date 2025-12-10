'use client';

// Custom hooks for modules
import { useQuery } from '@tanstack/react-query';
import { modulesAPI } from '@/lib/apiClient';
import { Module } from '@/lib/types';

export const useModules = () => {
  return useQuery({
    queryKey: ['modules'],
    queryFn: async () => {
      const response = await modulesAPI.getAll();
      return response.data.data.modules as Module[];
    },
  });
};

export const useModule = (id: string) => {
  return useQuery({
    queryKey: ['module', id],
    queryFn: async () => {
      const response = await modulesAPI.getById(id);
      return response.data.data.module as Module;
    },
    enabled: !!id,
  });
};
