'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('purchases', {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			invoice_id: {
				type: Sequelize.INTEGER,
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
			expired_date: {
				type: Sequelize.DATE,
				allowNull: true,
			},
			batch_number: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			total_amount: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			qty: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			cashback: {
				type: Sequelize.INTEGER,
				allowNull: true,
				defaultValue: 0,
			},
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('purchases');
	},
};
