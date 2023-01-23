// app.get('/api/v1/tasks )         - get all the tasks
// app.post('/api/v1/tasks)         - create a new task
// app.get('/api/v1/taks/:id)       - get single task
// app.patch('/api/v1/taks/:id)     - update task
// app.delete('./api/v1/tasks/:id)  -delete task

const { json } = require("express");
const Task = require("../models/Task");

const getAllTasks = async (req, res) => {
  const task = await Task.find({})
  res.status(201).json({task});
};
const createNewTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    console.log(req.body)
    res.status(201).json({task});
    
  } catch (error) {
    console.log(error)
  }
};
const getSingleTask = async (req, res) => {
  const {id} = req.params
  const task = await Task.findById(id);
  res.status(201).json({task});
};
const deleteTask = async (req, res) => {
  const {id} = req.params
  const task = await Task.findByIdAndDelete(id);
  res.status(201).json({task});
};
const updateTask = async (req, res) => {
  const {id} = req.params
  const task = await Task.findByIdAndUpdate(id,req.body,{
    new:true,
    runValidators:true,
  })
  res.status(201).json({task});
};

module.exports = {
  getAllTasks,
  createNewTask,
  getSingleTask,
  updateTask,
  deleteTask,
};
