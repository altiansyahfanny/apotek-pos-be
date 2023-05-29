'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			'product_statuses',
			[
				{
					id: 1,
					name: 'Dijual',
				},
				{
					id: 2,
					name: 'Tidak Dijual',
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('product_statuses', null, {});
	},
};
