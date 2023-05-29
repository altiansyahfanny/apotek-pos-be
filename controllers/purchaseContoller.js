const models = require('../models');
const response = require('../helpers/responseMessage');

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

module.exports = {
	getAll,
};
