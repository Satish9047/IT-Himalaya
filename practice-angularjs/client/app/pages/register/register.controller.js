app.component("appRegister", {
  templateUrl: "./app/pages/register/register.template.html",
  controllerAs: "$RegisterCtrl",
  controller: [
    "$scope",
    function ($scope) {
      const $RegisterCtrl = this;
      $RegisterCtrl.message = "Welcome to Register";
      console.log("This is register page");
    },
  ],
});
