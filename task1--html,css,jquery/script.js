$("document").ready(function () {
  const tasks = [];

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
    } else {
      alert("Please enter a task description");
    }
    renderTasks(tasks);
  });

  // Complete Task
  $("#todoList").on("click", ".complete", function () {
    const taskId = $(this).closest("li").data("id").toString();
    console.log("task id: ", taskId);
    console.log("task ", tasks);
    const task = tasks.find((task) => task.id === taskId);
    console.log("task info", task);
    task.toggleCompleted();
    task.completedAt = getFormattedDate();
    renderCompletedTasks(tasks);
    renderTasks(tasks);
  });

  // Delete Task
  $("#todoList").on("click", ".delete", function () {
    const taskId = $(this).closest("li").data("id");
    console.log("delete task id: ", taskId);
    deleteTask(tasks, taskId);
    renderTasks(tasks);
  });

  //Deleted completed task
  $("#completedList").on("click", ".delete", function () {
    const taskId = $(this).closest("li").data("id");
    console.log("delete task id: ", taskId);
    deleteCompletedTask(tasks, taskId);
  });
});
