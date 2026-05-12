const taskService = require('../services/taskService');

const getTasks = async (req, res, next) => {
  try {
    const tasks = await taskService.getUserTasks(req.user._id);
    res.json({ success: true, data: tasks });
  } catch (error) {
    next(error);
  }
};

const createTask = async (req, res, next) => {
  try {
    const { title, description, dueDate } = req.body;
    const task = await taskService.createTask(req.user._id, { title, description, dueDate });
    res.status(201).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const { title, description, dueDate, completed } = req.body;
    const updates = {};
    if (title !== undefined) updates.title = title;
    if (description !== undefined) updates.description = description;
    if (dueDate !== undefined) updates.dueDate = dueDate;
    if (completed !== undefined) updates.completed = completed;

    const task = await taskService.updateTask(req.params.id, req.user._id, updates);
    if (!task) {
      return res.status(404).json({ success: false, message: 'Tarea no encontrada' });
    }
    res.json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const task = await taskService.deleteTask(req.params.id, req.user._id);
    if (!task) {
      return res.status(404).json({ success: false, message: 'Tarea no encontrada' });
    }
    res.json({ success: true, message: 'Tarea eliminada exitosamente' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };
