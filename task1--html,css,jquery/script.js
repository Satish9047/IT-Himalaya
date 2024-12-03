$("document").ready(function () {
  const tasks = [];

  // Set current year in footer
  const currentDate = new Date();
  const formattedDate = currentDate.getFullYear();
  $("#copyRightDate").text(formattedDate);

  // Retrieve tasks from local storage
  const storedTasks = getLocalData();
  if (storedTasks?.length > 0) {
    storedTasks.forEach((task) => {
      const newTask = new Task(
        task.id,
        task.description,
        task.createdAt,
        task.dueDate
      );
      tasks.push(newTask);
    });
    renderTasks(tasks);
    renderCompletedTasks(tasks);
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
    setLocalData(tasks);
    renderCompletedTasks(tasks);
    renderTasks(tasks);
  });

  // Delete Task
  $("#todoList").on("click", ".delete", function () {
    const taskId = $(this).closest("li").data("id").toString();
    deleteTask(tasks, taskId);
    setLocalData(tasks);
    renderTasks(tasks);
  });

  //Deleted completed task
  $("#completedList").on("click", ".delete", function () {
    const taskId = $(this).closest("li").data("id").toString();
    setLocalData(tasks);
    deleteCompletedTask(tasks, taskId);
  });
});
