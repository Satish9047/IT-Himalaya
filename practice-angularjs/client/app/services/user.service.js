app.service("userService", [
  "localForage",
  function (localStorage) {
    this.isLoggedIn = function () {
      //   check if user is logged in
    };

    this.register = function (user) {
      //   register user functionality
    };

    this.login = function (user) {
      //login functionality
    };

    this.getUser = function () {
      //  get user functionality
    };

    this.logout = function () {
      //   logout functionality
    };
  },
]);
