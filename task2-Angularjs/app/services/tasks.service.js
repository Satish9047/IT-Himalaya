taskManager.service("taskService", function () {
  const tasks = [];

  this.getTasks = function () {
    return tasks;
  };

  this.addTask = function (newTask) {
    tasks.push(newTask);
  };

  this.deleteTask = function (taskId) {
    const taskIndex = tasks.findIndex((task) => task.id == taskId);
    tasks.splice(taskIndex, 1);
  };

  this.sendToCompleted = function (taskId) {
    const task = tasks.find((task) => task.id === taskId);
    task.toggleToCompletedTask();
  };
});
