app.component("completedTask", {
  templateUrl: "./app/components/completedTask/completed.template.html",
  controllerAs: "$CompletedCtrl",
  controller: [
    "taskService",
    function (taskService) {
      this.completedTaskList = [];

      taskService.loadTask().then((tasks) => {
        this.completedTaskList = tasks;
        console.log("completed", this.completedTaskList);
      });

      this.deleteTask = function (taskId) {
        taskService.deleteTask(taskId);
        this.completedTaskList = taskService.getTasks();
      };
    },
  ],
});