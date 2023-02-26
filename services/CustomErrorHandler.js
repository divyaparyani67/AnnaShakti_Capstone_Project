class CustomErrorHandler extends Error {
  costructor(status, msg) {
    //super();
    this.status = status;
    this.message = msg;
  }
  static alreadyExist(message) {
    return new CustomErrorHandler(409, message);
  }
  static wrongCredentials(message = "Username or password is wrong") {
    return new CustomErrorHandler(401, message);
  }
  static unAuthorized(message = "unAuthorized") {
    return new CustomErrorHandler(401, message);
  }
  static notFound(message = "404 notFound") {
    return new CustomErrorHandler(404, message);
  }
}
export default CustomErrorHandler;