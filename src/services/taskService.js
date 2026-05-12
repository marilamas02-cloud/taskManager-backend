const Task = require('../models/Task');

const getUserTasks = async (userId) => {
  return Task.find({ user: userId }).sort({ createdAt: -1 });
};

const createTask = async (userId, taskData) => {
  return Task.create({ ...taskData, user: userId });
};

const updateTask = async (taskId, userId, updates) => {
  const task = await Task.findOne({ _id: taskId, user: userId });
  if (!task) return null;

  Object.assign(task, updates);
  return task.save();
};

const deleteTask = async (taskId, userId) => {
  const task = await Task.findOne({ _id: taskId, user: userId });
  if (!task) return null;

  await task.deleteOne();
  return task;
};

module.exports = { getUserTasks, createTask, updateTask, deleteTask };
