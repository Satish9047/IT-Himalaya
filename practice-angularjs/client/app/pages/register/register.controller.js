app.component("appRegister", {
  templateUrl: "./app/pages/register/register.template.html",
  controllerAs: "$RegisterCtrl",
  controller: [
    function () {
      this.user = {};

      this.onRegister = (event) => {
        event.preventDefault();
        console.log(this.user);
      };
    },
  ],
});
