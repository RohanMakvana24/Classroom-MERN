import HTTP_Response from "../utils/HttpResponse.js";

// ☘︎ Global Error Handler ☘︎ //
const HandleGlobalError = (err, req, res, next) => {
  const error = {
    ...err,
  };
  error.message = err.message;
  console.log(err);

  // ☘︎ Mongose BadObjectID ☘︎ //
  if ((err.name = "CastError")) {
    const message = "Resource is not found";
    error = new HTTP_Response(400, message);
  }

  // ☘︎ Mongoose Dublicate key ☘︎ //
  if (err.code == 11000) {
    const message = "Dublicate field value entered";
    error = new HTTP_Response(409, message);
  }

  // ☘︎ Mongoose Validation ☘︎ //
  if (err.name === "ValidationError") {
    const message = [];
    Object.values(err.errors).forEach((errr) => {
      message.push({
        field: errr.properties.path,
        message: errr.message,
      });
    });
    error = new HTTP_Response(400, message);
  }

  // ☘︎ Response Send ☘︎ //
  res.status(error.statusCode || 500).json({
    success: false,
    message: error.messageWithField || error.message || "Server Side Error",
  });
};

export default HandleGlobalError;
