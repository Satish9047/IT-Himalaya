import { getFormattedDate, getDueDate } from '../utils/date';

export class Task {
  id?: string | number;
  description: string;
  createdAt: string;
  dueDate: string;
  completed: boolean;
  completedAt: string | null;
  userId: string | number;

  constructor(
    userId: string | number,
    description: string,
    createdAt: string,
    dueDate: string,
    completed = false,
    completedAt: string | null = null,
    id: string | number | undefined = undefined,
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
