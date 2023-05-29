'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			'alternative_price_categories',
			[
				{ id: 1, name: 'Grosir' },
				{ id: 2, name: 'Member' },
				{ id: 3, name: 'Online' },
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('alternative_price_categories', null, {});
	},
};
