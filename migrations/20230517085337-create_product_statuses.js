'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('product_statuses', {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			name: {
				type: Sequelize.STRING(100),
				allowNull: false,
			},
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('product_statuses');
	},
};
