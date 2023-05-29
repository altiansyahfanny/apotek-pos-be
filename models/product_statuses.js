'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class product_statuses extends Model {
		static associate(models) {}
	}
	product_statuses.init(
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			name: {
				type: DataTypes.STRING(100),
				allowNull: false,
			},
		},
		{
			sequelize,
			timestamps: false,
		}
	);

	return product_statuses;
};
