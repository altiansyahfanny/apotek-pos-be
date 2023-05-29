'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			'other_product_units',
			[
				// untuk 1 Box = 10 Produk
				{
					id: 1,
					product_id: 1,
					number_of_other_product_units: 1,
					product_unit_id: 2,
					number_of_product_units: 10,
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('other_product_units', null, {});
	},
};
