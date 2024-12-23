import { get } from 'http';
import { getFormattedDate } from '../utils/date';

export class Task {
  id?: string;
  description: string;
  completed: boolean;
  createdAt: string;
  dueDate: string;
  completedAt: string;
  userId?: string;

  constructor(description: string, dueDate: string) {
    this.description = description;
    this.dueDate = dueDate;
    this.completed = false;
    this.createdAt = getFormattedDate();
    this.completedAt = '';
  }

  MaskTaskToComplete() {
    this.completed = true;
    this.completedAt = getFormattedDate();
  }
}
