taskManager.controller("todoTaskController", [
  "$scope",
  "taskService",
  "localforage",
  function ($scope, taskService, localforage) {
    const $TodoCtrl = this;
    $TodoCtrl.taskList = [];

    // Get tasks from the service
    $TodoCtrl.taskList = taskService.getTasks();
    console.log("todo", $TodoCtrl.taskList);

    $TodoCtrl.deleteTask = function (taskId) {
      taskService.deleteTask(taskId);
      $TodoCtrl.taskList = taskService.getTasks();
    };

    $TodoCtrl.sendTaskToCompleted = function (taskId) {
      taskService.sendToCompleted(taskId);
      $TodoCtrl.taskList = taskService.getTasks();
    };
  },
]);
