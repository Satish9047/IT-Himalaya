taskManager.service("taskService", [
  "localforage",
  function (localforage) {
    const tasks = [];
    // debugger;
    function loadTasks() {
      getTasksFromLocalForage(localforage).then((taskData) => {
        console.log("taskData", taskData);
        if (taskData.length > 0) {
          taskData.forEach((task) => {
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
          // console.log("tasks", tasks);
        }
      });
    }

    loadTasks();

    this.getTasks = function () {
      return tasks;
    };

    this.addTask = function (newTask) {
      tasks.push(newTask);
      setTaskToLocalForage(tasks, localforage);
    };

    this.deleteTask = function (taskId) {
      const taskIndex = tasks.findIndex((task) => task.id == taskId);
      tasks.splice(taskIndex, 1);
      setTaskToLocalForage(tasks, localforage);
    };

    this.sendToCompleted = function (taskId) {
      const task = tasks.find((task) => task.id === taskId);
      task.toggleToCompletedTask();
      setTaskToLocalForage(tasks, localforage);
    };
  },
]);
