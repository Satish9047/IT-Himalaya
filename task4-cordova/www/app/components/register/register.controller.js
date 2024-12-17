angular.module("registerModule", []).component("appRegister", {
  templateUrl: "./app/components/register/register.template.html",
  controllerAs: "$RegisterCtrl",
  controller: [
    "$state",
    "authService",
    function ($state, authService) {
      this.user = {};

      this.onRegister = async (event) => {
        event.preventDefault();
        const res = await authService.registerUser(this.user);
        if (res) {
          $state.go("login");
        } else {
          console.log("something went wrong");
        }
      };
    },
  ],
});
