const models = require("../models");
const { sequelize } = require("../models");
const { sendResponseSuccess, sendResponseServerError, sendResponseWithPagination, sendResponseEmptyData, sendResponseInvalidParameter } = require("../helpers/responseHelper");
const { Op } = require("sequelize");
const { getAllData } = require("../helpers/paginationHelper");

const getAll = async (req, res) => {
  try {
    const result = await models.prescriptions.findAll({
      include: [{ model: models.doctors }, { model: models.customers }, { model: models.prescription_details }],
    });

    return sendResponseSuccess(res, result);
  } catch (error) {
    console.log(error);

    return sendResponseServerError(res, error);
  }
};

const getWithPagination = async (req, res) => {
  const key_search = req.query.key_search ?? "";

  try {
    const condition = { id: { [Op.like]: `%${key_search}%` } };
    const { data, per_page, current_page, total_data } = await getAllData({
      req,
      model: models.prescriptions,
      assoc: [{ model: models.doctors }, { model: models.customers }, { model: models.prescription_details }],
      condition,
    });

    if (total_data < 1) return sendResponseEmptyData(res);

    return sendResponseWithPagination(res, { data, per_page, current_page, total_data });
  } catch (error) {
    console.log(error);

    return sendResponseServerError(res, error);
  }
};

const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await models.prescriptions.findOne({
      include: [{ model: models.doctors }, { model: models.customers }, { model: models.prescription_details }],
      where: { id },
    });

    return sendResponseSuccess(res, result);
  } catch (error) {
    console.log(error);

    return sendResponseServerError(res, error);
  }
};

const insertToPrescriptionDetails = async (prescription_id, prescription_details, transaction) => {
  const data = prescription_details.map((prescription_detail) => ({ ...prescription_detail, prescription_id }));
  const result = await models.prescription_details.bulkCreate(data, { transaction });
  return result;
};

const create = async (req, res) => {
  const data = req.body;
  const transaction = await sequelize.transaction();
  try {
    const result = await models.prescriptions.create(data, { transaction });
    await insertToPrescriptionDetails(result.id, data.prescription_details, transaction);
    await await transaction.commit();
    return sendResponseSuccess(res, result, 201);
  } catch (error) {
    await transaction.rollback();
    return sendResponseServerError(res, error);
  }
};

const destroy = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await models.prescriptions.findByPk(id);

    if (!data) return sendResponseInvalidParameter(res);

    const result = await data.destroy();

    return sendResponseSuccess(res, result);
  } catch (error) {
    return sendResponseServerError(res);
  }
};

const manipulationPrescriptionDetails = async ({ transaction, prescription_id, prescription_details }) => {
  for (const prescription_detail of prescription_details) {
    if (prescription_detail.is_delete) {
      await models.prescription_details.destroy({ where: { id: prescription_detail.id, prescription_id }, transaction });
    } else if (prescription_detail.is_edit) {
      await models.prescription_details.update({ ...prescription_detail }, { where: { id: prescription_detail.id, prescription_id }, transaction });
    } else {
      await models.prescription_details.create({ ...prescription_detail, prescription_id }, { transaction });
    }
  }
};

const update = async (req, res) => {
  const data = req.body;

  const transaction = await sequelize.transaction();
  try {
    const result = await models.prescriptions.update(data, { where: { id: data.id }, transaction });
    await manipulationPrescriptionDetails({ transaction, prescription_id: data.id, prescription_details: data.prescription_details });

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
  getById,
  getWithPagination,
  destroy,
  update,
};
