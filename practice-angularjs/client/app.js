let app = angular.module("app", []);

//Router Configuration
app.config([
  $routerProvider,
  function config($routerProvider) {
    $routerProvider
      .when("/", {
        template: "<dashboard></dashboard>",
      })
      .when("/login", {
        template: "<login></login>",
      })
      .when("/register", {
        template: "<register></register>",
      })
      .otherwise({
        redirectTo: "/",
      });
  },
]);

// Components
app.component("register", {
  templateUrl: "/app/pages/register/register.template.html",
  controller: "registerController",
  controllerAs: "registerCtrl",
});

app.component("login", {
  templateUrl: "/app/pages/login/login.template.html",
  controller: "loginController",
  controllerAs: "loginCtrl",
});

app.component("dashboard", {
  templateUrl: "/app/pages/dashboard/dashboard.template.html",
  controller: "registerController",
  controllerAs: "dashboardCtrl",
});
