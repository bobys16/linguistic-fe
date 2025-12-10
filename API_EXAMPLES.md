# API Integration Examples

This document provides practical examples for integrating with the backend API.

## Authentication Examples

### Login Example
```typescript
import { authAPI } from '@/lib/apiClient';

const handleLogin = async (email: string, password: string) => {
  try {
    const response = await authAPI.login(email, password);
    // Token is automatically stored and attached to future requests
    console.log('User:', response.data.user);
    console.log('Token:', response.data.token);
  } catch (error) {
    console.error('Login failed:', error);
  }
};
```

### Register Example
```typescript
const handleRegister = async (name: string, email: string, password: string) => {
  try {
    const response = await authAPI.register(email, password, name);
    console.log('Registered user:', response.data.user);
  } catch (error) {
    console.error('Registration failed:', error);
  }
};
```

## Data Fetching with React Query

### Fetch Modules
```typescript
import { useModules } from '@/hooks/useModules';

function ModulesComponent() {
  const { data: modules, isLoading, error } = useModules();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>Error loading modules</div>;

  return (
    <div>
      {modules?.map(module => (
        <div key={module.id}>{module.title}</div>
      ))}
    </div>
  );
}
```

### Fetch Single Task
```typescript
import { useTask } from '@/hooks/useTasks';

function TaskComponent({ taskId }: { taskId: string }) {
  const { data: task, isLoading } = useTask(taskId);

  if (isLoading) return <LoadingSpinner />;
  if (!task) return <div>Task not found</div>;

  return <div>{task.title}</div>;
}
```

## Submitting Task Attempts

### Basic Attempt Submission
```typescript
import { useSubmitAttempt } from '@/hooks/useTasks';

function TaskRunner({ taskId }: { taskId: string }) {
  const submitAttempt = useSubmitAttempt();
  const [startTime] = useState(new Date().toISOString());

  const handleComplete = async (response: any) => {
    const endTime = new Date().toISOString();
    
    try {
      const attempt = await submitAttempt.mutateAsync({
        taskId,
        startTime,
        endTime,
        response,
      });
      
      console.log('Attempt result:', attempt);
      console.log('Score:', attempt.score);
      console.log('Accuracy:', attempt.accuracy);
    } catch (error) {
      console.error('Failed to submit attempt:', error);
    }
  };

  return <div>Task interface...</div>;
}
```

### Digit Span Response Format
```typescript
const digitSpanResponse = {
  trials: [
    { userInput: [3, 7, 2] },
    { userInput: [5, 9, 1, 4] },
    { userInput: [8, 2, 6, 3, 9] },
  ],
};
```

### Lexical Decision Response Format
```typescript
const lexicalDecisionResponse = {
  trials: [
    { response: true, reactionTime: 450 },
    { response: false, reactionTime: 520 },
    { response: true, reactionTime: 380 },
  ],
};
```

## Progress Tracking

### Get User Progress
```typescript
import { useProgress } from '@/hooks/useProgress';

function ProgressDashboard() {
  const { data: progress } = useProgress();

  return (
    <div>
      <p>Tasks Completed: {progress?.totalTasksCompleted}</p>
      <p>Average Accuracy: {progress?.averageAccuracy}%</p>
      <p>Current Streak: {progress?.streak} days</p>
      
      {progress?.moduleProgress.map(mp => (
        <div key={mp.moduleId}>
          <h3>{mp.moduleTitle}</h3>
          <p>Progress: {mp.progressPercentage}%</p>
        </div>
      ))}
    </div>
  );
}
```

## Reflections Management

### Create Reflection
```typescript
import { useCreateReflection } from '@/hooks/useReflections';

function ReflectionForm() {
  const createReflection = useCreateReflection();
  
  const handleSubmit = async (content: string, tags: string[]) => {
    try {
      const reflection = await createReflection.mutateAsync({
        content,
        tags,
      });
      console.log('Created reflection:', reflection);
    } catch (error) {
      console.error('Failed to create reflection:', error);
    }
  };

  return <form>...</form>;
}
```

### List Reflections
```typescript
import { useReflections } from '@/hooks/useReflections';

function ReflectionsList() {
  const { data } = useReflections(50, 0);

  return (
    <div>
      {data?.reflections.map(reflection => (
        <div key={reflection.id}>
          <p>{reflection.content}</p>
          <div>
            {reflection.tags.map(tag => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
```

## Error Handling

### Global Error Handler
```typescript
import { AxiosError } from 'axios';

const handleApiError = (error: unknown) => {
  if (error instanceof AxiosError) {
    const status = error.response?.status;
    const message = error.response?.data?.message;
    
    switch (status) {
      case 400:
        return 'Invalid request. Please check your input.';
      case 401:
        return 'Please login to continue.';
      case 404:
        return 'Resource not found.';
      case 500:
        return 'Server error. Please try again later.';
      default:
        return message || 'An error occurred.';
    }
  }
  return 'An unexpected error occurred.';
};
```

### Using Error Handler
```typescript
const MyComponent = () => {
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const data = await modulesAPI.getAll();
      console.log(data);
    } catch (err) {
      setError(handleApiError(err));
    }
  };

  return (
    <div>
      {error && <div className="error">{error}</div>}
    </div>
  );
};
```

## Advanced: Custom Hook Example

### Creating a Custom Hook
```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { attemptsAPI } from '@/lib/apiClient';

export const useTaskAttempts = (taskId: string) => {
  const queryClient = useQueryClient();

  const attempts = useQuery({
    queryKey: ['attempts', taskId],
    queryFn: async () => {
      const response = await attemptsAPI.getByTask(taskId);
      return response.data.attempts;
    },
    enabled: !!taskId,
  });

  const submitAttempt = useMutation({
    mutationFn: attemptsAPI.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attempts', taskId] });
      queryClient.invalidateQueries({ queryKey: ['progress'] });
    },
  });

  return {
    attempts: attempts.data,
    isLoading: attempts.isLoading,
    error: attempts.error,
    submitAttempt: submitAttempt.mutate,
    isSubmitting: submitAttempt.isPending,
  };
};
```

## TypeScript Types Usage

### Strongly Typed Component
```typescript
import { Task, TaskType } from '@/lib/types';

interface TaskCardProps {
  task: Task;
  onStart: (taskId: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onStart }) => {
  const getTaskTypeLabel = (type: TaskType): string => {
    const labels: Record<TaskType, string> = {
      WORKING_MEMORY_SPAN: 'Working Memory',
      PROCESSING_SPEED_LEXICAL_DECISION: 'Lexical Decision',
      PROCESSING_SPEED_SENTENCE_VERIFICATION: 'Sentence Verification',
      NOTICING_ERROR_CORRECTION: 'Error Correction',
      REFLECTION_PROMPT: 'Reflection',
      // ... other task types
    };
    return labels[type] || type;
  };

  return (
    <div>
      <h3>{task.title}</h3>
      <p>{getTaskTypeLabel(task.type)}</p>
      <button onClick={() => onStart(task.id)}>Start</button>
    </div>
  );
};
```

---

For more examples, check the actual implementation in the `hooks/` and `components/` directories.
