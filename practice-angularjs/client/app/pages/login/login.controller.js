app.component("appLogin", {
  templateUrl: "./app/pages/login/login.template.html",
  controllerAs: "$LoginCtrl",
  controller: [
    "$scope",
    function ($scope) {
      const $LoginCtrl = this;
      $LoginCtrl.message = "Welcome to Login";

      console.log("This is login page");
    },
  ],
});
