const models = require("../models");
const response = require("../helpers/responseMessage");
const { getAllData } = require("../helpers/paginationHelper");
const { sendResponseEmptyData, sendResponseWithPagination, sendResponseServerError } = require("../helpers/responseHelper");

const getAll = async (req, res) => {
  try {
    const result = await models.purchases.findAll({
      include: [{ model: models.invoices }],
    });
    response.successFetching(res, result);
  } catch (error) {
    response.error(res, error);
  }
};

const getPurchasesWithPaginationByProductId = async (req, res) => {
  const { id } = req.params;
  try {
    const condition = { product_id: id };
    const {
      data: purchases,
      per_page,
      current_page,
      total_data,
    } = await getAllData({
      req,
      model: models.purchases,
      assoc: [{ model: models.product_units }, { model: models.products, attributes: ["name"] }, { model: models.invoices, include: [{ model: models.suppliers, attributes: ["name"] }] }],
      condition,
    });

    if (total_data < 1) return sendResponseEmptyData(res);

    return sendResponseWithPagination(res, { data: purchases, per_page, current_page, total_data });
  } catch (error) {
    console.log(error);

    return sendResponseServerError(res, error);
  }
};

module.exports = {
  getAll,
  getPurchasesWithPaginationByProductId,
};
