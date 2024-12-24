import { getFormattedDate, getDueDate } from '../utils/date';

export class Task {
  id: string;
  description: string;
  completed: boolean;
  createdAt: string;
  dueDate: string;
  completedAt: string | null;
  userId?: string;

  constructor(id: string, description: string) {
    this.id = id;
    this.description = description;
    this.completed = false;
    this.dueDate = getDueDate();
    this.createdAt = getFormattedDate();
    this.completedAt = null;
  }

  MaskTaskToComplete() {
    this.completed = true;
    this.completedAt = getFormattedDate();
  }
}
