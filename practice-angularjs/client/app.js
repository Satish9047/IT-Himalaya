let app = angular.module("app", ["ui.router"]);

// Local Forage configuration
// app.config([
//   "$provide",
//   function ($provide) {
//     localforage.config({
//       name: "Profiler ",
//       storeName: "Users",
//       description: "Users IndexedDB Database",
//     });

//     $provide.factory("localforage", function () {
//       return localforage;
//     });
//   },
// ]);

//Router Configuration
app.config([
  "$stateProvider",
  "$urlRouterProvider",
  function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");

    $stateProvider.state("layout", {
      abstract: true,
      template: "<app-navbar></app-navbar>",
    });
    $stateProvider.state("dashboard", {
      parent: "layout",
      url: "/",
      template: "<app-dashboard></app-dashboard>",
    });
    $stateProvider.state("register", {
      parent: "layout",
      url: "/register",
      template: "<app-register></app-register>",
    });
    $stateProvider.state("login", {
      parent: "layout",
      url: "/login",
      template: "<app-login></app-login>",
    });
  },
]);
