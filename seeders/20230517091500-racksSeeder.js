'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			'racks',
			[{ id: 1, name: 'Rak Khusus Obat', warehouse_id: 1 }],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('racks', null, {});
	},
};
