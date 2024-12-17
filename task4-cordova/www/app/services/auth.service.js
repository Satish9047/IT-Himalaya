app.service("authService", [
  "storageService",
  function (storageService) {
    //register user
    this.registerUser = (user) => {
      return storageService
        .registerNewUser(user)
        .then((resData) => {
          console.log("User registered successfully:", resData);
          return true;
        })
        .catch((error) => {
          console.error("Error registering user:", error);
          return false;
        });
    };

    //Login User
    this.loginUser = (user) => {
      return storageService
        .loginUser(user)
        .then((resData) => {
          console.log("User logged in successfully:", resData);
          return resData;
        })
        .catch((error) => {
          console.error("Error logging in user:", error);
          return false;
        });
    };
  },
]);
