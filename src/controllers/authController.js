const { registerUser, loginUser } = require('../services/authService');

const register = async (req, res, next) => {
  try {
    const { name, lastname, email, password } = req.body;
    const result = await registerUser({ name, lastname, email, password });

    res.status(201).json({ success: true, ...result });
  } catch (error) {
    res.status(error.statusCode || 500);
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await loginUser({ email, password });

    res.status(200).json({ success: true, ...result });
  } catch (error) {
    res.status(error.statusCode || 500);
    next(error);
  }
};

module.exports = { register, login };
