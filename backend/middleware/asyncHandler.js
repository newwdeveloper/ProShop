const asyncHandler = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next); // Execute the function
    } catch (error) {
      next(error); // Pass error to Express error handler
    }
  };
};

export default asyncHandler;
