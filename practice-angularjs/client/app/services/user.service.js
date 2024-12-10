app.service("userService", [
  "localForage",
  function (localforage) {
    this.user = {};

    this.getUser = () => {
      if (this.user.email) {
        return this.user;
      }

      const storedName = user.email.replace("@", "").replace(".", "");
      const storeInstance = localforage.createInstance({
        name: `loggedUser`,
        storeName: storedName,
        description: `Data for ${user.email}`,
      });

      return storeInstance.getItem(user.email).then((storedUserData) => {
        if (storedUserData) {
          return { ...storedUserData, password: undefined };
        }
        return null;
      });
    };

    this.setUser = (user) => {
      this.user = user;
    };
  },
]);
