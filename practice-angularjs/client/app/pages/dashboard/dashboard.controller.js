angular.module("dashboardModule", []);
app.component("appDashboard", {
  templateUrl: "./app/pages/dashboard/dashboard.template.html",
  controllerAs: "$DashboardCtrl",
  controller: [
    "$scope",
    "userService",
    function ($scope, userService) {
      this.isLoggedIn = false;
      this.user = {};

      userService.getUser().then((user) => {
        if (user) {
          this.user = user;
          this.isLoggedIn = true;
        }
        $scope.$apply();
      });
    },
  ],
});
