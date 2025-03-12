const notFound = (req, res, next) => {
  const error = new Error(`Not Found-${req.originalURL}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  /*Why is 500 assigned when res.statusCode === 200?
    In an Express app, res.statusCode is usually set before sending a response.
    When an error occurs, the status code should not be 200 (which means "OK").
    If the status is still 200 at this point, it means something went wrong but wasn't caught earlier.
    So, we override it with 500 (which means "Internal Server Error") to indicate a failure.*/
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;
  //check mongoose bad object id
  if (err.name === "CastError" && err.kind === "ObjectId") {
    message = "Resource Not Found";
    statusCode = 404;
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "production" ? "00" : err.stack,
  });
};

export { notFound, errorHandler };
