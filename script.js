document.addEventListener('DOMContentLoaded', () => {
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Load tasks from Local Storage and render them
  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks.forEach(taskText => addTask(taskText, false)); // false = don't save again
  }

  // Add task to DOM and optionally save to Local Storage
  function addTask(taskText, save = true) {
    taskText = taskText.trim();
    if (!taskText) {
      alert('Please enter a task');
      return;
    }

    // Create list item
    const li = document.createElement('li');
    li.textContent = taskText;

    // Create Remove button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'remove-btn';

    // Remove task handler
    removeBtn.onclick = () => {
      taskList.removeChild(li);
      if (save) {
        removeTaskFromStorage(taskText);
      }
    };

    li.appendChild(removeBtn);
    taskList.appendChild(li);

    // Save task to Local Storage if requested
    if (save) {
      const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      storedTasks.push(taskText);
      localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    taskInput.value = '';
  }

  // Remove task from Local Storage array
  function removeTaskFromStorage(taskText) {
    let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks = storedTasks.filter(task => task !== taskText);
    localStorage.setItem('tasks', JSON.stringify(storedTasks));
  }

  // Event listeners
  addButton.addEventListener('click', () => {
    addTask(taskInput.value);
  });

  taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      addTask(taskInput.value);
    }
  });

  // Initialize app by loading tasks
  loadTasks();
});
