// Selectors
const taskInput = document.querySelector('.task-input');
const taskButton = document.querySelector('.task-button');
const taskList = document.querySelector('.task-list');
const headerButton = document.querySelector('.head-button');

// Event Listeners
document.addEventListener('DOMContentLoaded', getTasks); // once DOM loaded, run
headerButton.addEventListener('click', changeHeader);
taskButton.addEventListener('click', addTask);
taskList.addEventListener('click', removePress);
taskList.addEventListener('click', checkPress);

// Functions

// Record of tasks and checked tasks
const tasksRecord = [];
const checkedTasksRecord = [];

// click to look at the date
function changeHeader(e) {
    const txt = e.target;
    if (txt.innerText === "To Do List") {
        var d = new Date();
        var date = d.getDate();
        var month = d.getMonth() + 1;
        var year = d.getFullYear();
        txt.innerText = month + "/" + date + "/" + year;
    } else {
        txt.innerText = "To Do List";
    }
}

// add a task to the list
function addTask(e) {
    // prevents from refreshing upon button press
    e.preventDefault();
    // create div: each div is new task with its own buttons
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task')
    // create li
    const newTask = document.createElement('li');
    if (taskInput.value == "") {
        alert("Add a task!")
        return
    }
    // check if already existing task
    if (tasksRecord.includes(taskInput.value)) {
        taskInput.value = "";
        alert("You already know about this task!")
        return
    } 
    
    else {
        newTask.innerText = taskInput.value;
        tasksRecord.push(taskInput.value);
    }
    newTask.classList.add('task-item');
    taskDiv.appendChild(newTask); // add task to taskDiv

    // save task to storage
    save(taskInput.value);

    // check button
    const checkButton = document.createElement('button');
    checkButton.innerHTML = '<i class="fas fa-check"></i>'
    checkButton.classList.add("check-button");
    taskDiv.appendChild(checkButton); // add button to taskDiv
    // remove button
    const removeButton = document.createElement('button');
    removeButton.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    removeButton.classList.add("remove-button");
    taskDiv.appendChild(removeButton); // add to taskDiv
    // add task to tasklist
    taskList.appendChild(taskDiv);
    // clear text field after adding task
    taskInput.value = "";
}

// when remove, remove from tasks
function removePress(e) {
    const item = e.target;
    if (item.classList[0] === 'remove-button') {
        const task = item.parentElement;
        task.classList.add("fall"); // animation for deleting
        // remove after transition # MUST be 'transitionend'
        task.addEventListener('transitionend', function() { 
            removeFromStorage(task);
            task.remove();
        })

        const taskIndex = task.children[0].innerText;
        tasksRecord.splice(tasksRecord.indexOf(taskIndex), 1);
    }
}

// when check, toggle to checked
function checkPress(e) {
    const item = e.target;
    if (item.classList[0] === 'check-button') {
        const task = item.parentElement;
        task.classList.toggle("checked");
        const taskText = task.children[0].innerText;
        saveAsChecked(taskText);
        // save as checked to local storage
        localStorage.setItem("tasks-checked", JSON.stringify(checkedTasksRecord));

    }
}

function saveAsChecked(task) {
    if (! checkedTasksRecord.includes(task)) {
        checkedTasksRecord.push(task);
    } else {
        checkedTasksRecord.splice(checkedTasksRecord.indexOf(task), 1);
        localStorage.setItem("tasks-checked", JSON.stringify(checkedTasksRecord));
    }
}

// get all tasks
function getTasks() {
    let tasks;
    // if there is no storage
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        // if there is already storage
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    
    // also load in checked-tasks
    let tasksChecked = JSON.parse(localStorage.getItem('tasks-checked')) || [];
    
    //add tasks from storage
    tasks.forEach(function(task) {
        // create div: each div is new task with its own buttons
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task')
        // create li
        const newTask = document.createElement('li');
        newTask.innerText = task;
        newTask.classList.add('task-item');
        taskDiv.appendChild(newTask); // add task to taskDiv

        // check button
        const checkButton = document.createElement('button');
        checkButton.innerHTML = '<i class="fas fa-check"></i>'
        checkButton.classList.add("check-button");
        taskDiv.appendChild(checkButton); // add button to taskDiv
        // remove button
        const removeButton = document.createElement('button');
        removeButton.innerHTML = '<i class="fa-solid fa-xmark"></i>'
        removeButton.classList.add("remove-button");
        taskDiv.appendChild(removeButton); // add to taskDiv

        // checked if it was checked task
        if (tasksChecked.includes(task)) {
            taskDiv.classList.toggle("checked");
            saveAsChecked(task);
        }

        // add task to tasklist
        tasksRecord.push(task);
        taskList.appendChild(taskDiv);
    })
}

// save to local storage
function save(task) {
    let tasks;
    // if there is no storage
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        // if there is already storage
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// remove from local storage
function removeFromStorage(task) {
    let tasks;
    // if there is no storage
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        // if there is already storage
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    const taskIndex = task.children[0].innerText;
    tasks.splice(tasks.indexOf(taskIndex), 1); // second param: how many to remove
    tasksRecord.splice(tasksRecord.indexOf(taskIndex), 1);
    checkedTasksRecord.splice(checkedTasksRecord.indexOf(taskIndex), 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
