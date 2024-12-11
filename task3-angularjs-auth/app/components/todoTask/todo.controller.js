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
        // console.log("todo", $TodoCtrl.taskList);
        $scope.$apply();
      });

      // Get tasks from the service
      this.taskList = taskService.getTasks();
      console.log("todo--", this.taskList);
      //   console.log("todo", $TodoCtrl.taskList);

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
