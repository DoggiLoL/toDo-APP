// main page

const taskList = document.querySelector("#task-list");
const addBtn = document.querySelector("#add-btn");
const taskInput = document.querySelector("#task-input");
const leftTasks = document.querySelector("#left-tasks");
const clearBtn = document.querySelector("#clear-btn");

loadTasks();

addBtn.addEventListener("click", () => {
  if (taskInput.value.trim() === "") {
    return;
  }
  addNewLi(taskInput.value);
  taskInput.value = "";
  saveTask();
  updateCounter();
});

taskList.addEventListener("click", (e) => {
  if (e.target.matches(".checkbox")) {
    e.target.closest(".task").classList.toggle("done");
    saveTask();
    updateCounter();
    return;
  }
  if (e.target.matches(".task-text")) {
    e.target.closest(".task").classList.toggle("done");
    saveTask();
    updateCounter();
    return;
  }
  if (e.target.matches(".task")) {
    e.target.classList.toggle("done");
  }
  if (e.target.matches(".delete-btn")) {
    e.target.parentElement.remove();
  }
  saveTask();
  updateCounter();
});

clearBtn.addEventListener("click", () => {
  deleteDone();
  saveTask();
  updateCounter();
});

// Functions - for main page

function addNewLi(value) {
  const li = document.createElement("li");
  const check = document.createElement("div");
  const span = document.createElement("span");
  const btn = document.createElement("button");

  li.className = "task";

  check.className = "checkbox";

  span.className = "task-text";
  span.textContent = value;

  btn.className = "delete-btn";
  btn.textContent = "x";

  li.appendChild(check);
  li.appendChild(span);
  li.appendChild(btn);
  taskList.appendChild(li);
}

function updateCounter() {
  leftTasks.textContent = taskList.querySelectorAll(".task:not(.done)").length;
}

function deleteDone() {
  const doneSelection = document.querySelectorAll(".task.done");

  doneSelection.forEach((element) => {
    element.remove();
  });
}

function saveTask() {
  const tasks = [...taskList.querySelectorAll(".task")].map((li) => ({
    text: li.querySelector(".task-text").textContent,
    done: li.classList.contains("done"),
  }));
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    addNewLi(task.text);
    if (task.done) {
      taskList.lastElementChild.classList.add("done");
    }
  });
  updateCounter();
}
