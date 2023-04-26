let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

// empty array to store task value
let arrayOfTasks = [];

// check if there is tasks in local storage
if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

/// add task
submit.onclick = function () {
  if (input.value !== "") {
    addTaskToArray(input.value); // Add task to array of tasks
    input.value = ""; // empty task input
  }
};

// click on task element
tasksDiv.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    // remove from local storage
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"));

    //remove from page
    e.target.parentElement.remove();
  }
  // task element
  if (e.target.classList.contains("task")) {
    // toggle completed to the task
    toggleStatusTaskWith(e.target.getAttribute("data-id"));

    // toggle Done class
    e.target.classList.toggle("done");
  }
});

function addTaskToArray(taskText) {
  // task data

  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };

  // push task to array
  arrayOfTasks.push(task);

  // Add tasks to page
  addElementsToPageFrom(arrayOfTasks);

  // Add data to local storage
  addDataToLocalStorageFrom(arrayOfTasks);
}

function addElementsToPageFrom(arrayOfTasks) {
  // empty the tasks div
  tasksDiv.innerHTML = "";

  // looping tje array of tasks and creating elements on it
  arrayOfTasks.forEach((task) => {
    // Create main div
    let div = document.createElement("div");
    div.className = "task";
    // check if the task is completed
    if (task.completed) {
      div.className = " task done";
    }
    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));

    // create delete span
    let span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("Delete"));
    div.appendChild(span);

    // add div to tasks div
    tasksDiv.appendChild(div);
  });
}

function addDataToLocalStorageFrom(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getDataFromLocalStorage() {
  let tasks = window.localStorage.getItem("tasks");
  if (data) {
    JSON.parse(tasks);
    addElementsToPageFrom(tasks);
  }
}

function deleteTaskWith(taslId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taslId);
  addDataToLocalStorageFrom(arrayOfTasks);
}

function toggleStatusTaskWith(taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].completed == false
        ? (arrayOfTasks[i].completed = true)
        : (arrayOfTasks[i].completed = false);
    }
    addDataToLocalStorageFrom(arrayOfTasks);
  }
}
