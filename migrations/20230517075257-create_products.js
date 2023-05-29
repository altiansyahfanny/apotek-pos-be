'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('products', {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			product_category_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			product_unit_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			rack_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			product_status_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},

			minimum_stock: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			capital_price: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			price: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			factory_name: {
				type: Sequelize.STRING(100),
				allowNull: true,
			},
			name: {
				type: Sequelize.STRING(100),
				allowNull: false,
			},
			sku_code: {
				type: Sequelize.STRING(100),
				allowNull: false,
			},
			barcode: {
				type: Sequelize.STRING(100),
				allowNull: false,
			},
			active_substance: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			other_information: {
				type: Sequelize.STRING,
				allowNull: true,
			},
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('products');
	},
};
