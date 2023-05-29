'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class product_stocks extends Model {
		static associate(models) {}
	}
	product_stocks.init(
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			product_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			batch_number: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			qty: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{
			sequelize,
			timestamps: false,
		}
	);

	return product_stocks;
};
