app.service("userService", [
  "$rootScope",
  "$injector",
  "storageService",
  function ($rootScope, $injector, storageService) {
    this.user = {};

    // Get User
    this.getUser = () => {
      if (this.user && this.user.email) {
        return Promise.resolve(this.user);
      } else {
        return storageService
          .getUser()
          .then((resData) => {
            this.user = resData;
            return this.user;
          })
          .catch((error) => {
            console.log("error while getting user", error);
            return null;
          });
      }
    };

    // Logout User
    this.logout = () => {
      this.user = {};
      const taskService = $injector.get("taskService");
      taskService.clearTasks();
      const storeInstance = getLoggedUserStoreInstance();
      storeInstance.removeItem("loggedUser");
      $rootScope.$broadcast("user:updated", this.user);
    };

    //Set User
    this.setUser = (user) => {
      this.user = user;
      $rootScope.$broadcast("user:updated", this.user); // broadcast the user data so that the component can rerender itself
    };
  },
]);
