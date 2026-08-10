const taskList = document.querySelector("#task-list");
const addBtn = document.querySelector("#add-btn");
const taskInput = document.querySelector("#task-input");

addBtn.addEventListener("click", () => {
  if (taskInput.value.trim() === "") {
    console.log("ПУСТО");
    return;
  }
  addNewLi(taskInput.value);
});

taskList.addEventListener("click", (e) => {
  if (e.target.matches(".checkbox")) {
    e.target.closest(".task").classList.toggle("done");
    return;
  }
  if (e.target.matches(".task-text")) {
    e.target.closest(".task").classList.toggle("done");
    return;
  }
  if (e.target.matches(".task")) {
    e.target.classList.toggle("done");
  }
  if (e.target.matches(".delete-btn")) {
    e.target.parentElement.remove();
  }
});

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
