app.service("userService", [
  "localforage",
  "$rootScope",
  function (localforage, $rootScope) {
    this.user = {};

    this.getUser = () => {
      // return this.user
      if (this.user.email) {
        return Promise.resolve(this.user);
      } else {
        // run when app is refreshed / for data persistence
        const storeInstance = localforage.createInstance({
          name: `loggedUser`,
          storeName: "user",
          description: `Data for logged user`,
        });

        //return the data from loggedUser store
        return storeInstance.getItem("loggedUser").then((storedUserData) => {
          if (storedUserData) {
            return { ...storedUserData, password: undefined };
          }
          return null;
        });
      }
    };

    this.setUser = (user) => {
      this.user = user;
      $rootScope.$broadcast("user:updated", this.user); // broadcast the user data so that the component can rerender itself
      console.log("after set", this.user);
    };
  },
]);
