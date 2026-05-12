const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { registerValidators, loginValidators } = require('../validators/authValidators');
const validate = require('../middlewares/validateMiddleware');

router.post('/register', registerValidators, validate, register);
router.post('/login', loginValidators, validate, login);

module.exports = router;
