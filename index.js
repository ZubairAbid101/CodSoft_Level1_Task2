document.addEventListener("DOMContentLoaded", function () {
    const taskList = document.getElementById("task-list");
    const taskInput = document.getElementById("task-input");
    const addTaskButton = document.getElementById("add-task");

    // Check if tasks are stored in local storage
    let tasksArray = JSON.parse(localStorage.getItem("tasks")) || [];

    // Load tasks from local storage
    function loadTasks() {
        taskList.innerHTML = "";
        tasksArray.forEach(function (task, index) {
            createTaskElement(task, index);
        });
    }

    // Save tasks to local storage
    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasksArray));
    }

    // Create a new task element
    function createTaskElement(taskText, index) {
        const taskItem = document.createElement("div");
        taskItem.classList.add("task-item");
        taskItem.innerHTML = `
            <span class="task-test">${taskText}</span>

            <div class="task-actions-container">
                <span class="task-actions delete" data-index="${index}">Edit</span>
                <span class="task-actions edit" data-index="${index}">Delete</span>
            </div>
        `;
        taskList.appendChild(taskItem);
    }

    // Handle add task button click
    addTaskButton.addEventListener("click", function () {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            tasksArray.push(taskText);
            createTaskElement(taskText, tasksArray.length - 1);
            saveTasks();
            taskInput.value = "";
        }else{
            alert("The task cannot be empty");
        }
    });

    // Handle task actions (Edit and Delete)
    taskList.addEventListener("click", function (e) {
        if (e.target.classList.contains("task-actions")) {
            const index = e.target.getAttribute("data-index");
            if (e.target.textContent === "Delete") {
                tasksArray.splice(index, 1);
                saveTasks();
                loadTasks();
            } else if (e.target.textContent === "Edit") {
                const newText = prompt("Edit task:", tasksArray[index]);
                if (newText !== null) {
                    tasksArray[index] = newText;
                    saveTasks();
                    loadTasks();
                }
            }
        }
    });

    // Load initial tasks
    loadTasks();
});