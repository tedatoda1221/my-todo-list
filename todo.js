console.log("Welcome to my to-do list app!");

const taskInput = document.querySelector("#task-input");
const addTaskBtn = document.querySelector("#add-button");
const taskList = document.querySelector("#task-list");

taskInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTaskBtn.click();
  }
});

let taskBeingEdited = null; // Variable to track the task being edited
const taskCounter = document.querySelector("#taskcounter");
const progressBar = document.querySelector("#progressBar");
const percentage = document.querySelector("#percentage");

console.log(taskInput, addTaskBtn, taskList);

function updateProgress() {
  const tasks = document.querySelectorAll("#task-list .task-item");
  const totalTasks = tasks.length;
  let completedTasks = 0;

  tasks.forEach(function (task) {
    const checkbox = task.querySelector('input[type="checkbox"]');
    if (checkbox && checkbox.checked) {
      completedTasks++;
    }
  });

  const progress =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  taskCounter.textContent = `${completedTasks} of ${totalTasks} tasks completed`;

  progressBar.value = completedTasks;
  progressBar.max = totalTasks || 1;

  percentage.textContent = `${progress}%`;
}

addTaskBtn.addEventListener("click", function () {
  if (taskBeingEdited !== null) {
    const taskTextSpan = taskBeingEdited.querySelector("span");
    const updatedTask = taskInput.value.trim();

    if (updatedTask === "") {
      alert("Task cannot be empty.");
      return;
    }

    taskTextSpan.textContent = updatedTask;

    taskBeingEdited = null;
    addTaskBtn.textContent = "+ Add Task";
    taskInput.value = "";
    taskInput.focus();

    return;
  }

  console.log("Add task button clicked");

  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task.");
    return;
  }

  // Create the task row
  const newTask = document.createElement("li");
  newTask.classList.add("task-item");

  // Create the checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  // Create the task text
  const taskTextSpan = document.createElement("span");
  const editButton = document.createElement("button");
  const deleteButton = document.createElement("button");
  taskTextSpan.textContent = taskText;

  //create edit button
  editButton.textContent = "Edit";
  editButton.classList.add("editbutton");

  //create delete button
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("deletebutton");

  editButton.addEventListener("click", function () {
    taskBeingEdited = newTask;
    taskInput.value = taskTextSpan.textContent;
    addTaskBtn.textContent = "Save Changes";
    taskInput.focus();
  });

  //making my delete button functional
  deleteButton.addEventListener("click", function () {
    newTask.remove();
  });

  // Add the line-through effect when checked
  checkbox.addEventListener("change", function () {
    taskTextSpan.classList.toggle("completed");
    updateProgress();
  });

  // Put the checkbox and text inside the task row
  newTask.appendChild(checkbox);
  newTask.appendChild(taskTextSpan);
  newTask.appendChild(editButton);
  newTask.appendChild(deleteButton);

  // Add the completed task row to the list
  taskList.appendChild(newTask);

  // Clear the input
  taskInput.value = "";
  taskInput.focus();
});
// Add checkbox behavior to existing HTML tasks
document.querySelectorAll(".task-item").forEach(function (task) {
  const checkbox = task.querySelector('input[type="checkbox"]');
  const taskTextSpan = task.querySelector("span");

  if (checkbox && taskTextSpan) {
    checkbox.addEventListener("change", function () {
      taskTextSpan.classList.toggle("completed");
      updateProgress();
    });
  }
});
document.querySelectorAll(".deletebutton").forEach(function (button) {
  button.addEventListener("click", function () {
    const taskItem = button.closest(".task-item");
    taskItem.remove();
    updateProgress();
  });
});

document.querySelectorAll(".editbutton").forEach(function (button) {
  button.addEventListener("click", function () {
    const taskItem = button.closest(".task-item");
    const taskTextSpan = taskItem.querySelector("span");

    taskBeingEdited = taskItem;
    taskInput.value = taskTextSpan.textContent.trim();
    addTaskBtn.textContent = "Save Changes";
    taskInput.focus();
  });
});
