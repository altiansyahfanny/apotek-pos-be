const { check } = require('express-validator');

const create = [
	check('product_category_id').trim().notEmpty().withMessage('Kategori Produk tidak boleh kosong'),
	check('product_unit_id').custom((value, { req }) => {
		const product_category_id = req.body.product_category_id;
		if (product_category_id != 2 && value.trim() === '') {
			throw new Error('Satuan Produk tidak boleh kosong');
		}
		return true;
	}),
	check('product_status_id').trim().notEmpty().withMessage('Status Produk tidak boleh kosong'),
	check('capital_price')
		.trim()
		.custom((value, { req }) => {
			const product_category_id = req.body.product_category_id;
			if (product_category_id != 2) {
				if (value === '' || value < 1) {
					throw new Error('Harga Produk/Modal tidak boleh kosong');
				}
			}
			return true;
		}),
	check('price')
		.trim()
		.notEmpty()
		.withMessage('Harga Jual tidak boleh kosong')
		.isInt({ min: 1 })
		.withMessage('Harga Jual tidak boleh kosong, minimal 1'),

	check('name').trim().notEmpty().withMessage('Nama Produk tidak boleh kosong'),
	check('sku_code').trim().notEmpty().withMessage('Kode Produk (SKU) tidak boleh kosong'),
	check('barcode').trim().notEmpty().withMessage('Barcode tidak boleh kosong'),

	check('other_product_units.*.product_unit_id').notEmpty().withMessage('Tidak boleh kosong'),
	check('other_product_units.*.number_of_other_product_units').isInt({ min: 1 }),
	check('other_product_units.*.number_of_product_units').isInt({ min: 1 }),
	check('alternative_prices.*.alternative_price_category_id').isInt({ min: 1 }),
	check('alternative_prices.*.minimum_item').isInt({ min: 1 }),
	check('alternative_prices.*.price').isInt({ min: 1 }),
];

module.exports = { create };
