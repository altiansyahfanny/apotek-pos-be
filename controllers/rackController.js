const models = require('../models');
const response = require('../helpers/responseMessage');

const getAll = async (req, res) => {
	try {
		const result = await models.racks.findAll({
			include: [{ model: models.warehouses }],
		});
		response.successFetching(res, result);
	} catch (error) {
		response.error(res, error);
	}
};

module.exports = {
	getAll,
};
