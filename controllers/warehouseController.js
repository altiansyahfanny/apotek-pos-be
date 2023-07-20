const models = require("../models");
const { sendResponseSuccess, sendResponseServerError } = require("../helpers/responseHelper");

const getAll = async (req, res) => {
  try {
    const result = await models.warehouses.findAll();
    return sendResponseSuccess(res, result);
  } catch (error) {
    return sendResponseServerError(res, error);
  }
};

// manipulation

const create = async (req, res) => {
  const data = req.body;

  try {
    const result = await models.warehouses.create(data);
    return sendResponseSuccess(res, result, 201);
  } catch (error) {
    return sendResponseServerError(res, error);
  }
};

module.exports = {
  getAll,
  create,
};
