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
            return $ocLazyLoad.load({
              name: "dashboardModule",
              files: [
                "./app/pages/dashboard/dashboard.controller.js",
                "./app/services/user.service.js",
                "./app/utils/helper.js",
              ],
            });
          },
        ],
      },
    });
    $stateProvider.state("register", {
      parent: "layout",
      url: "/register",
      template: "<app-register></app-register>",
      resolve: {
        loadRegisterModule: [
          "$ocLazyLoad",
          function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: "registerModule",
              files: [
                "./app/pages/register/register.controller.js",
                "./app/services/auth.service.js",
                "./app/utils/helper.js",
              ],
            });
          },
        ],
      },
    });
    $stateProvider.state("login", {
      parent: "layout",
      url: "/login",
      template: "<app-login></app-login>",
      resolve: {
        loadLoginModule: [
          "$ocLazyLoad",
          function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: "loginModule",
              files: [
                "./app/pages/login/login.controller.js",
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
