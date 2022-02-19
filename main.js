// Selectors
const taskInput = document.querySelector('.task-input');
const taskButton = document.querySelector('.task-button');
const taskList = document.querySelector('.task-list');

//Event Listeners
document.addEventListener('DOMContentLoaded', getTasks); // once DOM loaded, run
taskButton.addEventListener('click', addTask);
taskList.addEventListener('click', removePress);
taskList.addEventListener('click', checkPress);

//Functions
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
    } else {
        newTask.innerText = taskInput.value;
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
    }
}

// when check, toggle to checked
function checkPress(e) {
    const item = e.target;
    if (item.classList[0] === 'check-button') {
        const task = item.parentElement;
        task.classList.toggle("checked");
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
        // add task to tasklist
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
    localStorage.setItem('tasks', JSON.stringify(tasks));
}