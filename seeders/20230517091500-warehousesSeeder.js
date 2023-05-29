'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			'warehouses',
			[
				{ id: 1, name: 'Gudang Utama' },
				{ id: 2, name: 'Gudang Pasar Lama' },
				{ id: 3, name: 'Gudang Kelayan' },
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('warehouses', null, {});
	},
};
