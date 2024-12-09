angular.module("dashboardModule", []);
app.component("appDashboard", {
  templateUrl: "./app/pages/dashboard/dashboard.template.html",
  controllerAs: "$DashboardCtrl",
  controller: [
    "userService",
    function (userService) {
      this.isLoggedIn = false;
      this.user = {};

      this.user = userService.getUser();
    },
  ],
});
