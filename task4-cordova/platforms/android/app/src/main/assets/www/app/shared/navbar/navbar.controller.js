app.component("appNavbar", {
  templateUrl: "./app/shared/navbar/navbar.template.html",
  controllerAs: "$Ctrl",
  controller: [
    "$scope",
    "$state",
    "userService",
    function ($scope, $state, userService) {
      this.isLoggedIn = false;
      this.user = null;

      const initializeData = (user) => {
        if (user) {
          this.user = user;
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
          this.user = null;
          $state.go("login");
        }
      };

      const getUser = async () => {
        const res = await userService.getUser();
        if (res) {
          initializeData(res);
        } else {
          initializeData(null);
        }
      };

      getUser();

      //Listen to user updated event
      $scope.$on("user:updated", (event, user) => {
        console.log("user updated in navbar", user);
        if (user.email) {
          initializeData(user);
        } else {
          initializeData(null);
        }
      });

      //Logout User
      this.logout = () => {
        console.log("logout 1");
        userService.logout();
        initializeData(null);
      };
    },
  ],
});
