angular.module("completedTaskModule", ["app"]).component("completedTask", {
  templateUrl: "./app/components/completedTask/completed.template.html",
  controllerAs: "$CompletedCtrl",
  controller: [
    "$scope",
    "taskService",
    function ($scope, taskService) {
      this.completedTaskList = [];

      taskService.loadTask().then((tasks) => {
        this.completedTaskList = tasks;
        $scope.$apply();
      });

      this.completedTaskList = taskService.getTasks();

      $scope.$on("task:updated", (event, tasks) => {
        console.log("updated");
        this.taskList = tasks;
        // $scope.$apply();
      });

      this.deleteTask = function (taskId) {
        taskService.deleteTask(taskId);
        this.completedTaskList = taskService.getTasks();
      };
    },
  ],
});
