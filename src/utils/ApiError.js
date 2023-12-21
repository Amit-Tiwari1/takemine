export const ErrorResponse = (error, message = "Something went wrong") => {
  return {
    success: false,
    message: message,
    error: error,
    status: 0,
  };
};
