class Task {
  constructor(
    id,
    description,
    createdAt,
    dueDate,
    completed = false,
    completedAt = null
  ) {
    this.id = id;
    this.description = description;
    this.createdAt = createdAt;
    this.dueDate = dueDate;
    this.completed = completed;
    this.completedAt = completedAt;
  }

  toggleComplete() {
    this.completed = true;
    this.completedAt = getFormattedDate();
  }
}
