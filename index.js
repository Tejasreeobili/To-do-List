document.addEventListener('DOMContentLoaded', () => {
  const taskForm = document.getElementById('todo-form');
  const taskList = document.getElementById('task-list');
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  function saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function renderTasks() {
      taskList.innerHTML = '';
      tasks.forEach((task, index) => {
          const listItem = document.createElement('li');
          listItem.innerHTML = `
              <div class="task-details">
                  <strong>${task.name}</strong><br>
                  Due: ${task.dueDate} | Priority: ${task.priority} | Category: ${task.category}
              </div>
              <div class="task-actions">
                  <button class="edit" onclick="editTask(${index})">Edit</button>
                  <button class="delete" onclick="deleteTask(${index})">Delete</button>
              </div>
          `;
          taskList.appendChild(listItem);
      });
  }

  taskForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const task = {
          name: document.getElementById('task-name').value,
          dueDate: document.getElementById('due-date').value,
          priority: document.getElementById('priority-level').value,
          category: document.getElementById('task-category').value
      };
      tasks.push(task);
      saveTasks();
      renderTasks();
      taskForm.reset();
  });

  window.deleteTask = (index) => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
  };

  window.editTask = (index) => {
      const task = tasks[index];
      document.getElementById('task-name').value = task.name;
      document.getElementById('due-date').value = task.dueDate;
      document.getElementById('priority-level').value = task.priority;
      document.getElementById('task-category').value = task.category;
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
  };

  renderTasks();
});
