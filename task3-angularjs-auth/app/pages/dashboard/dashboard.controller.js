angular.module("dashboardModule", []).component("appDashboard", {
  templateUrl: "./app/pages/dashboard/dashboard.template.html",
  controllerAs: "$DashboardCtrl",
  controller: [
    "$scope",
    "$state",
    "userService",
    function ($scope, $state, userService) {
      this.isLoggedIn = false;
      this.user = {};

      const initializeData = (user) => {
        if (user) {
          this.user = user;
          this.isLoggedIn = true;
          $scope.$apply();
        } else {
          this.isLoggedIn = false;
          this.user = {};
          $state.go("login");
        }
      };

      userService.getUser().then((user) => {
        if (user) {
          console.log(user);
          initializeData(user);
        } else {
          initializeData(null);
        }
      });

      //Listen to user updated event
      $scope.$on("user:updated", (event, user) => {
        if (user.email) {
          initializeData(user);
          $scope.$apply();
        } else {
          initializeData(null);
        }
      });
    },
  ],
});
