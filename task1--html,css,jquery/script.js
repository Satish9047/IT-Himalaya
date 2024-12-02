$("document").ready(function () {
  const tasks = [];
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
  $("#taskDescription").on("keypress", function (event) {
    if (event.key === "Enter") {
      $("#addTaskBtn").click();
    }
  });

  $("#addTaskBtn").click(function () {
    const taskDescription = $("#taskDescription").val();
    const createdAt = getFormattedDate();
    const id = Date.now().toString();
    const dueDate = getDueDate();

    // Create new instance of Task Class
    if (taskDescription.trim() !== "") {
      const newTask = new Task(id, taskDescription, createdAt, dueDate);
      tasks.push(newTask);
      $("#taskDescription").val("");
      setLocalData(tasks);
    } else {
      alert("Please enter a task description");
    }
    renderTasks(tasks);
  });

  // Complete Task
  $("#todoList").on("click", ".complete", function () {
    const taskId = $(this).closest("li").data("id").toString();
    const task = tasks.find((task) => task.id === taskId);
    task.toggleCompleted();
    task.completedAt = getFormattedDate();
    setLocalData(tasks);
    renderCompletedTasks(tasks);
    renderTasks(tasks);
  });

  // Delete Task
  $("#todoList").on("click", ".delete", function () {
    const taskId = $(this).closest("li").data("id");
    deleteTask(tasks, taskId);
    setLocalData(tasks);
    renderTasks(tasks);
  });

  //Deleted completed task
  $("#completedList").on("click", ".delete", function () {
    const taskId = $(this).closest("li").data("id");
    setLocalData(tasks);
    deleteCompletedTask(tasks, taskId);
  });
});
