taskManager.service("taskService", [
  "localForage",
  function (localForage) {
    const tasks = [];

    function loadTasks() {
      getTasksFromLocalForage(localForage).then((tasks) => {
        if (tasks.length > 0) {
          tasks.forEach((task) => {
            const loadTask = new Task(
              task.id,
              task.description,
              task.createdAt,
              task.dueDate,
              task.completed || false,
              task.completedAt || null
            );
            tasks.push(loadTask);
          });
        }
      });
    }

    loadTasks();

    this.getTasks = function () {
      return tasks;
    };

    this.addTask = function (newTask) {
      tasks.push(newTask);
      setTaskToLocalForage(tasks, localForage);
    };

    this.deleteTask = function (taskId) {
      const taskIndex = tasks.findIndex((task) => task.id == taskId);
      tasks.splice(taskIndex, 1);
      setTaskToLocalForage(tasks, localForage);
    };

    this.sendToCompleted = function (taskId) {
      const task = tasks.find((task) => task.id === taskId);
      task.toggleToCompletedTask();
      setTaskToLocalForage(tasks, localForage);
    };
  },
]);
