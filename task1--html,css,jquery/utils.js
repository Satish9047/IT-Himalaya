// Render Tasks Function
function renderTasks(tasks) {
  const todoTasks = tasks.filter((task) => !task.completed);
  $("#todoList").empty();
  todoTasks.map((task) => {
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

function renderCompletedTasks(tasks) {
  const completedTasks = tasks.filter((task) => task.completed);
  $("#completedList").empty();
  completedTasks.map((task) => {
    const taskHTML = `<li class="completedList" data-id="${task.id}">
                <p>${task.description}</p>
                <div class="taskDetails">
                  <div class="taskInfo">
                    <div class="info">
                      <p>CreatedAt:${task.createdAt}</p>
                      <p>Due:${task.dueDate}</p>
                      <p>CompletedAt:${task.completedAt}</p>
                    </div>
                  </div>
                  <div class="taskEvents">
                    <button class="delete">Delete</button>
                  </div>
                </div>
              </li>`;
    $("#completedList").append(taskHTML);
  });
}

// Delete Task
function deleteTask(tasks, taskId) {
  const taskIndex = tasks.findIndex((task) => task.id === taskId);
  tasks.splice(taskIndex, 1);
}

// Delete Completed Task  i created this just so we can render only completed tasks when require
//eg: deleting completed tasks doesn't required to re render todoTask list
function deleteCompletedTask(tasks, taskId) {
  const taskIndex = tasks.findIndex((task) => task.id === taskId);
  tasks.splice(taskIndex, 1);
}

// Format Date
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1);
  const day = String(date.getDate());
  const hours = String(date.getHours());
  const minutes = String(date.getMinutes());
  const seconds = String(date.getSeconds());

  return `${year}/${month}/${day}-${hours}:${minutes}:${seconds}`;
}

//Add Task
function addTask(tasks) {
  const taskDescription = $("#taskDescription").val();
  const createdAt = getFormattedDate();
  const id = Date.now().toString();
  const dueDate = getDueDate();

  // Create new instance of Task Class
  if (taskDescription.trim() !== "") {
    const newTask = new Task(id, taskDescription, createdAt, dueDate);
    tasks.push(newTask);
    $("#taskDescription").val("");
    setTaskToLocalForage(tasks);
    renderTasks(tasks);
  } else {
    alert("Please enter a task description");
  }
}

// Get Formatted Date
function getFormattedDate() {
  const now = new Date();
  return formatDate(now);
}

// Get Due Date
function getDueDate() {
  const now = new Date();
  now.setDate(now.getDate() + 1);
  return formatDate(now);
}

//Set Data to LocalForage
function setTaskToLocalForage(tasks) {
  const tasksToSave = tasks.map((task) => ({
    id: task.id,
    description: task.description,
    createdAt: task.createdAt,
    dueDate: task.dueDate,
    completed: task.completed,
    completedAt: task.completedAt || null,
  }));
  localforage
    .setItem("tasks", tasksToSave)
    .then(() => {
      console.log("Tasks saved successfully:", tasks);
    })
    .catch((error) => {
      console.error("Error saving tasks:", error);
    });
}

// Get Data from LocalForage
async function getTasksFromLocalForage() {
  return localforage
    .getItem("tasks")
    .then((tasksData) => {
      if (!tasksData) {
        return [];
      } else {
        return tasksData;
      }
    })
    .catch((error) => {
      console.error("Error retrieving tasks from localForage:", error);
      return [];
    });
}
