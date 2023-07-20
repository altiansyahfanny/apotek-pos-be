const models = require("../models");
const { sendResponseSuccess, sendResponseServerError, sendResponseEmptyData, sendResponseWithPagination } = require("../helpers/responseHelper");
const { getAllData } = require("../helpers/paginationHelper");
const { Op } = require("sequelize");

const getAll = async (req, res) => {
  try {
    const result = await models.suppliers.findAll();
    return sendResponseSuccess(res, result);
  } catch (error) {
    return sendResponseServerError(res, error);
  }
};

const getWithPagination = async (req, res) => {
  const key_search = req.query.key_search ?? "";

  try {
    const condition = { name: { [Op.like]: `%${key_search}%` } };
    const { data, per_page, current_page, total_data } = await getAllData({
      req,
      model: models.suppliers,
      assoc: [],
      condition,
    });

    if (total_data < 1) return sendResponseEmptyData(res);

    return sendResponseWithPagination(res, { data, per_page, current_page, total_data });
  } catch (error) {
    return sendResponseServerError(res, error);
  }
};

// manipulation

const create = async (req, res) => {
  const data = req.body;

  try {
    const result = await models.suppliers.create(data);
    return sendResponseSuccess(res, result, 201);
  } catch (error) {
    return sendResponseServerError(res, error);
  }
};

const update = async (req, res) => {
  const data = req.body;

  try {
    const result = await models.suppliers.update(data, { where: { id: data.id } });
    return sendResponseSuccess(res, result, 201);
  } catch (error) {
    console.log("error : ", error);
    return sendResponseServerError(res, error);
  }
};

module.exports = {
  getAll,
  create,
  getWithPagination,
  update,
};
