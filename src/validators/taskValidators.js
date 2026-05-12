const { body } = require('express-validator');

const createTaskValidators = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('El título es requerido'),

  body('description')
    .trim()
    .notEmpty()
    .withMessage('La descripción es requerida'),

  body('dueDate')
    .notEmpty()
    .withMessage('La fecha de vencimiento es requerida')
    .isISO8601()
    .withMessage('La fecha de vencimiento debe ser una fecha válida')
    .toDate(),
];

const updateTaskValidators = [
  body('title')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('El título no puede estar vacío'),

  body('description')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('La descripción no puede estar vacía'),

  body('dueDate')
    .optional()
    .isISO8601()
    .withMessage('La fecha de vencimiento debe ser una fecha válida')
    .toDate(),

  body('completed')
    .optional()
    .isBoolean()
    .withMessage('El campo completado debe ser un booleano'),
];

module.exports = { createTaskValidators, updateTaskValidators };
