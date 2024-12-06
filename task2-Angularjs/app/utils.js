// Get Formatted Date
function getFormattedDate() {
  const now = new Date();
  return formatDate(now);
}

// Get Due Date
function getDueDate() {
  const now = new Date();
  now.setDate(now.getDate() + 1);
  return formatDate(now);
}

// Format Date
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1);
  const day = String(date.getDate());
  const hours = String(date.getHours());
  const minutes = String(date.getMinutes());
  const seconds = String(date.getSeconds());

  return `${year}/${month}/${day}-${hours}:${minutes}:${seconds}`;
}

/**
 * @desc   Set the tasks Array into LocalForage
 * @param  Array of tasks
 */
function setTaskToLocalForage(tasks, localForage) {
  const saveTasksToLocalForage = tasks.map((task) => ({
    id: task.id,
    description: task.description,
    createdAt: task.createdAt,
    dueDate: task.dueDate,
    completed: task.completed,
    completedAt: task.completedAt || null,
  }));

  localForage
    .setItem("tasks", saveTasksToLocalForage)
    .then(() => {
      console.log("Tasks saved in localforage:", tasks);
    })
    .catch((error) => {
      console.error("Error saving tasks in localforage", error);
    });
}

/**
 * @desc    Get tasks from localForage
 * @returns Array[Task] || []
 */
function getTasksFromLocalForage(localForage) {
  return localForage
    .getItem("tasks")
    .then((tasks) => {
      if (!tasks) {
        return [];
      } else {
        return tasks;
      }
    })
    .catch((error) => {
      console.error("Error getting tasks from localforage", error);
      return [];
    });
}
