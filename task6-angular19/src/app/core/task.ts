import { getFormattedDate, getDueDate } from '../utils/date';

export class Task {
  id: string;
  description: string;
  createdAt: string;
  dueDate: string;
  completed: boolean;
  completedAt: string | null;
  userId?: string;

  constructor(
    id: string,
    description: string,
    createdAt: string,
    dueDate: string,
    completed = false,
    completedAt: string | null = null,
  ) {
    this.id = id;
    this.description = description;
    this.completed = completed;
    this.dueDate = dueDate;
    this.createdAt = createdAt;
    this.completedAt = completedAt;
  }

  MarkTaskToCompleted() {
    this.completed = true;
    this.completedAt = getFormattedDate();
  }
}
