const express = require('express');
const { invoiceContoller } = require('../controllers/index');
const validatorMiddleware = require('../middlewares/validatorMiddleware');
const { create } = require('../validator/invoiceValidator');
const response = require('../helpers/responseMessage');
const {
	sendResponseValidationError,
	sendResponseServerError,
	sendResponseSuccess,
} = require('../helpers/responseHelper');
const models = require('../models');

const router = express.Router();

router.get('/', invoiceContoller.getAll);
router.post('/', create, validatorMiddleware, invoiceContoller.create);

// TESTING ROUTE

router.get('/check', (req, res) => {
	try {
		const data = [
			{
				product_id: 1,
				expired_date: '2023-10-01',
				batch_number: '1a-gr-4u',
				total_amount: 40000,
				qty: 5,
				cashback: 5000,
			},
			{
				product_id: 2,
				expired_date: '2023-10-01',
				batch_number: '1a-gr-4u',
				total_amount: 40000,
				qty: 5,
				cashback: 5000,
			},
			{
				product_id: 2,
				expired_date: '2023-12-01',
				batch_number: '1a-gr-5u',
				total_amount: 100000,
				qty: 15,
				cashback: 0,
			},
		];

		const checkDuplicate = (array, key1, key2) => {
			const values = array.map((item) => `${item[key1]}_${item[key2]}`);
			const uniqueValues = new Set(values);
			return values.length !== uniqueValues.size;
		};

		const duplicate_products_with_the_same_batch = checkDuplicate(
			data,
			'batch_number',
			'product_id'
		);

		if (duplicate_products_with_the_same_batch) {
			return sendResponseValidationError(res, 'Pruduk dengan batch yang sama tidak boleh duplikat');
		}

		return sendResponseSuccess(
			res,
			{
				check: duplicate_products_with_the_same_batch,
			},
			201
		);
	} catch (error) {
		return sendResponseServerError(res);
	}
});
router.get('/check-product-stock', async (req, res) => {
	try {
		const data = [
			// data yang akan diupdate
			{
				product_id: 1,
				expired_date: '2023-10-01',
				batch_number: '1a-gr-4u',
				total_amount: 40000,
				qty: 5,
				cashback: 5000,
			},
			{
				product_id: 2,
				batch_number: '1a-gr-5u',
				expired_date: '2023-12-01',
				total_amount: 100000,
				qty: 15,
				cashback: 0,
			},
			// data yang akan diinsert
			{
				product_id: 2,
				expired_date: '2023-10-01',
				batch_number: '1a-gr-4u',
				total_amount: 40000,
				qty: 5,
				cashback: 5000,
			},
			{
				product_id: 1,
				expired_date: '2023-10-01',
				batch_number: '1a-gr-6u',
				total_amount: 40000,
				qty: 5,
				cashback: 5000,
			},
		];

		const checkDuplicate = (array, key1, key2) => {
			const values = array.map((item) => `${item[key1]}_${item[key2]}`);
			const uniqueValues = new Set(values);
			return values.length !== uniqueValues.size;
		};

		const duplicate_products_with_the_same_batch = checkDuplicate(
			data,
			'batch_number',
			'product_id'
		);

		// Jika terdapat kesamaan data (product_id, batch_number) antara data yang mau di insert dan data yang ada di produk_stock
		// Maka update (tambah) stock nya
		// Contohnya terjadi ketika pembelian dengan beda supplier (Beda waktu transaksi)

		// const data_product_stock = [
		// 	{ id: 2, product_id: 1, batch_number: '1a-gr-4u', qty: 5 },
		// 	{ id: 3, product_id: 2, batch_number: '1a-gr-5u', qty: 15 },
		// ];

		const data_product_stock = await models.product_stocks.findAll();

		console.log('data_product_stock : ', data_product_stock);

		function getCommonObjects(array1, array2) {
			return array1.filter((obj1) => {
				return array2.some((obj2) => {
					// Membandingkan objek berdasarkan properti yang relevan
					return obj1.product_id === obj2.product_id && obj1.batch_number === obj2.batch_number;
				});
			});
		}

		const commonObjects = getCommonObjects(data_product_stock, data);

		// Update data yang ditemukan mempunyai kesamaan (product_id & batch_number)
		if (commonObjects.length) {
			for (const row of commonObjects) {
				const { id, qty } = row;

				// Melakukan update pada baris data dengan menggunakan metode update()
				await models.product_stocks.update(
					{ qty: qty + 5 }, // Nilai baru untuk kolom yang ingin diupdate
					{ where: { id } } // Kondisi untuk memilih baris data yang akan diupdate
				);
			}
		}

		// Cek apakah panjang data.length > commonObjects.length
		// Jika true berarti ada data baru maka harus diinsert
		if (data.length > commonObjects.length) {
			function getUniqueObjects(array1, array2) {
				return array1.filter((obj1) => {
					return !array2.some((obj2) => {
						// Membandingkan objek berdasarkan properti yang relevan
						return obj1.product_id === obj2.product_id && obj1.batch_number === obj2.batch_number;
					});
				});
			}
			const rest_of_the_product_stock_form_data = getUniqueObjects(data, commonObjects);
			await models.product_stocks.bulkCreate(rest_of_the_product_stock_form_data);
			console.log('harus create : ', rest_of_the_product_stock_form_data);
		}

		// Ambil data product_stocks (data dari form) dan cari yang selain data yang sama dengan data yang sudah ada (sudah diinsert di tabel produck_stoks)

		// Jika pada saat create ada duplicate produk_id dengan bactch yang sama
		// Maka akan di tolak
		if (duplicate_products_with_the_same_batch) {
			return sendResponseValidationError(res, 'Pruduk dengan batch yang sama tidak boleh duplikat');
		}

		return sendResponseSuccess(
			res,
			{
				check: duplicate_products_with_the_same_batch,
				commonObjects,
			},
			201
		);
	} catch (error) {
		return sendResponseServerError(res);
	}
});

module.exports = router;
