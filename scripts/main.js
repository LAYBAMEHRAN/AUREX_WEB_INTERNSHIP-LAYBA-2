        const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

const allBtn = document.getElementById("allBtn");
const activeBtn = document.getElementById("activeBtn");
const completedBtn = document.getElementById("completedBtn");

const errorMessage = document.getElementById("errorMessage");

// Get tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Save tasks
function saveTasks() {
localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Display tasks
function displayTasks() {

taskList.innerHTML = "";

tasks.forEach(function (task) {

    const listItem = document.createElement("li");

    // Task text
    const taskTextElement = document.createElement("span");
    taskTextElement.textContent = task.text;

    // Add completed class
    if (task.completed) {
        listItem.classList.add("completed");
    }


    // Complete button
    const completeBtn = document.createElement("button");
    completeBtn.textContent = task.completed ? "Undo" : "Complete";
    completeBtn.classList.add("complete-btn");

    completeBtn.addEventListener("click", function () {

        task.completed = !task.completed;

        saveTasks();
        displayTasks();

    });


    // Edit button
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("edit-btn");

    editBtn.addEventListener("click", function () {

        const updatedTask = prompt(
            "Edit your task:",
            task.text
        );

        if (updatedTask !== null && updatedTask.trim() !== "") {

            task.text = updatedTask.trim();

            saveTasks();
            displayTasks();
        }

    });


    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");

    deleteBtn.addEventListener("click", function () {

        tasks = tasks.filter(function (item) {
            return item !== task;
        });

        saveTasks();
        displayTasks();

    });


    // Add elements to list item
    listItem.appendChild(taskTextElement);
    listItem.appendChild(completeBtn);
    listItem.appendChild(editBtn);
    listItem.appendChild(deleteBtn);

    taskList.appendChild(listItem);

});

}

// Add Task Function
function addTask() {

const taskText = taskInput.value.trim();

if (taskText === "") {
    errorMessage.textContent = "Please enter a task";
    return;
}

errorMessage.textContent = "";

const newTask = {
    text: taskText,
    completed: false
};

tasks.push(newTask);

saveTasks();
displayTasks();

taskInput.value = "";

}

// Add task using button
addTaskBtn.addEventListener("click", addTask);

// Add task using Enter key
taskInput.addEventListener("keydown", function (event) {

if (event.key === "Enter") {
    addTask();
}

});

// Show All Tasks
allBtn.addEventListener("click", function () {

const taskItems = taskList.children;

for (let item of taskItems) {
    item.style.display = "flex";
}

});

// Show Active Tasks
activeBtn.addEventListener("click", function () {

const taskItems = taskList.children;

for (let item of taskItems) {

    if (item.classList.contains("completed")) {
        item.style.display = "none";
    } else {
        item.style.display = "flex";
    }

}

});

// Show Completed Tasks
completedBtn.addEventListener("click", function () {

const taskItems = taskList.children;

for (let item of taskItems) {

    if (item.classList.contains("completed")) {
        item.style.display = "flex";
    } else {
        item.style.display = "none";
    }

}

});

// Display saved tasks when page loads
displayTasks();

