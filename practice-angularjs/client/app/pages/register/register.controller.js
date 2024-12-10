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
        // console.log(this.user);
        authService
          .registerUser(this.user)
          .then((res) => {
            console.log(res);
            $state.go("login");
          })
          .catch((err) => {
            console.log(err);
          });
      };
    },
  ],
});
