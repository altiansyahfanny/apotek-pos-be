'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class alternative_price_categories extends Model {
		static associate(models) {}
	}
	alternative_price_categories.init(
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

	return alternative_price_categories;
};
