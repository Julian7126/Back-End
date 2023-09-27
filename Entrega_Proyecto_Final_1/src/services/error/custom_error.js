class CustomError extends Error {
    constructor({ name, cause, message, code, status }) {
      super(message);
      this.name = name;
      this.cause = cause;
      this.code = code;
      this.status = status;
    }

    static createError(options) {
      return new CustomError(options);
    }
}

export default CustomError;
