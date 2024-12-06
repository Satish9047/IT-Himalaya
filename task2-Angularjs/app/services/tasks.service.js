taskManager.service("taskService", [
  "localForage",
  function (localForage) {
    const tasks = [
      {
        id: 1,
        description: "Task 1",
        createdAt: "2023-08-01",
        dueDate: "2023-08-05",
        completed: false,
        completedAt: null,
      },
    ];

    function loadTasks() {
      getTasksFromLocalForage().then((tasks) => {
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
            this.tasks.push(loadTask);
          });
        }
      });
    }

    loadTasks();

    this.getTasks = function () {
      console.log("Tasks get:", tasks);

      return tasks;
    };

    this.addTask = function (newTask) {
      tasks.push(newTask);
      setTaskToLocalForage(tasks, localForage);
      console.log("Tasks add:", tasks);
    };

    this.deleteTask = function (taskId) {
      const taskIndex = tasks.findIndex((task) => task.id == taskId);
      tasks.splice(taskIndex, 1);
      setTaskToLocalForage(tasks, localForage);
    };

    this.sendToCompleted = function (taskId) {
      const task = tasks.find((task) => task.id === taskId);
      task.toggleToCompletedTask(task);
      setTaskToLocalForage(tasks, localForage);
    };
  },
]);
