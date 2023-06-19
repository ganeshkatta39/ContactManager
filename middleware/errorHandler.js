const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.json({
        title: "VALIDATION FAILED",
        message: err.message,
        stackTrace: err.stackTrace,
      });
      break;
    case constants.UNAUTHORIZED:
      res.json({
        title: "Unauthorised",
        message: err.message,
        stackTrace: err.stackTrace,
      });
      break;
    case constants.FORBIDDEN:
      res.json({
        title: "Forbidden",
        message: err.message,
        stackTrace: err.stackTrace,
      });
      break;
    case constants.NOT_FOUND:
      res.json({
        title: "not_Found",
        message: err.message,
        stackTrace: err.stackTrace,
      });
      break;
    case constants.SERVER_ERROR:
      res.json({
        title: "SERVER ERROR",
        message: err.message,
        stackTrace: err.stackTrace,
      });
      break;
    default:
      console.log("no error all good");
  }
};
