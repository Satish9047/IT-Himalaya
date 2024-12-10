angular.module("loginModule", []).component("appLogin", {
  templateUrl: "./app/pages/login/login.template.html",
  controllerAs: "$LoginCtrl",
  controller: [
    "$state",
    "authService",
    "userService",
    function ($state, authService, userService) {
      this.user = {};

      this.onLogin = async (event) => {
        event.preventDefault();

        authService.loginUser(this.user).then((res) => {
          if (res) {
            userService.setUser(res.user);
            $state.go("dashboard");
          } else {
            alert("Invalid credentials");
          }
        });
      };
    },
  ],
});
