angular.module("loginModule", []);
app.component("appLogin", {
  templateUrl: "./app/pages/login/login.template.html",
  controllerAs: "$LoginCtrl",
  controller: [
    "$state",
    "authService",
    function ($state, authService) {
      this.user = {};

      this.onLogin = (event) => {
        event.preventDefault();
        const res = authService.loginUser(this.user);
        if (res) {
          $state.go("dashboard");
        } else {
          alert("Invalid credentials");
        }
      };
    },
  ],
});
