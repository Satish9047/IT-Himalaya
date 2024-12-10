app.service("userService", [
  "localforage",
  "$rootScope",
  function (localforage, $rootScope) {
    this.user = {};

    this.getUser = () => {
      if (this.user.email) {
        // console.log("initial", this.user);
        return Promise.resolve(this.user);
      } else {
        const storeInstance = localforage.createInstance({
          name: `loggedUser`,
          storeName: "user",
          description: `Data for logged user`,
        });

        return storeInstance.getItem("loggedUser").then((storedUserData) => {
          if (storedUserData) {
            // console.log("after refreshed", storedUserData);
            return { ...storedUserData, password: undefined };
          }
          return null;
        });
      }
    };

    this.setUser = (user) => {
      this.user = user;
      $rootScope.$broadcast("user:updated", this.user);
      console.log("after set", this.user);
    };
  },
]);
