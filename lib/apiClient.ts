// API Client for backend communication
import axios, { AxiosError, AxiosInstance } from 'axios';
import { ApiResponse } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';
const API_TIMEOUT = parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '10000');

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add auth token
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiResponse<any>>) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (email: string, password: string, name: string) =>
    apiClient.post('/api/auth/register', { email, password, name }),

  login: (email: string, password: string) =>
    apiClient.post('/api/auth/login', { email, password }),

  getCurrentUser: () => apiClient.get('/api/auth/me'),
};

// Modules API
export const modulesAPI = {
  getAll: () => apiClient.get('/api/modules'),

  getById: (id: string) => apiClient.get(`/api/modules/${id}`),
};

// Tasks API
export const tasksAPI = {
  getById: (id: string) => apiClient.get(`/api/tasks/${id}`),
};

// Attempts API
export const attemptsAPI = {
  create: (attemptData: {
    taskId: string;
    startTime: string;
    endTime: string;
    response: any;
  }) => apiClient.post('/api/attempts', attemptData),

  getLatest: (limit: number = 10) =>
    apiClient.get(`/api/attempts/my-latest?limit=${limit}`),

  getSummary: (moduleId?: string) => {
    const params = moduleId ? `?moduleId=${moduleId}` : '';
    return apiClient.get(`/api/attempts/my-summary${params}`);
  },

  getByTask: (taskId: string) =>
    apiClient.get(`/api/attempts/my-latest?taskId=${taskId}`),
};

// Reflections API
export const reflectionsAPI = {
  create: (content: string, tags: string[] = []) =>
    apiClient.post('/api/reflections', { content, tags }),

  getAll: (limit: number = 50, offset: number = 0, tags?: string) => {
    const params = new URLSearchParams({ 
      limit: limit.toString(), 
      offset: offset.toString() 
    });
    if (tags) params.append('tags', tags);
    return apiClient.get(`/api/reflections/my?${params}`);
  },

  update: (id: string, data: { content?: string; tags?: string[] }) =>
    apiClient.patch(`/api/reflections/${id}`, data),

  delete: (id: string) => apiClient.delete(`/api/reflections/${id}`),
};

// Progress API
export const progressAPI = {
  getMy: () => apiClient.get('/api/progress/my'),

  getModule: (moduleId: string) =>
    apiClient.get(`/api/progress/module/${moduleId}`),
};

export default apiClient;
