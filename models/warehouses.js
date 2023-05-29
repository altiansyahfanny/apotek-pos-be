'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class warehouses extends Model {
		static associate(models) {}
	}
	warehouses.init(
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

	return warehouses;
};
