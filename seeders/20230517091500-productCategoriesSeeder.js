'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			'product_categories',
			[
				{
					id: 1,
					name: 'Alkes',
				},
				{
					id: 2,
					name: 'Jasa',
				},
				{
					id: 3,
					name: 'Obat',
				},
				{
					id: 4,
					name: 'Umum',
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('product_categories', null, {});
	},
};
