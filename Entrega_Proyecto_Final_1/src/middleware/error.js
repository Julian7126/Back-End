import EErrors from "../services/error/enums.js";

export default (error, req, res, next) => {
  console.error(error);

  const status = error.status || 500;
  const message = error.message || 'Error interno del servidor';

  switch (error.code) {
    case EErrors.INVALID_TYPES_ERROR:
      res.status(400).json({
        status: 'error',
        error: error.name,
        cause: error.cause
      });
      break;
    case EErrors.DATABASES_ERROR:
      res.status(500).json({
        status: 'error',
        error: 'Error de base de datos',
        cause: error.cause
      });
      break;
    case EErrors.UNAUTHORIZED:
      res.status(401).json({
        status: 'error',
        error: 'No autorizado',
        cause: error.cause
      });
      break;
    case EErrors.NOT_OWNER:
      res.status(403).json({
        status: 'error',
        error: 'No eres el propietario',
        cause: error.cause
      });
      break;
    default:
      res.status(status).json({
        status: 'error',
        message: message
      });
  }
};
