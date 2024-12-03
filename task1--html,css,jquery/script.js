$("document").ready(function () {
  const tasks = [];

  // Initialize localforage
  localforage.config({
    name: "Task Manager",
    storeName: "tasks",
    description: "Task manager application data",
  });

  // Set current year in footer
  const currentDate = new Date();
  const formattedDate = currentDate.getFullYear();
  $("#copyRightDate").text(formattedDate);
  try {
    // Retrieve tasks from local storage
    getTasksFromLocalForage().then((storedTasks) => {
      console.log("Stored data", storedTasks);
      if (storedTasks.length > 0) {
        storedTasks.forEach((task) => {
          const newTask = new Task(
            task.id,
            task.description,
            task.createdAt,
            task.dueDate,
            task.completed,
            task.completedAt
          );
          tasks.push(newTask);
        });
      }
      renderTasks(tasks);
      renderCompletedTasks(tasks);
    });
  } catch (error) {
    console.error("Error initializing tasks:", error);
    alert("Error initializing tasks. Please try again.");
  }

  // Add Task using Enter key
  $("form").on("submit", function (event) {
    event.preventDefault();
    addTask(tasks);
  });

  // Complete Task
  $("#todoList").on("click", ".complete", function () {
    const taskId = $(this).closest("li").data("id").toString();
    const task = tasks.find((task) => task.id === taskId);
    task.toggleCompleted();
    setTaskToLocalForage(tasks);
    renderCompletedTasks(tasks);
    renderTasks(tasks);
  });

  // Delete Task
  $("#todoList").on("click", ".delete", function () {
    const taskId = $(this).closest("li").data("id").toString();
    const taskElement = $(this).closest("li");
    deleteTask(tasks, taskId);
    setTaskToLocalForage(tasks);
    taskElement.remove();
  });

  //Deleted completed task
  $("#completedList").on("click", ".delete", function () {
    const taskId = $(this).closest("li").data("id").toString();
    const taskElement = $(this).closest("li");
    setTaskToLocalForage(tasks);
    deleteCompletedTask(tasks, taskId);
    taskElement.remove();
  });
});
