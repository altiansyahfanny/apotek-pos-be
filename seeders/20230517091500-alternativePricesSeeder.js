'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			'alternative_prices',
			[
				// untuk "Satu" "Grosir" dengan "Minimum item = 100" maka "Harga" menjadi 1.500 per produk
				{
					id: 1,
					alternative_price_category_id: 1,
					product_id: 1,
					minimum_item: 100,
					price: 1500,
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('alternative_prices', null, {});
	},
};
