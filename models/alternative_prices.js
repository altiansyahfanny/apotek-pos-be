'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class alternative_prices extends Model {
		static associate(models) {
			alternative_prices.belongsTo(models.alternative_price_categories, {
				foreignKey: 'alternative_price_category_id',
			});
		}
	}
	alternative_prices.init(
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
			alternative_price_category_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			minimum_item: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			price: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{
			sequelize,
			timestamps: false,
		}
	);

	return alternative_prices;
};
