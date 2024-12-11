angular.module("addTaskModule", ["app"]).component("addTask", {
  templateUrl: "./app/components/addTask/addTask.template.html",
  controllerAs: "$AddCtrl",
  controller: [
    "taskService",
    "localforage",
    function (taskService) {
      this.taskDescription = "";

      this.addTask = () => {
        if (this.taskDescription.trim() !== "") {
          const id = Date.now().toString();
          const description = this.taskDescription;
          const createdAt = getFormattedDate();
          const dueDate = getDueDate();

          const newTask = new Task(id, description, createdAt, dueDate);

          taskService.addTask(newTask);
          this.taskDescription = "";
        }
      };
    },
  ],
});
