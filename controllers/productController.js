const models = require('../models');
const { sequelize } = require('../models');
const { sendResponseSuccess, sendResponseServerError } = require('../helpers/responseHelper');

const getAll = async (req, res) => {
	try {
		const products = await models.products.findAll({
			include: [
				{ model: models.product_categories },
				{ model: models.product_statuses },
				{ model: models.product_units },
				{ model: models.purchases },
				{ model: models.product_stocks },
				{ model: models.racks, include: [{ model: models.warehouses }] },
				{
					model: models.other_product_units,
					include: [
						{ model: models.product_units },
						{
							model: models.products,
							attributes: ['name'],
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
			const total_amount_from_purchase = product.purchases.reduce(
				(sum, purchase) => sum + purchase.total_amount,
				0
			);
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

module.exports = {
	getAll,
	create,
};
