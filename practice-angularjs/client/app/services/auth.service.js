app.service("authService", [
  function () {
    this.user = [
      {
        fname: "admin",
        lname: "admin",
        email: "admin@gmail.com",
        password: "admin123",
      },
    ];

    this.registerUser = (user) => {
      //   this.user.push(user);
      //   return true;
      //   const storeInstance = getStoreInstance(user);
      const storeName = user.email.replace("@", "").replace(".", "");
      const storeInstance = localforage.createInstance({
        name: `User_${storeName}`,
        storeName,
        description: `Data for ${user.email}`,
      });

      return storeInstance
        .setItem(userDetails, user)
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
      //   const userData = this.user.find(
      //     (u) => u.email === user.email && u.password === user.password
      //   );
      //   return userData ? true : false;
      const storeName = user.email.replace("@", "").replace(".", "");
      const storeInstance = localforage.createInstance({
        name: `User_${storeName}`,
        storeName,
        description: `Data for ${user.email}`,
      });

      return storeInstance.getItem(user.email).then((storedUserData) => {
        if (storedUserData && storedUserData.password === user.password) {
          return storeInstance;
        } else {
          return false;
        }
      });
    };
  },
]);
