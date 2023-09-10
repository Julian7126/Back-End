export default class UserDTO {
    constructor(user) {
      if (!user?.first_name) {
        throw new Error("El primer nombre es requerido.");
      }
      if (!user?.last_name) {
        throw new Error("El apellido es requerido.");
      }
      if (!user?.email) {
        throw new Error("El email es requerido.");
      }
      if (!user?.password) {
        throw new Error("La contraseña es requerida.");
      }
  
      this.first_name = user.first_name;
      this.last_name = user.last_name;
      this.age = user?.age ?? 0;
      this.email = user.email;
      this.cartId = user?.cartId ?? null;
      this.password = user.password;
      this.role = user?.role ?? 'user';
    }
  }
  