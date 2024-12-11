app.service("authService", [
  function () {
    //Register User
    this.registerUser = (user) => {
      const storeInstance = getStoreInstance(user);

      // Store user data in Users store
      return storeInstance
        .setItem("userDetails", user)
        .then((resData) => {
          console.log(resData);
          console.log(`User ${user.email} data stored successfully.`);
          return true;
        })
        .catch((err) => {
          console.error(`Error storing user data for ${user.email}:`, err);
          return false;
        });
    };

    //Login User
    this.loginUser = (user) => {
      const storeInstance = getStoreInstance(user);
      return storeInstance.getItem("userDetails").then((storedUserData) => {
        if (storedUserData && storedUserData.password === user.password) {
          const storeInstance = getLoggedUserStoreInstance();

          storeInstance
            .setItem("loggedUser", storedUserData)
            .then(() => {
              console.log(
                `User ${user.email} data stored successfully in loggedUser.`
              );
              return true;
            })
            .catch((err) => {
              console.error(`Error storing user data for ${user.email}:`, err);
              return false;
            });

          return { storeInstance: storeInstance, user: storedUserData };
        } else {
          console.log("log fail");
          return false;
        }
      });
    };
  },
]);
