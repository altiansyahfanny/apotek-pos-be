'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('alternative_prices', {
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
			alternative_price_category_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			minimum_item: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			price: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('alternative_prices');
	},
};
