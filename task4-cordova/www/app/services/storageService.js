app.service("storageService", [
  "$q",
  function ($q) {
    let isCordova = false;
    let db = null;

    this.initialize = function () {
      let deferred = $q.defer();
      console.log("Initializing database...");

      // document.addEventListener("deviceready", function () {
      // console.log(" has plugin", window.sqlitePlugin);
      // console.log("device has", window);
      // console.log("device has 2", window.device);
      // console.log("this device is: ", window.device.platform);

      // Check if running on Cordova

      if (window.device && window.device.platform === "Android") {
        isCordova = true;
        console.log("Running on Cordova Android.", isCordova);

        // Initialize SQLite database
        db = window.sqlitePlugin.openDatabase(
          {
            name: "taskManager.db",
            location: "default",
          },
          function () {
            console.log("SQLite database initializing.");
            db.transaction(
              function (tx) {
                // Enable foreign keys
                tx.executeSql(
                  "PRAGMA foreign_keys = ON;",
                  [],
                  function () {
                    console.log("Foreign keys enabled.");

                    // Create Users Table
                    tx.executeSql(
                      `CREATE TABLE IF NOT EXISTS Users (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        firstName TEXT,
                        lastName TEXT,
                        email TEXT,
                        password TEXT
                      )`,
                      [],
                      function () {
                        console.log("Users table created.");
                      },
                      function (tx, error) {
                        console.error(
                          "Error creating Users table: " + error.message
                        );
                      }
                    );

                    // Create Tasks Table
                    tx.executeSql(
                      `CREATE TABLE IF NOT EXISTS Tasks (
                        id INTEGER PRIMARY KEY,
                        description TEXT,
                        completed INTEGER, -- Use INTEGER for BOOLEAN
                        createdAt TEXT,
                        dueDate TEXT,
                        completedAt TEXT,
                        userId INTEGER,
                        FOREIGN KEY (userId) REFERENCES Users(id)
                      )`,
                      [],
                      function () {
                        console.log("Tasks table created.");
                      },
                      function (tx, error) {
                        console.error(
                          "Error creating Tasks table: " + error.message
                        );
                      }
                    );
                  },
                  function (error) {
                    console.error(
                      "Error enabling foreign keys: " + error.message
                    );
                    deferred.reject(error);
                  }
                );
              },
              function () {
                console.log("Database setup complete.");
                deferred.resolve();
              },
              function (error) {
                console.error("Error executing transaction: " + error.message);
                deferred.reject(error);
              }
            );
          },
          function (error) {
            console.error("Error opening SQLite database: " + error.message);
            deferred.reject(error);
          }
        );
      } else {
        // Browser environment
        console.log("Running in a browser. SQLite is not available.");
        deferred.resolve(); // Resolve promise for browser environments
      }
      // });
      return deferred.promise;
    };

    // User methods
    // Method to save a new user
    this.registerNewUser = function (user) {
      let deferred = $q.defer();

      console.log("Saving user: cordova:", isCordova);

      if (isCordova) {
        db.transaction(function (tx) {
          tx.executeSql(
            "INSERT INTO Users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)",
            [user.firstName, user.lastName, user.email, user.password],
            function (tx, result) {
              console.log("User saved successfully with ID:", result.insertId);
              deferred.resolve(result.insertId);
            },
            function (tx, error) {
              console.error("Error saving user to SQLite: " + error.message);
              deferred.reject(error);
            }
          );
        });
      } else {
        const storeInstance = getStoreInstance(user);
        storeInstance
          .setItem("userData", user)
          .then(() => {
            console.log("User saved to localForage.");
            deferred.resolve();
          })
          .catch((error) => {
            console.error("Error saving user to localForage: " + error.message);
            deferred.reject(error);
          });
      }

      return deferred.promise;
    };

    //login User
    this.loginUser = (user) => {
      const deferred = $q.defer();

      if (isCordova) {
        db.transaction(
          (tx) => {
            tx.executeSql(
              "SELECT * FROM Users WHERE email = ? AND password = ?",
              [user.email, user.password],
              (tx, result) => {
                if (result.rows.length > 0) {
                  const loggedInUser = result.rows.item(0);
                  // Store logged-in user in a 'loggedUser' store
                  const storeInstance = getLoggedUserStoreInstance();
                  storeInstance
                    .setItem("loggedUser", loggedInUser)
                    .then(() => {
                      console.log(
                        `User ${loggedInUser.email} logged in successfully (localForage).`
                      );
                      deferred.resolve(loggedInUser);
                    })
                    .catch((error) => {
                      console.error(
                        "Error storing logged user: ",
                        error.message
                      );
                      deferred.reject(error);
                    });
                } else {
                  console.log(
                    "Login failed: Invalid email or password (SQLite)."
                  );
                  deferred.reject("Invalid email or password.");
                }
              },
              (tx, error) => {
                console.error("Error querying Users table: ", error.message);
                deferred.reject(error);
              }
            );
          },
          (error) => {
            console.error("Transaction error: ", error.message);
            deferred.reject(error);
          }
        );
      } else {
        // localForage Logic for Login
        const storeInstance = getStoreInstance(user);

        storeInstance
          .getItem("userData")
          .then((storedUserData) => {
            console.log("stored userData", storedUserData);
            if (storedUserData && storedUserData.password === user.password) {
              // Store logged-in user in a 'loggedUser' store
              const storeInstance = getLoggedUserStoreInstance();
              storeInstance
                .setItem("loggedUser", storedUserData)
                .then(() => {
                  console.log(
                    `User ${storedUserData.email} logged in successfully (localForage).`
                  );
                  deferred.resolve(storedUserData);
                })
                .catch((error) => {
                  console.error("Error storing logged user: ", error.message);
                  deferred.reject(error);
                });
            } else {
              console.log(
                "Login failed: Invalid email or password (localForage)."
              );
              deferred.reject("Invalid email or password.");
            }
          })
          .catch((error) => {
            console.error(
              "Error fetching user details from localForage: ",
              error
            );
            deferred.reject(error);
          });
      }

      return deferred.promise;
    };

    //getUser
    // Get the currently logged in user
    this.getUser = () => {
      let deferred = $q.defer();

      // If using localForage (in browser), fetch user from local storage
      const storeInstance = getLoggedUserStoreInstance();
      storeInstance
        .getItem("loggedUser")
        .then((storedUserData) => {
          if (storedUserData) {
            const user = { ...storedUserData, password: undefined };
            deferred.resolve(user);
          } else {
            deferred.resolve(null);
          }
        })
        .catch((error) => {
          console.error("Error fetching user from localForage: ", error);
          deferred.reject(error);
        });

      return deferred.promise;
    };

    // Task methods
    // Method to save a task
    this.saveTask = function (user, newTask) {
      let deferred = $q.defer();
      console.log("user:", user, "newTask:", newTask);

      if (isCordova) {
        // SQLite logic for saving a task
        db.transaction(function (tx) {
          tx.executeSql(
            "INSERT INTO tasks (id, description, completed, createdAt, dueDate, completedAt, userId) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [
              newTask.id,
              newTask.description,
              newTask.completed,
              newTask.createdAt,
              newTask.dueDate,
              "not completed",
              user.id,
            ],
            function (tx, result) {
              deferred.resolve(result.insertId); // Return the inserted ID
            },
            function (tx, error) {
              console.error("Error saving task to SQLite: " + error.message);
              deferred.reject(error);
            }
          );
        });
      } else {
        // localForage logic for saving a task in browser
        const storeInstance = getStoreInstance(user);
        storeInstance
          .setItem("userTasks", newTask)
          .then(function () {
            console.log("Task saved to localForage.");
          })
          .catch((error) => {
            console.log("Error saving task to localForage: " + error.message);
          });
      }

      return deferred.promise;
    };

    // Method to get tasks for a specific user
    this.getTasksByUser = function (user) {
      let deferred = $q.defer();

      if (isCordova) {
        db.transaction(function (tx) {
          tx.executeSql(
            "SELECT * FROM Tasks WHERE userId = ?;",
            [user.id],
            function (tx, result) {
              let tasks = [];
              for (let i = 0; i < result.rows.length; i++) {
                tasks.push(result.rows.item(i));
              }
              deferred.resolve(tasks);
            },
            function (tx, error) {
              console.error("Error fetching tasks for user: " + error.message);
              deferred.reject(error);
            }
          );
        });
      } else {
        // Browser implementation
        const storeInstance = getStoreInstance(user);
        storeInstance
          .getItem("userTasks")
          .then((tasks) => {
            deferred.resolve(tasks);
          })
          .catch((error) => {
            console.error("Error fetching tasks for user: " + error.message);
            deferred.reject(error);
          });
      }

      return deferred.promise;
    };

    //deleteTask
    this.deleteTaskById = function (user, taskId) {
      let deferred = $q.defer();

      if (isCordova) {
        db.transaction(function (tx) {
          console.log("user:", user, "taskId:", taskId);
          tx.executeSql(
            "DELETE FROM Tasks WHERE id = ? AND userId = ?;",
            [taskId, user.id],
            function (tx, result) {
              if (result.rowsAffected > 0) {
                console.log(`Task with ID ${taskId} deleted successfully.`);
                deferred.resolve(true);
              } else {
                console.log(
                  `No task found with ID ${taskId} for user ${user.id}.`
                );
                deferred.resolve(false);
              }
            },
            function (tx, error) {
              console.error("Error deleting task: " + error.message);
              deferred.reject(error);
            }
          );
        });
      } else {
        // Browser implementation using localForage
        const storeInstance = getStoreInstance(user);

        storeInstance
          .getItem("userTasks")
          .then((tasks) => {
            if (tasks && tasks.length > 0) {
              // Filter out the task with the given taskId
              const updatedTasks = tasks.filter((task) => task.id !== taskId);

              // Save the updated task list
              return storeInstance.setItem("userTasks", updatedTasks);
            } else {
              console.log("No tasks found for user.");
              return null;
            }
          })
          .then(() => {
            deferred.resolve(true);
          })
          .catch((error) => {
            deferred.reject(error);
          });
      }

      return deferred.promise;
    };

    // Mark a task  completed
    this.sendToCompleted = async (user, taskId) => {
      let deferred = $q.defer();
      try {
        if (isCordova) {
          // Cordova implementation using SQLite
          db.transaction(function (tx) {
            console.log("user:", user, "taskId:", taskId);
            const completedAt = getFormattedDate();

            tx.executeSql(
              "UPDATE Tasks SET completed = ?, completedAt = ? WHERE id = ? AND userId = ?",
              [true, completedAt, taskId, user.id],
              function (tx, result) {
                if (result.rowsAffected > 0) {
                  console.log(`Task with ID ${taskId} marked as completed.`);
                  deferred.resolve(true);
                } else {
                  console.log(
                    `No task found with ID ${taskId} for user ${user.id}.`
                  );
                  deferred.resolve(false);
                }
              },
              function (tx, error) {
                console.error("Error updating task in SQLite: ", error.message);
                deferred.reject(error);
              }
            );
          });
        } else {
          // Browser implementation using localForage
          const storeInstance = getStoreInstance(user);

          const tasks = await storeInstance.getItem("userTasks");

          if (tasks && tasks.length > 0) {
            const task = tasks.find((task) => task.id === taskId);
            if (task) {
              task.completed = true;
              task.completedAt = getFormattedDate();

              // Save updated tasks back to storage
              await storeInstance
                .setItem("userTasks", tasks)
                .then(() => {
                  console.log("Task marked as completed.");
                  deferred.resolve(true);
                })
                .catch((error) => {
                  console.error(
                    "Error updating task in localForage: ",
                    error.message
                  );
                  deferred.reject(error);
                });
            } else {
              console.warn(`Task with ID  not found.`);
              deferred.resolve(false);
            }
          } else {
            console.warn("No tasks found for user.");
            deferred.resolve(false);
          }
        }
      } catch (error) {
        console.error("Error marking task as completed:", error);
        deferred.reject(error);
      }
      return deferred.promise;
    };
  },
]);
