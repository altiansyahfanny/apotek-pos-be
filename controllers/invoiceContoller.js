const { sequelize } = require('../models');
const models = require('../models');
const response = require('../helpers/responseMessage');
const {
	sendResponseValidationError,
	sendResponseSuccess,
	sendResponseServerError,
} = require('../helpers/responseHelper');

const getAll = async (req, res) => {
	try {
		const result = await models.invoices.findAll({
			include: [
				{
					model: models.purchases,
					include: [
						{ model: models.products, attributes: ['name', 'id'] },
						{ model: models.product_units, attributes: ['name', 'id'] },
					],
				},
				{
					model: models.warehouses,
				},
				{
					model: models.suppliers,
				},
			],
		});
		response.successFetching(res, result);
	} catch (error) {
		response.error(res, error);
	}
};

const insertToInvoices = async (data, transaction) => {
	const result = await models.invoices.create(data, { transaction });
	return result;
};

const insertToPurchases = async (products, invoice_id, transaction) => {
	const data = products.map((product) => ({ ...product, invoice_id }));
	const result = await models.purchases.bulkCreate(data, { transaction });
	return result;
};

const insertUpdateToProductStoks = async (products, transaction) => {
	const getCommonObjects = (array1, array2) => {
		return array1.filter((obj1) => {
			return array2.some((obj2) => {
				// Membandingkan objek berdasarkan properti yang relevan
				return obj1.product_id === obj2.product_id && obj1.batch_number === obj2.batch_number;
			});
		});
	};

	const getUniqueObjects = (array1, array2) => {
		return array1.filter((obj1) => {
			return !array2.some((obj2) => {
				// Membandingkan objek berdasarkan properti yang relevan
				return obj1.product_id === obj2.product_id && obj1.batch_number === obj2.batch_number;
			});
		});
	};

	// start

	// ambil data product stock di db
	const data_product_stock = await models.product_stocks.findAll();

	// cari apakah ada data (objek) yang sama antara data dari form dengan data yang ada di db (dengan ketentuan product_id dan batch_number nya sama)
	const commonObjects = getCommonObjects(data_product_stock, products);

	// Update data yang ditemukan mempunyai kesamaan (product_id & batch_number)
	if (commonObjects.length) {
		for (const row of commonObjects) {
			const { id, qty, product_id, batch_number } = row;
			const { qty: new_qty } = products.find((product) => {
				return product.product_id === product_id && product.batch_number === batch_number;
			});

			await models.product_stocks.update(
				{ qty: qty + parseInt(new_qty) }, // Nilai baru untuk kolom yang ingin diupdate
				{ where: { id }, transaction: transaction } // Kondisi untuk memilih baris data yang akan diupdate
			);
		}
	}

	// Cek apakah panjang data.length > commonObjects.length
	// Jika true berarti ada data baru maka harus diinsert
	if (products.length > commonObjects.length) {
		const rest_of_the_product_stock_form_data = getUniqueObjects(products, commonObjects);
		await models.product_stocks.bulkCreate(rest_of_the_product_stock_form_data);
	}
};

const checkDuplicate = (array, key1, key2) => {
	const values = array.map((item) => `${item[key1]}_${item[key2]}`);
	const uniqueValues = new Set(values);
	return values.length !== uniqueValues.size;
};

const validation = (res, products) => {};

const create = async (req, res) => {
	// console.log('req : ', req.body);
	const data = req.body;
	const { products } = data;

	if (![...products].length) {
		return sendResponseValidationError(res, 'Produk tidak boleh kosong');
	}

	// VALIDASI FORM PRODUCT
	// cek apakah user menginput duplikat produk dengan ketentuan product_id dan batch_number nya sama
	const duplicate_products_with_the_same_batch = checkDuplicate(
		products,
		'batch_number',
		'product_id'
	);

	// jika ada duplikat maka beri error
	if (duplicate_products_with_the_same_batch) {
		// await transaction.rollback();
		return sendResponseValidationError(res, 'Pruduk dengan batch yang sama tidak boleh duplikat');
	}
	// END VALIDASI PRUDUCT

	const transaction = await sequelize.transaction();
	try {
		// invoice
		const invoicesResult = await insertToInvoices(data, transaction);

		// purchase
		const purchasesResult = await insertToPurchases(products, invoicesResult.id, transaction);

		// product_stock
		await insertUpdateToProductStoks(products, transaction);

		await transaction.commit();
		return sendResponseSuccess(res, { invoicesResult, purchasesResult }, 201);
	} catch (error) {
		await transaction.rollback();
		console.log('error : ', error);
		return sendResponseServerError(res, error);
	}
};

module.exports = {
	getAll,
	create,
};
