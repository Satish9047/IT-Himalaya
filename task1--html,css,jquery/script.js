$("document").ready(function () {
  const tasks = [];

  $("#addTaskBtn").click(function () {
    const taskDescription = $("#taskDescription").val();
    const createdAt = getFormattedDate();
    const id =
      Date.now().toString() + Math.floor(Math.random() * 10000).toString();
    const dueDate = getDueDate();

    // Create new instance of Task Class
    if (taskDescription.trim() !== "") {
      const newTask = new Task(id, taskDescription, createdAt, dueDate);
      tasks.push(newTask);
      $("#taskDescription").val("");
    } else {
      alert("Please enter a task description");
    }
    console.log(tasks);
    //renderTasks
    renderTasks(tasks);
  });

  // Delete Task
  $("#todoList").on("click", ".delete", function () {
    const taskId = $(this).closest("li").data("id");
    console.log(taskId);
    deleteTask(taskId);
    renderTasks(tasks);
  });
});

function renderTasks(tasks) {
  $("#todoList").empty();
  tasks.map((task) => {
    const taskHTML = `<li class="todoList" data-id="${task.id}">
              <p>${task.description}</p>
              <div class="taskDetails">
                <div class="taskInfo">
                  <div class="info">
                    <p>CreatedAt:${task.createdAt}</p>
                    <p>Due:${task.dueDate}</p>
                  </div>
                </div>
                <div class="taskEvents">
                  <button class="delete">Delete</button>
                  <button class="complete">Completed</button>
                </div>
              </div>
            </li>`;
    $("#todoList").append(taskHTML);
  });
}

function deleteTask(taskId) {
  const taskIndex = tasks.findIndex((task) => task.id === taskId);
  tasks.splice(taskIndex, 1);
  renderTasks(tasks);
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1);
  const day = String(date.getDate());
  const hours = String(date.getHours());
  const minutes = String(date.getMinutes());
  const seconds = String(date.getSeconds());

  return `${year}/${month}/${day}-${hours}:${minutes}:${seconds}`;
}

function getFormattedDate() {
  const now = new Date();
  return formatDate(now);
}

function getDueDate() {
  const now = new Date();
  now.setDate(now.getDate() + 1);
  return formatDate(now);
}
