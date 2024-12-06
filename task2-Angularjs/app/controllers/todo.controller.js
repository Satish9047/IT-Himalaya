taskManager.controller("todoTaskController", [
  "$scope",
  "taskService",
  function ($scope, taskService) {
    const $TodoCtrl = this;
    $TodoCtrl.taskList = [];

    // Get tasks from the service
    $TodoCtrl.taskList = taskService.getTasks();
    console.log($TodoCtrl.taskList);

    $TodoCtrl.deleteTask = function (taskId) {
      taskService.deleteTask(taskId);
    };

    $TodoCtrl.sendTaskToCompleted = function (taskId) {
      taskService.sendToCompleted(taskId);
    };
  },
]);
