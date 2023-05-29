'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('product_stocks', {
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
			batch_number: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			qty: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('product_stocks');
	},
};
