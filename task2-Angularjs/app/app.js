let taskManager = angular.module("taskManager", []);

//Configuring localForage for the angular app
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

taskManager.controller("TaskController", [
  "$scope",
  "localforage",
  function ($scope) {
    $scope.tasks = [];

    //To Load the saved tasks from localforage
    function loadTasks() {
      getTasksFromLocalForage().then((tasks) => {
        console.log("task from localforage", tasks);
        if (tasks.length > 0) {
          tasks.forEach((task) => {
            const loadTask = new Task(
              task.id,
              task.description,
              task.createdAt,
              task.dueDate,
              task.completed || false,
              task.completedAt || null
            );
            $scope.tasks.push(loadTask);
          });
        }
        $scope.$apply();
      });
    }
    loadTasks();

    //AddTask
    $scope.addTask = function () {
      const id = Date.now().toString();
      const description = $scope.taskDescription;
      const createdAt = getFormattedDate();
      const dueDate = getDueDate();
      const newTask = new Task(id, description, createdAt, dueDate);

      $scope.tasks.push(newTask);
      setTaskToLocalForage($scope.tasks);
      $scope.taskDescription = "";
    };

    //Delete the Task
    $scope.deleteTask = function (id) {
      console.log("delete task", id);
      const taskIndex = $scope.tasks.findIndex((task) => task.id === id);
      $scope.tasks.splice(taskIndex, 1);
      setTaskToLocalForage($scope.tasks);
    };

    //Change Task to complete
    $scope.sendTaskToCompleted = function (id) {
      const task = $scope.tasks.find((task) => task.id === id);
      task.toggleComplete();
      setTaskToLocalForage($scope.tasks);
    };
  },
]);
