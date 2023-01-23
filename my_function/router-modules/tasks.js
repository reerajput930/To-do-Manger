const express = require("express");
const router = express.Router();
const {
  getAllTasks,
  createNewTask,
  getSingleTask,
  updateTask,
  deleteTask,
} = require("../controller/tasks");

// router.get("/", getAllTasks);

router.route('/').get(getAllTasks).post(createNewTask)
router.route('/:id').get(getSingleTask).patch(updateTask).delete(deleteTask)

module.exports = router;
 // app.get('/api/v1/tasks )         - get all the tasks
// app.post('/api/v1/tasks)         - create a new task
// app.get('/api/v1/taks/:id)       - get single task
// app.patch('/api/v1/taks/:id)     - update task
// app.delete('./api/v1/tasks/:id)  -delete task