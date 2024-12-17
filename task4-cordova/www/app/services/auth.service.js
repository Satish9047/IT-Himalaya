app.service("authService", [
  "storageService",
  function (storageService) {
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
          return true;
        })
        .catch((error) => {
          console.error("Error logging in user:", error);
          return false;
        });
    };

    // this.loginUser = (user) => {
    //   const storeInstance = getStoreInstance(user);
    //   return storeInstance.getItem("userDetails").then((storedUserData) => {
    //     if (storedUserData && storedUserData.password === user.password) {
    //       const storeInstance = getLoggedUserStoreInstance();

    //       storeInstance
    //         .setItem("loggedUser", storedUserData)
    //         .then(() => {
    //           console.log(
    //             `User ${user.email} data stored successfully in loggedUser.`
    //           );
    //           return true;
    //         })
    //         .catch((err) => {
    //           console.error(`Error storing user data for ${user.email}:`, err);
    //           return false;
    //         });

    //       return { storeInstance: storeInstance, user: storedUserData };
    //     } else {
    //       console.log("log fail");
    //       return false;
    //     }
    //   });
    // };
  },
]);
