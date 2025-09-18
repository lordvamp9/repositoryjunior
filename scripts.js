console.log("Script loaded");

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Load tasks on page load
document.addEventListener('DOMContentLoaded', function() {
    renderTasks();
});

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    if (taskText === '') {
        alert('Please enter a task.');
        return;
    }
    tasks.push({ text: taskText, completed: false });
    saveTasks();
    renderTasks();
    taskInput.value = '';
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        
        const taskText = document.createElement('span');
        taskText.className = 'task-text';
        taskText.textContent = task.text;
        taskText.onclick = () => toggleTask(index);
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = (e) => {
            e.stopPropagation(); // Prevent triggering toggle
            if (confirm('Are you sure you want to delete this task?')) {
                deleteTask(index);
            }
        };
        
        li.appendChild(taskText);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}