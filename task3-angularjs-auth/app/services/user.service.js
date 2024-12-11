app.service("userService", [
  "$rootScope",
  function ($rootScope) {
    this.user = null;

    // Get User
    this.getUser = () => {
      if (this.user && this.user.email) {
        return Promise.resolve(this.user);
      } else {
        const storeInstance = getLoggedUserStoreInstance();
        return storeInstance.getItem("loggedUser").then((storedUserData) => {
          if (storedUserData) {
            this.user = { ...storedUserData, password: undefined };
            return this.user;
          }
          return null;
        });
      }
    };

    // Logout User
    this.logout = () => {
      this.user = null;
      const storeInstance = getLoggedUserStoreInstance();

      storeInstance.removeItem("loggedUser");
      $rootScope.$broadcast("user:updated", this.user);
    };

    //Set User
    this.setUser = (user) => {
      this.user = user;
      $rootScope.$broadcast("user:updated", this.user); // broadcast the user data so that the component can rerender itself
      console.log("after set", this.user);
    };
  },
]);
