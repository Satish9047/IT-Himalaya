let taskManager = angular.module("taskManager", []);

// Configuring localForage for the angular app
taskManager.config([
  "$provide",
  function ($provide) {
    localforage.config({
      name: "TaskManager",
      storeName: "tasks",
      description: "Task Manager using Angular JS",
    });

    $provide.factory("localForage", function () {
      return localforage;
    });
  },
]);

taskManager.component("addTask", {
  templateUrl: "./app/components/addTask.component.html",
  controller: "addTaskController",
  controllerAs: "$AddCtrl",
});

taskManager.component("todoTask", {
  templateUrl: "./app/components/todo.component.html",
  controller: "todoTaskController",
  controllerAs: "$TodoCtrl",
});

taskManager.component("completedTask", {
  templateUrl: "./app/components/completed.component.html",
  controller: "completedTaskController",
  controllerAs: "$CompletedCtrl",
});
