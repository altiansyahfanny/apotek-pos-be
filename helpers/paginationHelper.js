const { sendResponseEmptyData } = require("./responseHelper");

const getQueryUrl = (req) => {
  const per_page = parseInt(req.query.per_page);
  const current_page = parseInt(req.query.current_page);

  return { per_page, current_page };
};

const getTotalData = async ({ model, condition }) => {
  const total_data = await model.count({ where: condition });
  return total_data;
};

const getAllData = async ({ req, model, assoc, condition }) => {
  const { per_page, current_page } = getQueryUrl(req);

  const total_data = await getTotalData({ model, condition });
  if (total_data < 1) return { data: [], per_page, current_page, total_data: 0 };

  const data = await model.findAll({
    include: assoc,
    order: [["id", "DESC"]],
    limit: per_page,
    offset: (current_page - 1) * per_page,
    where: condition,
  });

  return { data, per_page, current_page, total_data };
};

module.exports = {
  getQueryUrl,
  getTotalData,
  getAllData,
};
