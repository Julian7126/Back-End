import CustomError from '../services/error/custom_error';
import EErrors from '../services/error/enums';

export const isAdmin = async (req, res, next) => {
  const { role } = req.user;
  if (role !== 'admin') {
    next(
      CustomError.createError({
        name: 'Unauthorized',
        cause: 'No tiene permisos para realizar porque no eres usuario',
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
  
  
  
  
  