let app = angular.module("app", ["ui.router", "oc.lazyLoad"]);

// Local Forage configuration
app.config([
  "$provide",
  function ($provide) {
    $provide.factory("localforage", function () {
      return localforage;
    });
  },
]);

app.run([
  "storageService",
  function (storageService) {
    // Initialize the database when the app starts

    storageService
      .initialize()
      .then(function () {
        console.log("Database (or LocalForage) initialized successfully.");
      })
      .catch(function (error) {
        console.error("Error:", error);
      });
  },
]);

app.run([
  "$state",
  "userService",
  function run($state, userService) {
    // Check if user is logged in
    userService.getUser().then((user) => {
      if (user) {
        $state.go("dashboard");
      } else {
        $state.go("login");
      }
    });
  },
]);

//Router Configuration
app.config([
  "$stateProvider",
  "$urlRouterProvider",
  function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");

    $stateProvider.state("dashboard", {
      url: "/dashboard",
      template: "<app-dashboard></app-dashboard>",
      resolve: {
        loadDashboardModule: [
          "$ocLazyLoad",
          function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: "dashboardModule",
              files: [
                "./app/components/dashboard/dashboard.controller.js",
                "./app/components/addTask/addTask.controller.js",
                "./app/components/completedTask/completed.controller.js",
                "./app/components/todoTask/todo.controller.js",
                "./app/services/user.service.js",
                "./app/services/tasks.service.js",
                "./app/utils/date.utils.js",
                "./app/core/task.js",
              ],
            });
          },
        ],
      },
    });

    $stateProvider.state("register", {
      url: "/register",
      template: "<app-register></app-register>",
      resolve: {
        loadRegisterModule: [
          "$ocLazyLoad",
          function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: "registerModule",
              files: [
                "./app/components/register/register.controller.js",
                "./app/services/auth.service.js",
                "./app/utils/date.utils.js",
              ],
            });
          },
        ],
      },
    });

    $stateProvider.state("login", {
      url: "/login",
      template: "<app-login></app-login>",
      resolve: {
        loadLoginModule: [
          "$ocLazyLoad",
          function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: "loginModule",
              files: [
                "./app/components/login/login.controller.js",
                "./app/services/auth.service.js",
                "./app/services/user.service.js",
              ],
            });
          },
        ],
      },
    });
  },
]);
