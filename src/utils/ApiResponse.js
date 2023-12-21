export const apiResponse = (data = null, message = "Success") => {
  return {
    success: true,
    message: message,
    data: data,
    status: 1,
  };
};
