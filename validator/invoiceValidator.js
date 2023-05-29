const { check } = require('express-validator');

const create = [
	check('invoice_number').trim().notEmpty().withMessage('Nomor Faktur tidak boleh kosong'),
	check('order_letter_number')
		.trim()
		.notEmpty()
		.withMessage('Nomor Surat Pesanan tidak boleh kosong'),
	check('supplier_id').trim().notEmpty().withMessage('Supplier tidak boleh kosong'),
	check('payment_method').trim().notEmpty().withMessage('Jenis Pembayaran tidak boleh kosong'),
	check('due_date').custom((value, { req }) => {
		const payment_method = req.body.payment_method;
		if (payment_method === 'Kredit' && value.trim() === '') {
			throw new Error('Jatuh Tempo Pembayaran tidak boleh kosong untuk Jenis Pembayaran "Kredit"');
		}
		return true;
	}),
	check('payment_account').custom((value, { req }) => {
		const payment_method = req.body.payment_method;
		if (payment_method === 'Tunai' && value === '') {
			throw new Error(
				'Akun Pembayaran Pembayaran tidak boleh kosong untuk Jenis Pembayaran "Tunai"'
			);
		}
		return true;
	}),
	// check('tax').trim().notEmpty().withMessage('Harga Beli tidak boleh kosong').isInt({ min: 1 }),
	check('tax').custom((value, { req }) => {
		const tax_category = req.body.tax_category;
		if (tax_category != 1) {
			if (value === '' || value < 1) {
				throw new Error('Pajak tidak boleh kosong untuk Jenis Pembayaran "Belum/Sudah"');
			}
		}
		return true;
	}),
	check('receipt_date').trim().notEmpty().withMessage('Tanggal Terima Barang tidak boleh kosong'),
	check('date').trim().notEmpty().withMessage('Tanggal Faktur Terima Barang tidak boleh kosong'),
	check('warehouse_id')
		.trim()
		.notEmpty()
		.withMessage('Gudang Penerima Barang Terima Barang tidak boleh kosong'),
	check('total_amount')
		.trim()
		.notEmpty()
		.withMessage('Total tidak boleh kosong')
		.isNumeric()
		.withMessage('Total Harga harus berupa angka'),
	check('products.*.expired_date')
		.trim()
		.notEmpty()
		.withMessage('Tanggal Kadaluarsa tidak boleh kosong'),

	check('products.*.batch_number').notEmpty().withMessage('Nomor Batch tidak boleh kosong'),
	check('products.*.qty')
		.trim()
		.notEmpty()
		.withMessage('Qty tidak boleh kosong')
		.isInt({ min: 1 })
		.withMessage('Qty tidak boleh kosong, minimal 1'),
	check('products.*.product_unit_id').trim().notEmpty().withMessage('Satuan tidak boleh kosong'),
	check('products.*.product_purchase_price')
		.trim()
		.notEmpty()
		.withMessage('Harga Beli tidak boleh kosong')
		.isInt({ min: 1 })
		.withMessage('Harga Beli tidak boleh kosong, minimal 1'),
	check('products.*.expired_date')
		.trim()
		.notEmpty()
		.withMessage('Tanggal Kadaluarsa tidak boleh kosong'),
	check('products.*.total_amount')
		.trim()
		.notEmpty()
		.withMessage('Subtotal tidak boleh kosong')
		.isNumeric()
		.withMessage('Subtotal harus berupa angka'),
];

module.exports = { create };
