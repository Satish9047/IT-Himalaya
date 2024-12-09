app.component("appLogin", {
  templateUrl: "./app/pages/login/login.template.html",
  controllerAs: "$LoginCtrl",
  controller: [
    function () {
      this.user = {};

      this.onLogin = (event) => {
        event.preventDefault();
        console.log(this.user);
      };

      console.log("This is login page");
    },
  ],
});
