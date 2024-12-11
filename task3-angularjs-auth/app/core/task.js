/**
 * desc   Class of Task
 * @param id
 * @param description
 * @param createdAt
 * @param dueDate
 * @param completed   optional
 * @param completedAt optional
 */
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

  toggleToCompletedTask() {
    this.completed = true;
    this.completedAt = getFormattedDate();
  }
}
