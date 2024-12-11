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
        const storeInstance = getLoggedUserStoreInstance();

        //return the data from loggedUser store
        return storeInstance.getItem("loggedUser").then((storedUserData) => {
          if (storedUserData) {
            return { ...storedUserData, password: undefined };
          }
          return null;
        });
      }
    };

    this.logout = () => {
      this.user = {};
      const storeInstance = getLoggedUserStoreInstance();

      storeInstance.removeItem("loggedUser");
      $rootScope.$broadcast("user:updated", this.user);
    };

    this.setUser = (user) => {
      this.user = user;
      $rootScope.$broadcast("user:updated", this.user); // broadcast the user data so that the component can rerender itself
      console.log("after set", this.user);
    };
  },
]);
