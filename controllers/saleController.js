const models = require("../models");
const {
  sendResponseSuccess,
  sendResponseServerError,
  sendResponseInvalidParameter,
  sendResponseEmptyData,
  sendResponseWithPagination,
  sendResponseValidationError,
} = require("../helpers/responseHelper");
const { Op } = require("sequelize");
const moment = require("moment");

const getAll = async (req, res) => {
  const per_page = parseInt(req.query.per_page);
  const current_page = parseInt(req.query.current_page);

  const start_date = moment(req.query.start_date, "DD-MM-YYYY").toDate();
  const end_date = moment(req.query.end_date, "DD-MM-YYYY").toDate();
  end_date.setHours(23, 59, 59, 999);

  if (!per_page || !current_page) return sendResponseValidationError(res, "Invalid query");

  // return res.status(200).json({ per_page, current_page, start_date, end_date });

  try {
    const total_data = await models.sales.count({
      where: {
        status: { [Op.ne]: 3 }, // !== Pending
        date: { [Op.gte]: start_date, [Op.lte]: end_date },
      },
    });

    if (total_data < 1) return sendResponseEmptyData(res);

    const data = await models.sales.findAll({
      include: [
        { model: models.customers },
        {
          model: models.product_sales,
          include: [
            { model: models.products, attributes: ["name"] },
            { model: models.product_units, attributes: ["name"] },
          ],
        },
      ],
      order: [["id", "DESC"]],
      limit: per_page,
      offset: (current_page - 1) * per_page,
      where: {
        status: { [Op.ne]: 3 }, // !== pending
        date: { [Op.between]: [start_date, end_date] },
      },
    });
    return sendResponseWithPagination(res, { data, per_page, current_page, total_data });
  } catch (error) {
    return sendResponseServerError(res, error);
  }
};

const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await models.sales.findOne({
      include: [
        { model: models.customers },
        {
          model: models.product_sales,
          include: [
            { model: models.products, attributes: ["name"] },
            { model: models.product_units, attributes: ["name"] },
          ],
        },
      ],
      where: { id },
    });

    return sendResponseSuccess(res, data);
  } catch (error) {
    console.log(error);

    return sendResponseServerError(res, error);
  }
};

const getPendingSale = async (req, res) => {
  try {
    const result = await models.sales.findAll({
      include: [
        { model: models.customers },
        {
          model: models.product_sales,
          include: [
            {
              model: models.products,
              include: [
                { model: models.product_units },
                { model: models.product_stocks },
                {
                  model: models.other_product_units,
                  include: [
                    { model: models.product_units },
                    {
                      model: models.products,
                      attributes: ["name"],
                      include: [{ model: models.product_units }],
                    },
                  ],
                },
                {
                  model: models.alternative_prices,
                  include: [{ model: models.alternative_price_categories }],
                },
              ],
            },
          ],
        },
      ],
      where: {
        status: 3, // pending
      },
    });
    if (result.length < 1 || !result) return sendResponseEmptyData(res);
    return sendResponseSuccess(res, result);
  } catch (error) {
    return sendResponseServerError(res, error);
  }
};

// manipulation

const createProductSales = async (t, sale_id, products) => {
  const data = products.map((product) => ({
    ...product,
    sale_id,
  }));
  await models.product_sales.bulkCreate(data, {
    transaction: t,
  });
};

const updateProductStocks = async (t, products, decrement = true) => {
  for (const product of products) {
    // mengambil data stok sebelumnya
    const product_stock = await models.product_stocks.findOne({
      where: {
        id: product.product_stock_id,
      },
    });
    const new_qty = decrement ? product_stock.qty - product.total_qty : product_stock.qty + product.total_qty;

    // Melakukan update pada tabel product_stocks
    await models.product_stocks.update(
      {
        qty: parseInt(new_qty),
      }, // Nilai baru untuk kolom yang ingin diupdate
      {
        where: {
          id: product.product_stock_id,
        },
        transaction: t,
      } // Kondisi untuk memilih baris data yang akan diupdate
    );
  }
};

const create = async (req, res) => {
  const data = req.body;

  const t = await models.sequelize.transaction();

  try {
    const result = await models.sales.create(data, {
      transaction: t,
    });

    await createProductSales(t, result.id, data.products);
    if (data.status !== 3) {
      await updateProductStocks(t, data.products);
    }

    await t.commit();
    return sendResponseSuccess(res, result, 201);
  } catch (error) {
    console.log("error :", error);
    await t.rollback();
    return sendResponseServerError(res, error);
  }
};

const updateAndCreateProductSales = async (t, sale_id, products) => {
  for (const product of products) {
    if (product.is_pending) {
      await models.product_sales.update(
        { ...product },
        {
          where: {
            product_id: product.product_id,
            sale_id,
          },
          transaction: t,
        }
      );
    } else {
      await models.product_sales.create(
        { ...product, sale_id },
        {
          transaction: t,
        }
      );
    }
  }
};

const updatePendingSale = async (req, res) => {
  const data = req.body;

  const t = await models.sequelize.transaction();

  try {
    const result = await models.sales.update(data, {
      where: { id: data.id },
      transaction: t,
    });

    await updateProductStocks(t, data.products);
    await updateAndCreateProductSales(t, data.id, data.products);

    await t.commit();
    return sendResponseSuccess(res, result, 201);
  } catch (error) {
    console.log("error :", error);
    await t.rollback();
    return sendResponseServerError(res, error);
  }
};

const deletePendingSale = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await models.sales.findByPk(id);

    if (!data) {
      return sendResponseInvalidParameter(res);
    }

    const result = await data.destroy();

    return sendResponseSuccess(res, result);
  } catch (error) {
    return sendResponseServerError(res);
  }
};

const deleteSale = async (req, res) => {
  const id = req.params.id;

  const t = await models.sequelize.transaction();
  try {
    const sale = await models.sales.findByPk(id, {
      attributes: ["id"],
      include: [
        {
          model: models.product_sales,
          attributes: ["id", "product_stock_id", "total_qty"],
        },
      ],
    });

    const products = sale.product_sales;

    const response = await models.sales.update({ status: 4 }, { where: { id }, transaction: t });
    await updateProductStocks(t, products, false);

    await t.commit();
    return sendResponseSuccess(res, response);
  } catch (error) {
    await t.rollback();
    return sendResponseServerError(res);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  getPendingSale,
  updatePendingSale,
  deletePendingSale,
  deleteSale,
};
