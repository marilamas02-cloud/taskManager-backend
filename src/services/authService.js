const User = require('../models/User');
const generateToken = require('../utils/generateToken');

const registerUser = async ({ name, lastname, email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const error = new Error('El email ya está registrado');
    error.statusCode = 409;
    throw error;
  }

  const user = await User.create({ name, lastname, email, password });

  const token = generateToken(user._id);

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
    },
  };
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.comparePassword(password))) {
    const error = new Error('Email o contraseña incorrectos');
    error.statusCode = 401;
    throw error;
  }

  const token = generateToken(user._id);

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
    },
  };
};

module.exports = { registerUser, loginUser };
