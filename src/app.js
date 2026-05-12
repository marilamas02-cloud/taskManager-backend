const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Task Manager API is running' });
});

app.use('/api', authRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
