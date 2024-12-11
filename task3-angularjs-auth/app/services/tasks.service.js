app.service("taskService", [
  "userService",
  function (userService) {
    this.tasks = [];
    this.user = null;

    // load user
    this.loadUser = async () => {
      if (!this.user) {
        if (!this.user) {
          try {
            const userData = await userService.getUser();
            if (userData && userData.email) {
              console.log("User data:", userData);
              this.user = userData;
            } else {
              console.warn("No user data found.");
            }
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        }
      }
      if (!this.user || !this.user.email) {
        throw new Error("User not initialized. Cannot perform the operation.");
      }
    };

    // Load tasks for the current user
    this.loadTask = async () => {
      try {
        await this.loadUser();

        if (this.tasks.length > 0) {
          return Promise.resolve(this.tasks);
        }

        const storeInstance = getStoreInstance(this.user);
        const taskData = await storeInstance.getItem("userTasks");

        if (taskData) {
          console.log("Loaded tasks:", taskData);
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

    // Get task
    this.getTasks = () => {
      return this.tasks;
    };

    // Add a new task
    this.addTask = async (newTask) => {
      try {
        console.log("Adding new task:", newTask);

        if (!this.user || !this.user.email) {
          console.error("User not initialized. Cannot add task.");
          return;
        }

        this.tasks.push(newTask);

        const storeInstance = getStoreInstance(this.user);
        await storeInstance.setItem("userTasks", this.tasks);

        console.log("Task added successfully.");
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
        if (taskIndex !== -1) {
          this.tasks.splice(taskIndex, 1);

          const storeInstance = getStoreInstance(this.user);
          await storeInstance.setItem("userTasks", this.tasks);

          console.log("Task deleted successfully.");
        } else {
          console.warn("Task not found:", taskId);
        }
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
          task.completedAt = new Date().toISOString();

          const storeInstance = getStoreInstance(this.user);
          await storeInstance.setItem("userTasks", this.tasks);

          console.log("Task marked as completed:", taskId);
        } else {
          console.warn("Task not found:", taskId);
        }
      } catch (error) {
        console.error("Error completing task:", error);
      }
    };
  },
]);
