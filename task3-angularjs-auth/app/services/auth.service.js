app.service("authService", [
  function () {
    //Register User
    this.registerUser = (user) => {
      //setup localforage instance
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
      //setup localforage instance
      const storeInstance = getStoreInstance(user);

      // Retrieve user data from Users store
      return storeInstance.getItem("userDetails").then((storedUserData) => {
        if (storedUserData && storedUserData.password === user.password) {
          //Setting the user into the loggedUser store if the user in valid
          const storeInstance = getLoggedUserStoreInstance();

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

    //experiment

    // this.loginUser = (user) => {
    //   //setup localforage instance
    //   const storeInstance = getStoreInstance(user);

    //   // Retrieve user data from Users store
    //   return storeInstance.getItem("userDetails").then((storedUserData) => {
    //     if (storedUserData && storedUserData.password === user.password) {
    //       //Setting the user into the loggedUser store if the user in valid
    //       storedUserData.isLoggedIn = true;

    //       //Setting the  user in loggedUser store
    //       storeInstance
    //         .setItem("userDetails", storedUserData)
    //         .then(() => {
    //           console.log(
    //             `User ${storedUserData.email} data stored successfully in loggedUser.`
    //           );
    //           return true;
    //         })
    //         .catch((err) => {
    //           console.error(
    //             `Error storing user data for ${storedUserData.email}:`,
    //             err
    //           );
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
