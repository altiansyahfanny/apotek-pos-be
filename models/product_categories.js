'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class product_categories extends Model {
		static associate(models) {}
	}
	product_categories.init(
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
			// modelName: 'agama',
			// tableName: 'agama',
			timestamps: false,
			// freezeTableName: true,
		}
	);

	return product_categories;
};
