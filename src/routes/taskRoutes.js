const express = require('express');
const router = express.Router();
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController');
const { createTaskValidators, updateTaskValidators } = require('../validators/taskValidators');
const validate = require('../middlewares/validateMiddleware');
const { protect } = require('../middlewares/authMiddleware');

router.use(protect);

router.get('/', getTasks);
router.post('/', createTaskValidators, validate, createTask);
router.put('/:id', updateTaskValidators, validate, updateTask);
router.delete('/:id', deleteTask);

module.exports = router;
