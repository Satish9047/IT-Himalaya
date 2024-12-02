$("document").ready(function () {
  const tasks = [];
  const storedTasks = JSON.parse(localStorage.getItem("tasks"));
  console.log("stored task", storedTasks, typeof storedTasks);
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
      console.log("create task", tasks);
      localStorage.setItem("tasks", JSON.stringify(tasks));
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
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderCompletedTasks(tasks);
    renderTasks(tasks);
  });

  // Delete Task
  $("#todoList").on("click", ".delete", function () {
    const taskId = $(this).closest("li").data("id");
    console.log("delete task id: ", taskId);
    deleteTask(tasks, taskId);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks(tasks);
  });

  //Deleted completed task
  $("#completedList").on("click", ".delete", function () {
    const taskId = $(this).closest("li").data("id");
    console.log("delete task id: ", taskId);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    deleteCompletedTask(tasks, taskId);
  });
});
