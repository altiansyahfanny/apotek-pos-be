const models = require("../models");
const response = require("../helpers/responseMessage");
const { sendResponseServerError, sendResponseSuccess } = require("../helpers/responseHelper");

const getAll = async (req, res) => {
  try {
    const result = await models.product_units.findAll();
    response.successFetching(res, result);
  } catch (error) {
    response.error(res, error);
  }
};

const create = async (req, res) => {
  const data = req.body;

  try {
    const result = await models.product_units.create(data);
    return sendResponseSuccess(res, result, 201);
  } catch (error) {
    return sendResponseServerError(res, error);
  }
};

module.exports = {
  getAll,
  create,
};
