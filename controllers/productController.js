const models = require("../models");
const { sequelize } = require("../models");
const { sendResponseSuccess, sendResponseServerError, sendResponseWithPagination } = require("../helpers/responseHelper");
const { Op } = require("sequelize");
const { getAllData } = require("../helpers/paginationHelper");

const getAll = async (req, res) => {
  try {
    const products = await models.products.findAll({
      include: [
        { model: models.product_categories },
        { model: models.product_statuses },
        { model: models.product_units },
        { model: models.product_stocks },
        { model: models.purchases },
        { model: models.racks, include: [{ model: models.warehouses }] },
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
    });

    const data = products.map((product) => {
      const stock_amount = product.product_stocks.reduce((sum, stock) => sum + stock.qty, 0);
      const total_amount_from_purchase = product.purchases.reduce((sum, purchase) => sum + purchase.total_amount, 0);
      const selling_price = total_amount_from_purchase / stock_amount;
      return {
        ...product.get({ plain: true }),
        // capital_price: product.capital_price,
        stock_amount,
        total_amount_from_purchase,
        selling_price,
      };
    });

    return sendResponseSuccess(res, data);
  } catch (error) {
    console.log(error);

    return sendResponseServerError(res, error);
  }
};

const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await models.products.findOne({
      include: [
        { model: models.product_categories },
        { model: models.product_stocks },
        { model: models.purchases },
        { model: models.racks, include: [{ model: models.warehouses }] },
        {
          model: models.alternative_prices,
          include: [{ model: models.alternative_price_categories }],
        },
      ],
      where: { id },
    });

    const stock_amount = product.product_stocks.reduce((sum, stock) => sum + stock.qty, 0);
    const total_amount_from_purchase = product.purchases.reduce((sum, purchase) => sum + purchase.total_amount, 0);
    const selling_price = total_amount_from_purchase / stock_amount;

    const data = {
      ...product.get({ plain: true }),
      stock_amount,
      total_amount_from_purchase,
      selling_price,
    };

    return sendResponseSuccess(res, data);
  } catch (error) {
    console.log(error);

    return sendResponseServerError(res, error);
  }
};

const getProductPurchasesWithPaginationById = async (req, res) => {
  const { id } = req.params;
  try {
    const condition = { id };
    const {
      data: products,
      per_page,
      current_page,
      total_data,
    } = await getAllData({
      req,
      model: models.products,
      assoc: [{ model: models.purchases }],
      condition,
    });

    if (total_data < 1) return sendResponseEmptyData(res);

    return sendResponseWithPagination(res, { products, per_page, current_page, total_data });
  } catch (error) {
    console.log(error);

    return sendResponseServerError(res, error);
  }
};

const getWithPagination = async (req, res) => {
  const key_search = req.query.key_search ?? "";

  try {
    const condition = { name: { [Op.like]: `%${key_search}%` } };
    const {
      data: products,
      per_page,
      current_page,
      total_data,
    } = await getAllData({
      req,
      model: models.products,
      assoc: [
        { model: models.product_categories },
        { model: models.product_statuses },
        { model: models.product_units },
        { model: models.product_stocks },
        { model: models.product_sales },
        { model: models.purchases },
        { model: models.racks, include: [{ model: models.warehouses }] },
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
      condition,
    });

    if (total_data < 1) return sendResponseEmptyData(res);

    const data = products.map((product) => {
      const stock_amount = product.product_stocks.reduce((sum, stock) => sum + stock.qty, 0);
      const total_amount_from_purchase = product.purchases.reduce((sum, purchase) => sum + purchase.total_amount, 0);
      const total_amount_from_sale = product.product_sales.reduce((sum, product_sales) => sum + product_sales.total, 0);
      const selling_price = (total_amount_from_purchase - total_amount_from_sale) / stock_amount;
      return {
        ...product.get({ plain: true }),
        stock_amount,
        total_amount_from_purchase,
        selling_price,
      };
    });

    return sendResponseWithPagination(res, { data, per_page, current_page, total_data });
  } catch (error) {
    console.log(error);

    return sendResponseServerError(res, error);
  }
};

// manipulation

const create = async (req, res) => {
  const data = req.body;
  const transaction = await sequelize.transaction();
  try {
    const product = await models.products.create(data, {
      include: [
        {
          model: models.alternative_prices,
        },
        {
          model: models.other_product_units,
        },
      ],
    });
    await transaction.commit();
    return sendResponseSuccess(res, product, 201);
  } catch (error) {
    await transaction.rollback();
    return sendResponseServerError(res, error);
  }
};

const manipulationOtherProductUnits = async ({ transaction, product_id, other_product_units }) => {
  for (const other_product_unit of other_product_units) {
    if (other_product_unit.is_delete) {
      await models.other_product_units.destroy({ where: { id: other_product_unit.id, product_id }, transaction });
    } else if (other_product_unit.is_edit) {
      await models.other_product_units.update({ ...other_product_unit }, { where: { id: other_product_unit.id, product_id }, transaction });
    } else {
      await models.other_product_units.create({ ...other_product_unit, product_id }, { transaction });
    }
  }
};

const manipulationAlternativePricess = async ({ transaction, product_id, alternative_prices }) => {
  for (const alternative_price of alternative_prices) {
    if (alternative_price.is_delete) {
      await models.alternative_prices.destroy({ where: { id: alternative_price.id, product_id }, transaction });
    } else if (alternative_price.is_edit) {
      await models.alternative_prices.update({ ...alternative_price }, { where: { id: alternative_price.id, product_id }, transaction });
    } else {
      await models.alternative_prices.create({ ...alternative_price, product_id }, { transaction });
    }
  }
};

const update = async (req, res) => {
  const data = req.body;
  const transaction = await sequelize.transaction();
  try {
    const product = await models.products.update(data, { where: { id: data.id }, transaction });
    await manipulationOtherProductUnits({ transaction, product_id: data.id, other_product_units: data.other_product_units });
    await manipulationAlternativePricess({ transaction, product_id: data.id, alternative_prices: data.alternative_prices });
    await transaction.commit();
    return sendResponseSuccess(res, product, 201);
  } catch (error) {
    await transaction.rollback();
    return sendResponseServerError(res, error);
  }
};

module.exports = {
  getAll,
  create,
  update,
  getWithPagination,
  getById,
  getProductPurchasesWithPaginationById,
};
