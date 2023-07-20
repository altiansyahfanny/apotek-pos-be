const sendResponse = (res, statusCode, msg, isError, data) => {
  res.status(statusCode).json({
    message: msg,
    is_error: isError,
    data,
  });
};

const sendResponseSuccess = (res, data = [], statuCode = 200) => {
  res.status(statuCode).json({
    message: "Success",
    is_error: false,
    data,
  });
};

const sendResponseWithPagination = (res, rest) => {
  res.status(200).json({
    message: "Success",
    ...rest,
  });
};

const sendResponseServerError = (res, data = []) => {
  res.status(500).json({
    message: "Failed to prosess request",
    is_error: true,
    data,
  });
};

const sendResponseEmptyData = (res) => {
  res.status(404).json({
    message: "No data found!",
    is_error: true,
  });
};

const sendResponseInvalidParameter = (res) => {
  res.status(404).json({
    message: "No data found! Invalid parameter.",
    is_error: true,
  });
};

const sendResponseValidationError = (res, msg) => {
  res.status(400).json({
    message: msg,
    is_error: true,
  });
};

module.exports = {
  sendResponse,
  sendResponseSuccess,
  sendResponseServerError,
  sendResponseInvalidParameter,
  sendResponseValidationError,
  sendResponseWithPagination,
  sendResponseEmptyData,
};
