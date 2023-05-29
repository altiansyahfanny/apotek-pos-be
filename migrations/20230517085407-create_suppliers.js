'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('suppliers', {
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
			email: {
				type: Sequelize.STRING(100),
				allowNull: true,
			},
			phone_number: {
				type: Sequelize.STRING(100),
				allowNull: true,
			},
			address: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			status: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
			},
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('suppliers');
	},
};
