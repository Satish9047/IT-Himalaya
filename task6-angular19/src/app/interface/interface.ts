export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface Task {
  id?: string;
  description: string;
  completed: boolean;
  createdAt: string;
  dueDate: string;
  completedAt: string;
  userId?: string;
}

export interface Tasks {
  tasks: Task[];
}

export interface Response {
  success: boolean;
  message: string;
}
