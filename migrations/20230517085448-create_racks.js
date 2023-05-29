'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('racks', {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			warehouse_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			name: {
				type: Sequelize.STRING(100),
				allowNull: false,
			},
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('racks');
	},
};
