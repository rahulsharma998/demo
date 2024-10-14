let tasks = [];
let searchQuery = '';
let filterCriteria = 'all';
const viewSelect = document.getElementById('viewSelect'); 
const listView = document.getElementById('listView'); 
const kanbanView = document.getElementById('kanbanView'); 
const calendarView = document.getElementById('calendarView'); 
const graphView = document.getElementById('graphView'); 

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
viewSelect.addEventListener('change', updateViews); 

function updateViews() { 
    const selectedView = viewSelect.value; 
    
    listView.style.display = 'none'; 
    kanbanView.style.display = 'none'; 
    calendarView.style.display = 'none'; 
    graphView.style.display = 'none'; 

    if (selectedView === 'list') {
        listView.style.display = 'block'; 
        renderListView(); 
    } else if (selectedView === 'kanban') { 
        kanbanView.style.display = 'block'; 
        renderKanbanView(); 
    } else if (selectedView === 'calendar') { 
        calendarView.style.display = 'block'; 
        renderCalendarView(); 
    } else if (selectedView === 'graph') { 
        graphView.style.display = 'block'; 
        renderGraphView(); 
    }
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
    searchQuery = document.getElementById("searchInput").value.toLowerCase();
    displayTask();
}

function resetInputFields() {
    document.getElementById("taskInput").value = "";
    document.getElementById("taskDescriptionInput").value = "";
    document.getElementById("assignedUserInput").value = "";
    document.getElementById("dueDateInput").value = "";
    document.getElementById("priorityInput").value = "Low";
}
function renderKanbanView() { 
    kanbanView.innerHTML = '<h2>Kanban View (To be implemented)</h2>'; 
}

function renderCalendarView() { 
    calendarView.innerHTML = '<h2>Calendar View (To be implemented)</h2>'; 
}

function renderGraphView() { 
    graphView.innerHTML = '<h2>Graph View (To be implemented)</h2>'; 
}

const tasks = [
    { id: 1, title: "Task 1", status: "todo", dueDate: "2024-10-10", completed: false },
    { id: 2, title: "Task 2", status: "inprogress", dueDate: "2024-10-12", completed: false },
    { id: 3, title: "Task 3", status: "done", dueDate: "2024-10-15", completed: true }
];

const viewSelect = document.getElementById('view-select');
const views = document.getElementsByClassName('view-container');

viewSelect.addEventListener('change', function () {
    Array.from(views).forEach(view => view.style.display = 'none');
    document.getElementById(`${viewSelect.value}-view`).style.display = 'block';
});

function populateListView() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.innerText = `${task.title} (Due: ${task.dueDate})`;
        taskList.appendChild(li);
    });
}
populateListView();

function populateKanbanView() {
    const todoColumn = document.getElementById('todo-column');
    const inProgressColumn = document.getElementById('inprogress-column');
    const doneColumn = document.getElementById('done-column');


    todoColumn.innerHTML = '';
    inProgressColumn.innerHTML = '';
    doneColumn.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.innerText = task.title;
        li.draggable = true;
        li.addEventListener('dragstart', handleDragStart);
        li.dataset.taskId = task.id;

        if (task.status === 'todo') {
            todoColumn.appendChild(li);
        } else if (task.status === 'inprogress') {
            inProgressColumn.appendChild(li);
        } else if (task.status === 'done') {
            doneColumn.appendChild(li);
        }
    });
}
populateKanbanView();

let draggedTaskId = null;

function handleDragStart(event) {
    draggedTaskId = event.target.dataset.taskId;
}

document.querySelectorAll('.kanban-column-list').forEach(column => {
    column.addEventListener('dragover', event => event.preventDefault());
    column.addEventListener('drop', handleDrop);
});

function handleDrop(event) {
    const columnId = event.target.id;
    const task = tasks.find(t => t.id == draggedTaskId);
    
    if (columnId === 'todo-column') {
        task.status = 'todo';
    } else if (columnId === 'inprogress-column') {
        task.status = 'inprogress';
    } else if (columnId === 'done-column') {
        task.status = 'done';
    }

    populateKanbanView();
}

function populateCalendarView() {
    const calendarEl = document.getElementById('calendar');
    calendarEl.innerHTML = '';  

    tasks.forEach(task => {
        const div = document.createElement('div');
        div.innerText = `${task.title} - Due: ${task.dueDate}`;
        calendarEl.appendChild(div);
    });
}
populateCalendarView();
function populateGraphView() {
    const ctx = document.getElementById('task-progress-chart').getContext('2d');
    
    const completedTasks = tasks.filter(t => t.completed).length;
    const inProgressTasks = tasks.filter(t => t.status === 'inprogress').length;
    const todoTasks = tasks.filter(t => t.status === 'todo').length;

    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['To Do', 'In Progress', 'Completed'],
            datasets: [{
                data: [todoTasks, inProgressTasks, completedTasks],
                backgroundColor: ['#ff6384', '#36a2eb', '#4caf50']
            }]
        }
    });
}
populateGraphView();
