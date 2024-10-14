let tasks = [];
let searchQuery = '';
let filterCriteria = 'all';
let notificationsEnabled = true;
let darkModeEnabled = false;

function addTask() {
    let taskText = document.getElementById("taskInput").value;
    let taskDescription = document.getElementById("taskDescriptionInput").value;
    let assignedTo = document.getElementById("assignedUserInput").value;
    let dueDate = document.getElementById("dueDateInput").value;
    let priority = document.getElementById("priorityInput").value;
    let creationDate = new Date();

    if (taskText) {
        const due = new Date(dueDate);
        if (due < creationDate) {
            alert("Due date must be in the future.");
            return;
        }

        tasks.push({
            text: taskText,
            description: taskDescription,
            completed: false,
            assignedTo: assignedTo,
            dueDate: due,
            priority: priority,
            creationDate: creationDate
        });
        displayTask();
        resetInputFields();
    } else {
        alert("Please enter a task");
    }
}

function displayTask() {
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = '';

    let tasksToDisplay = tasks.filter(task => {
        return (
            (filterCriteria === 'all' || 
            (filterCriteria === 'completed' && task.completed) || 
            (filterCriteria === 'incomplete' && !task.completed)) &&
            (searchQuery === '' || task.text.toLowerCase().includes(searchQuery))
        );
    });

    for (let i = 0; i < tasksToDisplay.length; i++) {
        let li = document.createElement("li");
        appendTaskElements(li, tasksToDisplay[i], i);
        taskList.appendChild(li);
    }
}

function appendTaskElements(li, task, index) {
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed; 
    checkbox.onclick = function () {
        toggleTaskCompletion(index);
    };

    let taskText = document.createElement("span");
    taskText.textContent = task.text; 
    taskText.style.textDecoration = task.completed ? "line-through" : "none"; 

    let taskDescription = document.createElement("p");
    taskDescription.textContent = task.description;  
    taskDescription.style.fontStyle = 'italic'; 

    let assignedUserText = document.createElement("span");
    assignedUserText.textContent = " (Assigned To: " + task.assignedTo + ")"; 

    let editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.onclick = function () {
        editTask(index);
    };

    let priorityText = document.createElement("span");
    priorityText.textContent = " (Priority: " + task.priority + ")"; 

    let dueDateText = document.createElement("span");
    dueDateText.textContent = " (Due: " + task.dueDate.toLocaleDateString() + ")"; 

    let removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.onclick = function () {
        removeTask(index);
    };

    li.appendChild(checkbox);
    li.appendChild(taskText);
    li.appendChild(taskDescription);
    li.appendChild(priorityText);
    li.appendChild(dueDateText);
    li.appendChild(assignedUserText);
    li.appendChild(editButton);
    li.appendChild(removeButton);
}

function toggleTaskCompletion(index) {
    tasks[index].completed = !tasks[index].completed;
    displayTask();
}

function removeTask(index) {
    tasks.splice(index, 1);
    displayTask();
}

function editTask(index) {
    let newTask = prompt("Edit your task:", tasks[index].text);
    let newDescription = prompt("Edit task description:", tasks[index].description);
    
    if (newTask != null && newTask.trim() !== "") {
        tasks[index].text = newTask;
    }
    
    if (newDescription != null && newDescription.trim() !== "") {
        tasks[index].description = newDescription;
    }

    displayTask();
}

function sortTasks() {
    let criteria = document.getElementById("sortCriteria").value;
    tasks.sort((a, b) => {
        switch (criteria) {
            case 'priority':
                const priorityOrder = { 'Low': 1, 'Medium': 2, 'High': 3 };
                return priorityOrder[b.priority] - priorityOrder[a.priority];
            case 'dueDate':
                return new Date(a.dueDate) - new Date(b.dueDate);
            case "alphabetical":
                return a.text.localeCompare(b.text);
            case 'creationDate':
                return new Date(a.creationDate) - new Date(b.creationDate);
            default:
                return 0;
        }
    });
    displayTask();
}

function filterTasks() {
    filterCriteria = document.getElementById("filterCriteria").value;
    displayTask();
}

function searchTasks() {
    searchQuery = document.getElementById('navbarSearchInput').value.toLowerCase();
    displayTask();
}

function resetInputFields() {
    document.getElementById("taskInput").value = "";
    document.getElementById("taskDescriptionInput").value = "";
    document.getElementById("assignedUserInput").value = "";
    document.getElementById("dueDateInput").value = "";
    document.getElementById("priorityInput").value = "Low";
}
function toggleDarkMode() {
    darkModeEnabled = !darkModeEnabled;
    document.body.classList.toggle('dark-mode', darkModeEnabled);
}
// Function to toggle notifications
function toggleNotifications() {
    notificationsEnabled = !notificationsEnabled;
    alert(notificationsEnabled ? "Notifications ON" : "Notifications OFF");
}
// Functions to show different views
function showListView() {
    document.getElementById('viewContainer').innerHTML = '<ul id="taskList"></ul>';
    displayTask(); // Show tasks in list view
}

function showKanbanView() {
    document.getElementById('viewContainer').innerHTML = generateKanbanView();
}

function showGraphView() {
    document.getElementById('viewContainer').innerHTML = '<div id="graphContainer"></div>';
    displayGraph(); // Function to render graph
}

function showCalendarView() {
    document.getElementById('viewContainer').innerHTML = '<div id="calendarContainer"></div>';
    displayCalendar(); // Function to render calendar
}

// Function to generate a basic Kanban view
function generateKanbanView() {
    const kanbanView = `
        <div class="kanban-board">
            <div class="kanban-column">
                <h3>To Do</h3>
                <ul id="todoTasks"></ul>
            </div>
            <div class="kanban-column">
                <h3>In Progress</h3>
                <ul id="inProgressTasks"></ul>
            </div>
            <div class="kanban-column">
                <h3>Completed</h3>
                <ul id="completedTasks"></ul>
            </div>
        </div>
    `;
    
    // Add tasks to respective Kanban columns
    setTimeout(() => { 
        displayKanbanTasks(); 
    }, 0); // Delayed to ensure HTML is rendered before adding tasks

    return kanbanView;
}

// Function to display tasks in Kanban columns
function displayKanbanTasks() {
    const todoTasks = document.getElementById('todoTasks');
    const inProgressTasks = document.getElementById('inProgressTasks');
    const completedTasks = document.getElementById('completedTasks');

    tasks.forEach(task => {
        let li = document.createElement("li");
        li.textContent = task.text;
        if (task.completed) {
            completedTasks.appendChild(li);
        } else {
            todoTasks.appendChild(li); // In reality, you'd have in-progress logic
        }
    });
}

// Placeholder functions for Graph and Calendar (to be implemented)
function displayGraph() {
    document.getElementById('graphContainer').innerHTML = '<p>Graph view will be implemented here.</p>';
}

function displayCalendar() {
    document.getElementById('calendarContainer').innerHTML = '<p>Calendar view will be implemented here.</p>';
}
