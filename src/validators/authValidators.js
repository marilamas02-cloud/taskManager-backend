const { body } = require('express-validator');

const registerValidators = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('El nombre es requerido'),

  body('lastname')
    .trim()
    .notEmpty()
    .withMessage('El apellido es requerido'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('El email es requerido')
    .isEmail()
    .withMessage('Debe ser un email válido')
    .normalizeEmail(),

  body('password')
    .notEmpty()
    .withMessage('La contraseña es requerida')
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener al menos 6 caracteres'),
];

const loginValidators = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('El email es requerido')
    .isEmail()
    .withMessage('Debe ser un email válido')
    .normalizeEmail(),

  body('password')
    .notEmpty()
    .withMessage('La contraseña es requerida'),
];

module.exports = { registerValidators, loginValidators };
