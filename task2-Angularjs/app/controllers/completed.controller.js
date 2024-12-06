taskManager.controller("completedTaskController", [
  "$scope",
  "taskService",
  function ($scope, taskService) {
    const $CompletedCtrl = this;
    $CompletedCtrl.completedTaskList = [];

    $CompletedCtrl.completedTaskList = taskService.getTasks();
    console.log($CompletedCtrl.taskList);

    $CompletedCtrl.deleteTask = function (taskId) {
      taskService.deleteTask(taskId);
      $CompletedCtrl.completedTaskList = taskService.getTasks();
    };
  },
]);
