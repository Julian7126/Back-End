export default class UserDTO {
    constructor(user) {
      if (!user?.email) {
        throw new Error("El email es requerido.");
      }
      if (!user?.password) {
        throw new Error("La contraseña es requerida.");
      }
  
    
      this.email = user.email;
      this.cartId = user?.cartId ?? null;
      this.password = user.password;
      this.role = user?.role ?? 'user';
    }
  }
  