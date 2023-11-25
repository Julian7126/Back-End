import CustomError from '../services/error/custom_error.js';
import EErrors from '../services/error/enums.js';

export const isAdminPremium = async (req, res, next) => {
  const { role } = req.user;
  if (role !== 'admin' || role !=='premium' ) {
    next(
      CustomError.createError({
        name: 'Unauthorized',
        cause: 'No tiene permisos para realizar porque no eres admin , ni tampoco usuario premium',
        message: "No puedes realizar esta acción. Unauthorized",
        code: EErrors.UNAUTHORIZED,
        status: 401
      })
    );
    return;
  }
  next();
};

export const isOwner = async (req, res, next) => {
  const { cid } = req.params;
  const { cartId } = req.user;

  if (cid !== cartId) {
    next(
      CustomError.createError({
        name: 'No Usuario',
        cause: 'No eres el propietario de este carrito',
        message: "No puedes realizar esta acción",
        code: EErrors.NOT_OWNER,
        status: 401
      })
    );
    return;
  }

  next();
};
  
  
  
export const isAdmin = async (req, res, next) => {
  const { role } = req.user;
  if (role !== 'admin') {
    next(
      CustomError.createError({
        name: 'Unauthorized',
        cause: 'No tienes permisos para realizar esta acción porque no eres admin ,no podras modificar el rol , ni tampoco eliminar usuarios',
        message: "No puedes realizar esta acción. Unauthorized",
        code: EErrors.UNAUTHORIZED,
        status: 401
      })
    );
    return;
  }
  next();
};