app.service("storageService", [
  "$q",
  function ($q) {
    var isCordova = false;
    var db = null;

    // Method to initialize SQLite or localForage accordingly
    this.initialize = function () {
      var deferred = $q.defer();

      // Check if running in Cordova (Android)
      if (window.cordova && window.sqlitePlugin) {
        isCordova = true;

        // Initialize SQLite database
        db = window.sqlitePlugin.openDatabase(
          { name: "tasks.db", location: "default" },
          function () {
            console.log("SQLite database initialized.");
            // Create table for tasks if it doesn't exist
            db.transaction(function (tx) {
              //tasks
              tx.executeSql(
                "CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY,  description TEXT, completed BOOLEAN, createdAt DATETIME, dueDate DATETIME, completedAt DATETIME)",
                [],
                function () {
                  console.log("SQLite tasks table created.");
                  deferred.resolve();
                },
                function (error) {
                  console.error(
                    "Error creating SQLite tasks table: " + error.message
                  );
                  deferred.reject(error);
                }
              );

              //users
              tx.executeSql(
                "CREATE TABLE IF NOT EXISTS Users (id INTEGER PRIMARY KEY, firstName TEXT, lastName TEXT, email TEXT, password TEXT, taskId INTEGER, FOREIGN KEY (taskId) REFERENCES tasks(id))",
                [],
                function () {
                  console.log("SQLite tasks table created.");
                  deferred.resolve();
                },
                function (error) {
                  console.error(
                    "Error creating SQLite tasks table: " + error.message
                  );
                  deferred.reject(error);
                }
              );
            });
          },
          function (error) {
            console.error("Error opening SQLite database: " + error.message);
            deferred.reject(error);
          }
        );
      }

      return deferred.promise;
    };

    // Method to save a task
    this.saveTask = function (task) {
      var deferred = $q.defer();

      if (isCordova) {
        // SQLite logic for saving a task
        db.transaction(function (tx) {
          tx.executeSql(
            "INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)",
            [task.title, task.description, task.status],
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
        localforage.getItem("tasks").then(function (tasks) {
          tasks = tasks || [];
          tasks.push(task);
          localforage
            .setItem("tasks", tasks)
            .then(function () {
              deferred.resolve();
            })
            .catch(function (error) {
              console.error("Error saving task to localForage: " + error);
              deferred.reject(error);
            });
        });
      }

      return deferred.promise;
    };

    // Method to get all tasks
    this.getTasks = function (user) {
      var deferred = $q.defer();

      if (isCordova) {
        // SQLite logic for fetching all tasks
        db.transaction(function (tx) {
          tx.executeSql(
            "SELECT * FROM tasks",
            [],
            function (tx, result) {
              var tasks = [];
              for (var i = 0; i < result.rows.length; i++) {
                tasks.push(result.rows.item(i));
              }
              deferred.resolve(tasks); // Return tasks array
            },
            function (tx, error) {
              console.error(
                "Error fetching tasks from SQLite: " + error.message
              );
              deferred.reject(error);
            }
          );
        });
      } else {
        // localForage logic for fetching all tasks in browser
        localforage
          .getItem("tasks")
          .then(function (tasks) {
            tasks = tasks || [];
            deferred.resolve(tasks); // Return tasks array
          })
          .catch(function (error) {
            console.error("Error fetching tasks from localForage: " + error);
            deferred.reject(error);
          });
      }

      return deferred.promise;
    };
  },
]);
