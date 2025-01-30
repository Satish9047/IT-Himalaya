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

    $provide.factory("localforage", function () {
      return localforage;
    });
  },
]);

taskManager.run(function () {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) =>
        console.log("service worker registered", registration)
      )
      .catch((error) => console.log("Service worker register failed", error));
  }
});

taskManager.component("addTask", {
  templateUrl: "./app/components/addTask/addTask.template.html",
  controller: "addTaskController",
  controllerAs: "$AddCtrl",
});

taskManager.component("todoTask", {
  templateUrl: "./app/components/todoTask/todo.template.html",
  controller: "todoTaskController",
  controllerAs: "$TodoCtrl",
});

taskManager.component("completedTask", {
  templateUrl: "./app/components/completedTask/completed.template.html",
  controller: "completedTaskController",
  controllerAs: "$CompletedCtrl",
});

taskManager.component("appFooter", {
  templateUrl: "./app/components/footer/footer.template.html",
  controller: "footerDateController",
  controllerAs: "$DateCtrl",
});
