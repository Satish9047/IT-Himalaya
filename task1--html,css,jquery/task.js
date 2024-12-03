class Task {
  constructor(id, description, createdAt, dueDate) {
    this.id = id;
    this.description = description;
    this.createdAt = createdAt;
    this.completed = false;
    this.dueDate = dueDate;
    this.completedAt = null;
  }

  toggleCompleted() {
    this.completed = true;
    this.completedAt = getFormattedDate();
  }
}
