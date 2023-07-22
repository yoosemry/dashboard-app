// Getting all required elements
const inputField = document.querySelector(".todo_input-textarea");
const todoLists = document.querySelector(".todo_todoLists");
const pendingNum = document.querySelector(".todo_pending-num");
const clearButton = document.querySelector(".todo_clear-button");
let tasks = [];

// soo aqrin user active ah
let userInformation = JSON.parse(localStorage.getItem('userInformation'));
if(!userInformation){
  window.location.href = '/index.html';
  
}



// Function to fetch tasks from JSON file
async function fetchTasks() {
  try {
    const response = await fetch("./src//data/todolist.json");
    tasks = await response.json();
    renderTasks();
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
}

// Function to load tasks from local storage
function loadTasksFromLocalStorage() {
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
    renderTasks();
  } else {
    fetchTasks();
  }
}

// Call loadTasksFromLocalStorage to load tasks from local storage or JSON file
loadTasksFromLocalStorage();

// Add task when Enter key is pressed
inputField.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    const inputVal = inputField.value.trim();
    if (inputVal.length > 0) {
      const taskId = tasks.length + 1;
      const newTask = { id: taskId, task: inputVal, userId : userInformation.userId ,completed : false };
      tasks.push(newTask);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTask(newTask);
      inputField.value = "";
      updatePendingNum();
    }
  }
});

// Function to render tasks
function renderTasks() {
  todoLists.innerHTML = "";
 tasks.filter(fi => fi.userId === userInformation.userId).forEach(renderTask);
  updatePendingNum();
}

// Function to render a single task
function renderTask(task) {
  const liTag = `<li class="todo_list todo_pending" onclick="handleStatus(event)">
    <input type="checkbox" ${task.completed ? 'checked': '' } />        
    <span class="todo_task">${task.id}.</span>
    <span class="todo_task">${task.task}</span>
    <i class="todo_uil uil-notes "><span class="material-symbols-outlined todo_note-icon" onclick="deleteTask(${task.id})">
    delete
    </span></i>

  </li>`;
  todoLists.insertAdjacentHTML("beforeend", liTag);
}

// Function to handle task status (check/uncheck)
function handleStatus(event) {
  const li = event.currentTarget;
  const checkbox = li.querySelector("input");
  checkbox.checked = !checkbox.checked;
  li.classList.toggle("todo_pending");
  updatePendingNum();
}

// Function to delete a task
function deleteTask(event) {
    const li = event.currentTarget.parentElement;
    const taskId = parseInt(li.querySelector(".todo_task").textContent.trim());
 
    const deletedTaskIndex = tasks.findIndex((task) => task.id === taskId);
    console.log(deletedTaskIndex);
    tasks.splice(deletedTaskIndex, 1);
    li.remove();
  
    // Update task IDs
    for (let i = deletedTaskIndex; i < tasks.length; i++) {
      tasks[i].id = i + 1;
    }
  
    localStorage.setItem("tasks", JSON.stringify(tasks)); // Update local storage
  
    updatePendingNum();
    renderTasks();
  }
  
  

// Function to update the pending tasks count
function updatePendingNum() {
  const pendingTasks = document.querySelectorAll(".todo_pending");
  pendingNum.textContent = pendingTasks.length === 0 ? "0" : pendingTasks.length;
}

// Clear all tasks when the clear button is clicked
clearButton.addEventListener("click", () => {
    tasks = [];
    localStorage.removeItem("tasks");
    todoLists.innerHTML = "";
    pendingNum.textContent = "0";
  });