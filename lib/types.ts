// Type definitions for the Psycholinguistics Workbook

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  status: 'success';
  data: {
    user: User;
    token: string;
  };
}

export type ModuleType = 
  | 'WORKING_MEMORY' 
  | 'PROCESSING_SPEED' 
  | 'NOTICING' 
  | 'REFLECTIVE_PRACTICE';

export type TaskType =
  | 'WORKING_MEMORY_SPAN'
  | 'PROCESSING_SPEED_LEXICAL_DECISION'
  | 'PROCESSING_SPEED_SENTENCE_VERIFICATION'
  | 'NOTICING_ERROR_CORRECTION'
  | 'REFLECTION_PROMPT'
  | 'DIGIT_SPAN'
  | 'READING_SPAN'
  | 'LEXICAL_DECISION'
  | 'SENTENCE_VERIFICATION'
  | 'FORM_MEANING_MAPPING'
  | 'ERROR_CORRECTION'
  | 'GUIDED_REFLECTION'
  | 'FREE_REFLECTION';

export interface Module {
  id: string;
  title: string;
  description: string;
  type: ModuleType;
  order: number;
  createdAt: string;
  updatedAt: string;
  tasks?: Task[];
}

export interface Task {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  type: TaskType;
  instructions: string;
  config: any;
  order: number;
  createdAt: string;
  updatedAt: string;
  module?: {
    id: string;
    title: string;
    type: ModuleType;
  };
}

export interface Attempt {
  id: string;
  userId: string;
  taskId: string;
  startTime: string;
  endTime: string;
  response: any;
  score: number;
  accuracy: number | null;
  reactionTime: number | null;
  metadata: any;
  createdAt: string;
  task?: {
    id: string;
    title: string;
    type: TaskType;
  };
}

export interface Reflection {
  id: string;
  userId: string;
  content: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Progress {
  totalTasksCompleted: number;
  uniqueTasksCompleted: number;
  totalAttempts: number;
  averageAccuracy: number;
  averageScore: number;
  lastActivityDate: string | null;
  streak: number;
  moduleProgress: ModuleProgress[];
  recentActivity: RecentActivity[];
}

export interface ModuleProgress {
  moduleId: string;
  moduleTitle: string;
  moduleType: ModuleType;
  totalTasks: number;
  completedTasks: number;
  progressPercentage: number;
  averageAccuracy: number;
  averageScore: number;
  attemptsCount: number;
}

export interface RecentActivity {
  attemptId: string;
  taskId: string;
  taskTitle: string;
  taskType: TaskType;
  moduleTitle: string;
  moduleType: ModuleType;
  score: number;
  accuracy: number | null;
  reactionTime: number | null;
  completedAt: string;
}

export interface ApiResponse<T> {
  status: 'success' | 'error';
  data?: T;
  message?: string;
}

// Task Response Types
export interface DigitSpanResponse {
  trials: Array<{
    userInput: number[];
  }>;
}

export interface LexicalDecisionResponse {
  trials: Array<{
    response: boolean;
    reactionTime: number;
  }>;
}

export interface SentenceVerificationResponse {
  trials: Array<{
    response: boolean;
    reactionTime: number;
  }>;
}

export interface ErrorCorrectionResponse {
  corrections: Array<{
    original: string;
    corrected: string;
    explanation?: string;
  }>;
}

export interface ReflectionResponse {
  content: string;
  tags?: string[];
}
