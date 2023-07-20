const models = require("../models");
const response = require("../helpers/responseMessage");
const { sendResponseServerError, sendResponseSuccess, sendResponseWithPagination, sendResponseEmptyData, sendResponseInvalidParameter } = require("../helpers/responseHelper");
const { getAllData } = require("../helpers/paginationHelper");
const { Op } = require("sequelize");

const getAll = async (req, res) => {
  try {
    const result = await models.concoctions.findAll({
      include: [
        { model: models.product_units },
        {
          model: models.product_concoctions,
          include: [
            { model: models.product_units },
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
    });
    response.successFetching(res, result);
  } catch (error) {
    response.error(res, error);
  }
};

const getWithPagination = async (req, res) => {
  const key_search = req.query.key_search ?? "";

  try {
    const condition = { name: { [Op.like]: `%${key_search}%` } };
    const { data, per_page, current_page, total_data } = await getAllData({
      req,
      model: models.concoctions,
      assoc: [
        { model: models.product_units },
        {
          model: models.product_concoctions,
          include: [
            { model: models.product_units },
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
      condition,
    });

    if (total_data < 1) return sendResponseEmptyData(res);

    return sendResponseWithPagination(res, { data, per_page, current_page, total_data });
  } catch (error) {
    return sendResponseServerError(res, error);
  }
};

// manipulation

const createProductConcoction = async (t, concoction_id, product_concoctions) => {
  const data = product_concoctions.map((product) => ({
    ...product,
    concoction_id,
  }));
  await models.product_concoctions.bulkCreate(data, {
    transaction: t,
  });
};

const create = async (req, res) => {
  const data = req.body;

  const t = await models.sequelize.transaction();

  try {
    const result = await models.concoctions.create(data, {
      transaction: t,
    });

    await createProductConcoction(t, result.id, data.product_concoctions);

    await t.commit();
    return sendResponseSuccess(res, result, 201);
  } catch (error) {
    console.log("error :", error);
    await t.rollback();
    return sendResponseServerError(res, error);
  }
};

const destroy = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await models.concoctions.findByPk(id);

    if (!data) return sendResponseInvalidParameter(res);

    const result = await data.destroy();

    return sendResponseSuccess(res, result);
  } catch (error) {
    return sendResponseServerError(res);
  }
};

const manipulationProductConcoctios = async ({ transaction, concoction_id, product_concoctions }) => {
  for (const product_concoction of product_concoctions) {
    if (product_concoction.is_delete) {
      await models.product_concoctions.destroy({ where: { id: product_concoction.id, concoction_id }, transaction });
    } else if (product_concoction.is_edit) {
      await models.product_concoctions.update({ ...product_concoction }, { where: { id: product_concoction.id, concoction_id }, transaction });
    } else {
      await models.product_concoctions.create({ ...product_concoction, concoction_id }, { transaction });
    }
  }
};

const update = async (req, res) => {
  const data = req.body;

  const transaction = await models.sequelize.transaction();
  try {
    const result = await models.concoctions.update(data, { where: { id: data.id }, transaction });
    await manipulationProductConcoctios({ transaction, concoction_id: data.id, product_concoctions: data.product_concoctions });

    await transaction.commit();
    return sendResponseSuccess(res, result, 201);
  } catch (error) {
    console.log("error : ", error);

    await transaction.rollback();
    return sendResponseServerError(res, error);
  }
};

module.exports = {
  getAll,
  create,
  getWithPagination,
  destroy,
  update,
};
