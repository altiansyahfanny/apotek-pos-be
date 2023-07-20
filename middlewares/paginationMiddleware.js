const { sendResponseValidationError } = require("../helpers/responseHelper");

const paginationMiddleware = (req, res, next) => {
  const per_page = parseInt(req.query.per_page);
  const current_page = parseInt(req.query.current_page);

  if (!per_page || !current_page) return sendResponseValidationError(res, "Invalid query");

  next();
};

module.exports = paginationMiddleware;
