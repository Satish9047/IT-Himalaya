app.component("appNavbar", {
  templateUrl: "./app/shared/navbar/navbar.template.html",
  controllerAs: "$Ctrl",
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
        } else {
          this.isLoggedIn = false;
          this.user = {};
          $state.go("login");
        }
      };

      userService.getUser().then((user) => {
        if (user) {
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

      //Logout User
      this.logout = () => {
        userService.logout();
        initializeData(null);
      };
    },
  ],
});
