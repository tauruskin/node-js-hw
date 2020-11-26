exports.UnauthorisedError = class UnauthorisedError extends Error {
  constructor(message) {
    super(message);
    this.status = 401;
  }
};