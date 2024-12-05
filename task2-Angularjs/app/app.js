let taskManager = angular.module("taskManager", []);

// Run before the app starts
taskManager.config(function () {});

taskManager.controller("TaskController", [
  "$scope",
  function ($scope) {
    $scope.tasks = [];

    $scope.addTask = function () {
      const id = Date.now().toString();
      const description = $scope.taskDescription;
      const createdAt = getFormattedDate();
      const dueDate = getDueDate();
      const newTask = new Task(id, description, createdAt, dueDate);

      $scope.tasks.push(newTask);

      $scope.taskDescription = "";
    };

    $scope.deleteTask = function (id) {
      console.log("delete task", id);
      const taskIndex = $scope.tasks.findIndex((task) => task.id === id);
      $scope.tasks.splice(taskIndex, 1);
    };

    $scope.sendTaskToCompleted = function (id) {
      const task = $scope.tasks.find((task) => task.id === id);
      task.toggleComplete();
    };
  },
]);
