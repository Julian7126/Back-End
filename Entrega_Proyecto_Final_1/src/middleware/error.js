import EErrors from "../services/error/enums.js";

export default (error, req, res, next) => {
  console.error(error);

  const status = error.status || 500;
  const message = error.message || 'Error interno del servidor';

  switch (error.code) {
    case EErrors.INVALID_TYPES_ERROR:
      return res.status(400).json({
        status: 'error',
        error: error.name,
        cause: error.cause
      });
    case EErrors.DATABASES_ERROR:
      return res.status(500).json({
        status: 'error',
        error: 'Error de base de datos',
        cause: error.cause
      });
    case EErrors.UNAUTHORIZED:
      return res.status(401).json({
        status: 'error',
        error: 'No autorizado',
        cause: error.cause
      });
    default:
      return res.status(status).json({
        status: 'error',
        message: message
      });
      case EErrors.NOT_OWNER:
      return res.status(403).json({
        status: 'error',
        error: 'No eres el propietario',
        cause: error.cause
  });
  }
};
