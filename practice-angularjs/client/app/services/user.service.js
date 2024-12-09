app.service("userService", [
  "localForage",
  function (localforage) {
    this.user = [
      {
        fname: "admin",
        lname: "admin",
        email: "admin@gmail.com",
        password: "admin123",
      },
    ];

    this.getUser = () => {
      return this.user.map((user) => {
        const storedName = user.email.replace("@", "").replace(".", "");
        const storeInstance = localforage.createInstance({
          name: `User_${storedName}`,
          storeName: storedName,
          description: `Data for ${user.email}`,
        });

        return storeInstance.getItem(user.email).then((storedUserData) => {
          if (storedUserData) {
            return { ...storedUserData, password: undefined };
          }
          return null;
        });
      });

      // return this.user.map((user) => {
      //   delete user.password;
      // });
    };
  },
]);
