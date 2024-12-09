app.component("appNavbar", {
  templateUrl: "./app/shared/navbar/navbar.template.html",
  controllerAs: "$Ctrl",
  controller: [
    "$scope",
    function ($scope) {
      const $Ctrl = this;
      $Ctrl.message = "navbar works";

      console.log("navbar works");
    },
  ],
});
