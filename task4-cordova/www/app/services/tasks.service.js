app.service("taskService", [
  "$rootScope",
  "userService",
  "storageService",
  function ($rootScope, userService, storageService) {
    this.tasks = [];
    this.user = null;

    // load user
    this.loadUser = async () => {
      if (!this.user) {
        try {
          const userData = await userService.getUser();
          if (userData && userData.email) {
            this.user = userData;
          } else {
            console.warn("No user data found.");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    // Load tasks for the current user
    this.loadTask = async () => {
      try {
        await this.loadUser();

        if (this.tasks.length > 0) {
          return Promise.resolve(this.tasks);
        }

        const taskData = await storageService.getTasksByUser(this.user);
        // const storeInstance = getStoreInstance(this.user);
        // const taskData = await storeInstance.getItem("userTasks");

        if (taskData) {
          this.tasks = taskData;
        } else {
          console.log("No tasks found.");
          this.tasks = [];
        }

        return this.tasks;
      } catch (error) {
        console.error("Error loading tasks:", error);
        return [];
      }
    };

    //clear tasks
    this.clearTasks = () => {
      this.tasks = [];
      this.user = null;
      $rootScope.$broadcast("task:updated", this.tasks);
      console.log("Tasks cleared successfully.");
    };

    // Get task
    this.getTasks = () => {
      return this.tasks;
    };

    // Add a new task
    this.addTask = (newTask) => {
      try {
        if (!this.user || !this.user.email) {
          console.error("User not initialized. Cannot add task.");
          return;
        }

        this.tasks.push(newTask);
        $rootScope.$broadcast("task:updated", this.tasks);

        //using storageService
        storageService
          .saveTask(this.user, this.tasks)
          .then(() => {
            console.log("Task saved successfully.");
          })
          .catch((error) => {
            console.error("Error saving task:", error);
          });
      } catch (error) {
        console.error("Error adding task:", error);
      }
    };

    // Delete a task by ID
    this.deleteTask = async (taskId) => {
      try {
        if (!this.user || !this.user.email) {
          console.error("User not initialized. Cannot delete task.");
          return;
        }

        const taskIndex = this.tasks.findIndex((task) => task.id === taskId);
        this.tasks.splice(taskIndex, 1);
        $rootScope.$broadcast("tasks:updated", this.tasks);

        storageService.deleteTaskById(taskId, this.user).then((success) => {
          if (success) {
            console.log("Task deleted successfully.");
          } else {
            console.warn("Error while deleting task.");
          }
        });
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    };

    // Mark a task as completed
    this.sendToCompleted = async (taskId) => {
      try {
        if (!this.user || !this.user.email) {
          console.error("User not initialized. Cannot mark task as completed.");
          return;
        }

        const task = this.tasks.find((task) => task.id === taskId);
        if (task) {
          task.completed = true;
          task.completedAt = getFormattedDate();

          $rootScope.$broadcast("task:updated", this.tasks);

          const storeInstance = getStoreInstance(this.user);
          await storeInstance
            .setItem("userTasks", this.tasks)
            .then(() => {
              console.log("Task marked as completed successfully.");
            })
            .catch((error) => {
              console.error("Error storing tasks:", error);
            });
        } else {
          console.warn("Task not found:", taskId);
        }
      } catch (error) {
        console.error("Error completing task:", error);
      }
    };
  },
]);
