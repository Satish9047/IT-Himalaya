import { getFormattedDate } from '../utils/date';

export class Task {
  id?: string;
  description: string;
  createdAt: string;
  dueDate: string;
  completed: boolean;
  completedAt: string | null;
  userId: string;

  constructor(
    userId: string,
    description: string,
    createdAt: string,
    dueDate: string,
    completed = false,
    completedAt: string | null = null,
    id: string | undefined = undefined,
  ) {
    this.userId = userId;
    this.description = description;
    this.completed = completed;
    this.dueDate = dueDate;
    this.createdAt = createdAt;
    this.completedAt = completedAt;
    this.id = id;
  }

  MarkTaskToCompleted() {
    this.completed = true;
    this.completedAt = getFormattedDate();
  }
}
