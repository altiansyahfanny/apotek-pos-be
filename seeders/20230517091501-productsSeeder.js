'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			'products',
			[
				{
					id: 1,
					product_category_id: 1,
					product_unit_id: 1,
					rack_id: 1,
					product_status_id: 1,
					minimum_stock: 10,
					capital_price: 1000,
					price: 2000,
					factory_name: 'Kimia Farma',
					name: 'Antangin Jrg Original Sach',
					sku_code: 'SKU1234',
					barcode: '12345678',
					active_substance: 'Dextro',
					other_information: 'Harus diminum setelah makan',
				},
				{
					id: 2,
					product_category_id: 3,
					product_unit_id: 2,
					rack_id: 1,
					product_status_id: 1,
					minimum_stock: 15,
					capital_price: 2500,
					price: 5000,
					name: 'Paracetamol 500mg',
					sku_code: 'SKU4321',
					barcode: '87654321',
					active_substance: 'Asam Mefenamat',
					other_information: 'Bisa dikonsumsi tanpa harus makan',
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('products', null, {});
	},
};
