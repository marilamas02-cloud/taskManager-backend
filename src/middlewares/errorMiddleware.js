// ─── 404 – Ruta no encontrada ─────────────────────────────────────────────────
const notFound = (req, res, next) => {
  const error = new Error(`Ruta no encontrada: ${req.method} ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// ─── Manejador global de errores ──────────────────────────────────────────────
const errorHandler = (err, req, res, next) => {
  // Si el status sigue en 200, el error es inesperado → 500
  let statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  let message    = err.message || 'Error interno del servidor';

  // MongoDB: ID con formato inválido (p. ej. /api/tasks/abc)
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 400;
    message    = 'ID de recurso inválido';
  }

  // MongoDB: campo único duplicado (p. ej. email ya registrado)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'campo';
    statusCode  = 409;
    message     = `El valor del campo '${field}' ya está en uso`;
  }

  // Mongoose: errores de validación de schema
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message    = Object.values(err.errors).map((e) => e.message).join(', ');
  }

  // JWT: token inválido o mal formado
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message    = 'Token inválido';
  }

  // JWT: token expirado
  if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message    = 'Token expirado, por favor inicia sesión de nuevo';
  }

  res.status(statusCode).json({
    success: false,
    message,
    // Stack trace solo en desarrollo para no exponer internos en producción
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

module.exports = { notFound, errorHandler };
