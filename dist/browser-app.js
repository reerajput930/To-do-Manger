// app.get('/api/v1/tasks )         - get all the tasks
// app.post('/api/v1/tasks)         - create a new task
// app.get('/api/v1/taks/:id)       - get single task
// app.patch('/api/v1/taks/:id)     - update task
// app.delete('./api/v1/tasks/:id)  -delete task

console.log("inside the logic");
const tasksDOM = document.querySelector(".tasks");
const loadingDOM = document.querySelector(".loading-text");
const formDOM = document.querySelector(".task-form");
const taskInputDOM = document.querySelector(".task-input");
const formAlertDOM = document.querySelector(".form-alert");

const clicked = async (taskID) => {
  let statusCompleted;
  console.log(taskID);
  const taskFetch = await axios.get(`/api/v1/tasks/${taskID}`);
  let { completed } = taskFetch.data.task;
  console.log(completed);
  if (completed) {
    console.log("i am true");
    completed = false;
    console.log(completed);
  } else {
    console.log("i am false");
    completed = true;
    console.log(completed);
  }
  statusCompleted = completed;
  console.log(statusCompleted);

  await axios.patch(`/api/v1/tasks/${taskID}`, {
    completed: statusCompleted,
  });

  showTasks();
};

// Load tasks from /api/tasks
const showTasks = async () => {
  // loadingDOM.style.visibility = "visible";
  const tasks = await axios.get("/api/v1/tasks");
  const arrayTask = tasks.data.task;
  console.log(arrayTask);
  if (arrayTask.length < 1) {
    tasksDOM.innerHTML = '<h5 class="empty-list">No tasks in your list</h5>';
    loadingDOM.style.visibility = "hidden";
    return;
  }
  const allTasks = arrayTask
    .map((task) => {
      const { completed, _id: taskID, name } = task;
      return `<div class="single-task ${completed && "task-completed"}">
  <h5><span><i class="far fa-check-circle"></i></span>${name}</h5>
  <div class="task-links">
  
  
  
  <!-- edit link -->
  <a   onclick="clicked('${taskID}')" class="edit-link">
  <i class="fas fa-edit"></i> 
  </a>
  <!-- delete btn -->
  <button type="button" class="delete-btn" data-id="${taskID}">
  <i class="fas fa-trash"></i>
  </button>
  </div>
  </div>`; 
    })
    .join("");
  tasksDOM.innerHTML = allTasks;

  // loadingDOM.style.visibility = "hidden";
};

showTasks();

// delete task /api/tasks/:id
tasksDOM.addEventListener("click", async (e) => {
  const el = e.target;
  if (el.parentElement.classList.contains("delete-btn")) {
    loadingDOM.style.visibility = "visible";
    const id = el.parentElement.dataset.id;
    console.log(id);
    try {
      await axios.delete(`/api/v1/tasks/${id}`);
      showTasks();
    } catch (error) {
      console.log(error);
    }
  }
  loadingDOM.style.visibility = "hidden";
});
// form
formDOM.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = taskInputDOM.value;

  try {
    await axios.post("/api/v1/tasks", { name });
    showTasks();
    taskInputDOM.value = "";
    formAlertDOM.style.display = "block";
    // formAlertDOM.textContent = `success, task added`;
    formAlertDOM.classList.add("text-success");
  } catch (error) {
    formAlertDOM.style.display = "block";
    formAlertDOM.innerHTML = `error, please try again`;
  }
});
