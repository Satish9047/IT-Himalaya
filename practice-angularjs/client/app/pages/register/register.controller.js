angular.module("registerModule", []);

app.component("appRegister", {
  templateUrl: "./app/pages/register/register.template.html",
  controllerAs: "$RegisterCtrl",
  controller: [
    "$state",
    "authService",
    function ($state, authService) {
      this.user = {};

      this.onRegister = (event) => {
        event.preventDefault();
        // debugger;
        console.log(this.user);
        const res = authService.registerUser(this.user);
        if (res) {
          $state.go("login");
        } else {
          console.log("error");
        }
      };
    },
  ],
});
