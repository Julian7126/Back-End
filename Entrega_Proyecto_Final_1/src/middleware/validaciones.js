import CustomError from '../services/error/custom_error';
import EErrors from '../services/error/enums';

export const isAdmin = async (req, res, next) => {
  try {
    const { role } = req.user;
    if (role !== 'admin') {
      throw CustomError.createError({
        name: 'Unauthorized',
        cause: 'No tiene permisos para realizar porque no eres usuario',
        message: "No puedes realizar esta accion. Unauthorized",
        code: EErrors.UNAUTHORIZED,
        status: 401
      });
    }
    next();
  } catch (err) {
    next(err);
  }
};



export const isOwner = async (req, res, next) => {
    try {
      const { cid } = req.params;
      const { cartId } = req.user;
  
      if (cid !== cartId) {
        throw CustomError.createError({
          name: 'No Usuario',
          cause: 'No eres el propietario de este carrito',
          message: "No puedes realizar esta accion",
          code: EErrors.NOT_OWNER,
          status: 401 
        });
      }
      
      next();
    } catch (err) {
      next(err);
    }
  };
  
  
  
  
  
  