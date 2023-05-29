'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('invoices', {
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
			supplier_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			invoice_number: {
				type: Sequelize.STRING(100),
				allowNull: false,
			},
			order_letter_number: {
				type: Sequelize.STRING(100),
				allowNull: false,
			},
			date: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			receipt_date: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			total_amount: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			payment_method: {
				type: Sequelize.ENUM('Tunai', 'Kredit'),
				allowNull: false,
			},
			payment_status: {
				type: Sequelize.ENUM('Lunas', 'Belum Lunas'),
				allowNull: false,
			},
			due_date: {
				type: Sequelize.DATE,
				allowNull: true,
			},
			tax: {
				type: Sequelize.INTEGER,
				allowNull: true,
				defaultValue: 0,
			},
			cashback: {
				type: Sequelize.INTEGER,
				allowNull: true,
				defaultValue: 0,
			},
			other_cost: {
				type: Sequelize.INTEGER,
				allowNull: true,
				defaultValue: 0,
			},
			// Other relevant columns for purchases
			// createdAt: {
			//   type: Sequelize.DATE,
			//   allowNull: false,
			//   defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
			// },
			// updatedAt: {
			//   type: Sequelize.DATE,
			//   allowNull: false,
			//   defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
			// }
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('invoices');
	},
};
