let app = angular.module("app", ["ui.router", "oc.lazyLoad"]);

// Local Forage configuration
app.config([
  "$provide",
  function ($provide) {
    localforage.config({
      name: "Profiler ",
      storeName: "Users",
      description: "Users IndexedDB Database",
    });

    $provide.factory("localforage", function () {
      return localforage;
    });
  },
]);

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
      resolve: {
        loadDashboardModule: [
          "$ocLazyLoad",
          function ($ocLazyLoad) {
            return $ocLazyLoad.load(
              "./app/pages/dashboard/dashboard.controller.js"
            );
          },
        ],
      },
    });
    $stateProvider.state("register", {
      parent: "layout",
      url: "/register",
      template: "<app-register></app-register>",
      resolve: {
        loadDashboardModule: [
          "$ocLazyLoad",
          function ($ocLazyLoad) {
            return $ocLazyLoad.load(
              "./app/pages/register/register.controller.js"
            );
          },
        ],
      },
    });
    $stateProvider.state("login", {
      parent: "layout",
      url: "/login",
      template: "<app-login></app-login>",
      resolve: {
        loadDashboardModule: [
          "$ocLazyLoad",
          function ($ocLazyLoad) {
            return $ocLazyLoad.load("./app/pages/login/login.controller.js");
          },
        ],
      },
    });
  },
]);
