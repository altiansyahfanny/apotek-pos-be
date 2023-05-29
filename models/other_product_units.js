'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class other_product_units extends Model {
		static associate(models) {
			other_product_units.belongsTo(models.products, { foreignKey: 'product_id' });
			other_product_units.belongsTo(models.product_units, { foreignKey: 'product_unit_id' });
		}
	}
	other_product_units.init(
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
			product_unit_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			number_of_other_product_units: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			number_of_product_units: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{
			sequelize,
			timestamps: false,
		}
	);

	return other_product_units;
};
