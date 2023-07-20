const models = require("../models");
const { getAllData } = require("../helpers/paginationHelper");
const { sendResponseEmptyData, sendResponseWithPagination, sendResponseServerError } = require("../helpers/responseHelper");

const getProductSalesWithPaginationByProductId = async (req, res) => {
  const { id } = req.params;
  try {
    const condition = { product_id: id };
    const { data, per_page, current_page, total_data } = await getAllData({
      req,
      model: models.product_sales,
      assoc: [{ model: models.product_units }, { model: models.products, attributes: ["name"] }, { model: models.sales, include: [{ model: models.customers, attributes: ["name"] }] }],
      condition,
    });

    if (total_data < 1) return sendResponseEmptyData(res);

    return sendResponseWithPagination(res, { data, per_page, current_page, total_data });
  } catch (error) {
    console.log(error);

    return sendResponseServerError(res, error);
  }
};

module.exports = {
  getProductSalesWithPaginationByProductId,
};
