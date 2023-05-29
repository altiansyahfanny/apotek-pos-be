'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class racks extends Model {
		static associate(models) {
			racks.belongsTo(models.warehouses, { foreignKey: 'warehouse_id' });
		}
	}
	racks.init(
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

	return racks;
};
