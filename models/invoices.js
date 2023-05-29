'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class invoices extends Model {
		static associate(models) {
			invoices.hasMany(models.purchases, { foreignKey: 'invoice_id' });
			invoices.belongsTo(models.suppliers, { foreignKey: 'supplier_id' });
			invoices.belongsTo(models.warehouses, { foreignKey: 'warehouse_id' });
		}
	}

	invoices.init(
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			warehouse_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			supplier_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			invoice_number: {
				type: DataTypes.STRING(100),
				allowNull: false,
			},
			order_letter_number: {
				type: DataTypes.STRING(100),
				allowNull: false,
			},
			date: {
				type: DataTypes.DATE,
				allowNull: false,
			},
			receipt_date: {
				type: DataTypes.DATE,
				allowNull: false,
			},
			total_amount: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			payment_method: {
				type: DataTypes.ENUM('Tunai', 'Kredit'),
				allowNull: false,
			},
			payment_status: {
				type: DataTypes.ENUM('Lunas', 'Belum Lunas'),
				allowNull: false,
			},
			due_date: {
				type: DataTypes.DATE,
				allowNull: true,
			},
			tax: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			cashback: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			other_cost: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
		},
		{
			sequelize,
			// modelName: 'agama',
			// tableName: 'agama',
			timestamps: false,
			// freezeTableName: true,
		}
	);

	return invoices;
};
