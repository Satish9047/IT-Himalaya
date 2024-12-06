taskManager.controller("addTaskController", [
  "$scope",
  "taskService",
  "localForage",
  function ($scope, taskService) {
    const $AddCtrl = this;
    this.taskDescription = "";

    this.addTask = function () {
      console.log(this.taskDescription);

      const id = Date.now().toString();
      const description = this.taskDescription;
      const createdAt = getFormattedDate();
      const dueDate = getDueDate();

      const newTask = new Task(id, description, createdAt, dueDate);

      taskService.addTask(newTask);
    };
  },
]);
