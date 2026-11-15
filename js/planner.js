// Academic Planner: add, complete and delete tasks

var tasks = [];

var taskForm = document.getElementById("taskForm");
var taskInput = document.getElementById("taskInput");
var taskList = document.getElementById("taskList");
var taskError = document.getElementById("taskError");
var taskCount = document.getElementById("taskCount");

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  var saved = localStorage.getItem("tasks");
  if (saved) {
    tasks = JSON.parse(saved);
  }
}

function addTask(text) {
  tasks.push({ id: Date.now(), text: text, done: false });
  saveTasks();
  renderTasks();
}

function toggleTask(id) {
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === id) {
      tasks[i].done = !tasks[i].done;
    }
  }
  saveTasks();
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(function (task) {
    return task.id !== id;
  });
  saveTasks();
  renderTasks();
}

function renderTasks() {
  taskList.innerHTML = "";

  if (tasks.length === 0) {
    var empty = document.createElement("li");
    empty.textContent = "No tasks yet. Add one above.";
    taskList.appendChild(empty);
  }

  tasks.forEach(function (task) {
    var li = document.createElement("li");
    if (task.done) {
      li.classList.add("done");
    }

    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.addEventListener("change", function () {
      toggleTask(task.id);
    });

    var span = document.createElement("span");
    span.textContent = task.text;

    var del = document.createElement("button");
    del.textContent = "Delete";
    del.className = "delete-btn";
    del.addEventListener("click", function () {
      deleteTask(task.id);
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(del);
    taskList.appendChild(li);
  });

  var completed = tasks.filter(function (task) {
    return task.done;
  }).length;
  taskCount.textContent = completed + " of " + tasks.length + " tasks completed";
}

taskForm.addEventListener("submit", function (event) {
  event.preventDefault();
  var text = taskInput.value.trim();

  if (text === "") {
    taskError.textContent = "Please enter a task.";
    return;
  }

  taskError.textContent = "";
  addTask(text);
  taskInput.value = "";
  taskInput.focus();
});

loadTasks();
renderTasks();
