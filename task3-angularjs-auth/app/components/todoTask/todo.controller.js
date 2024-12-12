angular.module("todoTaskModule", ["app"]).component("todoTask", {
  templateUrl: "./app/components/todoTask/todo.template.html",
  controllerAs: "$TodoCtrl",
  controller: [
    "$scope",
    "taskService",
    function ($scope, taskService) {
      this.taskList = [];

      taskService.loadTask().then((tasks) => {
        this.taskList = tasks;
        $scope.$apply();
      });

      $scope.$on("task:updated", (event, tasks) => {
        this.taskList = tasks;
        // $scope.$apply();
      });

      // Get tasks from the service
      this.taskList = taskService.getTasks();

      this.deleteTask = (taskId) => {
        taskService.deleteTask(taskId);
        this.taskList = taskService.getTasks();
      };

      this.sendTaskToCompleted = (taskId) => {
        taskService.sendToCompleted(taskId);
        this.taskList = taskService.getTasks();
      };
    },
  ],
});
