const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const dateInput = document.getElementById('due-date-input');
const taskList = document.getElementById('task-list');
const clearButton = document.getElementById('clear-tasks');
const filterButtons = document.querySelectorAll('button[data-filter]');

let tasks = [];
let currentFilter = 'all';

taskForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const taskName = taskInput.value.trim();
  const dueDate = dateInput.value;

  if (!taskName || !dueDate) {
    alert("Mohon isi semua kolom!");
    return;
  }

  const task = {
    name: taskName,
    date: dueDate,
    completed: false
  };

  tasks.push(task);
  renderTasks();
  taskForm.reset();
});

function renderTasks() {
  taskList.innerHTML = '';

  const filtered = tasks.filter(task => {
    if (currentFilter === 'active') return !task.completed;
    if (currentFilter === 'completed') return task.completed;
    return true;
  });

  if (filtered.length === 0) {
    taskList.innerHTML = '<p class="text-gray-500">Task is empty</p>';
    return;
  }

  filtered.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = 'bg-white border p-3 rounded shadow flex justify-between items-center';

    li.innerHTML = `
      <div>
        <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleComplete(${index})"/>
        <span class="ml-2 ${task.completed ? 'line-through text-gray-400' : ''}">
          ${task.name} - <small>${task.date}</small>
        </span>
      </div>
      <button onclick="deleteTask(${index})" class="bg-red-500 text-white px-3 py-1 rounded">Hapus</button>
    `;

    taskList.appendChild(li);
  });
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

clearButton.addEventListener('click', () => {
  tasks = [];
  renderTasks();
});

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    currentFilter = button.dataset.filter;
    renderTasks();
  });
});
