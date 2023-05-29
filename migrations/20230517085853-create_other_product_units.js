'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('other_product_units', {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			product_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			product_unit_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			number_of_other_product_units: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			number_of_product_units: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('other_product_units');
	},
};
