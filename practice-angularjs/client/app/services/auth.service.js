app.service("authService", [
  function () {
    this.user = [];

    //Register User
    this.registerUser = (user) => {
      //setup localforage instance
      const storeName = user.email.replace("@", "").replace(".", "");
      const storeInstance = localforage.createInstance({
        name: `Users`,
        storeName,
        description: `Data for ${user.email}`,
      });

      // Store user data in Users store
      return storeInstance
        .setItem("userDetails", user)
        .then(() => {
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
      //setup localforage instance
      const storeName = user.email.replace("@", "").replace(".", "");
      const storeInstance = localforage.createInstance({
        name: `Users`,
        storeName,
        description: `Data for ${user.email}`,
      });

      // Retrieve user data from Users store
      return storeInstance.getItem("userDetails").then((storedUserData) => {
        if (storedUserData && storedUserData.password === user.password) {
          //Setting the user into the loggedUser store if the user in valid
          const storeInstance = localforage.createInstance({
            name: "loggedUser",
            storeName: "user",
            description: `Data for ${user.email}`,
          });

          //Setting the  user in loggedUser store
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
