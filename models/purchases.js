'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class purchases extends Model {
		static associate(models) {
			purchases.belongsTo(models.invoices, { foreignKey: 'invoice_id' });
			purchases.belongsTo(models.products, { foreignKey: 'product_id' });
			purchases.belongsTo(models.product_units, { foreignKey: 'product_unit_id' });
		}
	}

	purchases.init(
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			invoice_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			product_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			product_unit_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			expired_date: {
				type: DataTypes.DATE,
				allowNull: true,
			},
			batch_number: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			total_amount: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			qty: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			cashback: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
		},
		{
			sequelize,
			timestamps: false,
		}
	);

	return purchases;
};
