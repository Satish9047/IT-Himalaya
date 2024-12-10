app.service("authService", [
  function () {
    this.user = [];

    this.registerUser = (user) => {
      const storeName = user.email.replace("@", "").replace(".", "");
      const storeInstance = localforage.createInstance({
        name: `Users`,
        storeName,
        description: `Data for ${user.email}`,
      });

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

    this.loginUser = (user) => {
      const storeName = user.email.replace("@", "").replace(".", "");
      const storeInstance = localforage.createInstance({
        name: `Users`,
        storeName,
        description: `Data for ${user.email}`,
      });

      return storeInstance.getItem("userDetails").then((storedUserData) => {
        if (storedUserData && storedUserData.password === user.password) {
          // console.log("log success");
          const storeInstance = localforage.createInstance({
            name: "loggedUser",
            storeName: "user",
            description: `Data for ${user.email}`,
          });

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
