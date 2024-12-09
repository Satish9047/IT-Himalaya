app.component("appNavbar", {
  templateUrl: "./app/shared/navbar/navbar.template.html",
  controllerAs: "$Ctrl",
  controller: [
    function (userService) {
      this.user = {};
      this.isLoggedIn = false;

      // this.user = userService.getUser();
    },
  ],
});
