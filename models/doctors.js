'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class doctors extends Model {
		static associate(models) {}
	}
	doctors.init(
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
			sip: {
				type: DataTypes.STRING(100),
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING(100),
				allowNull: true,
			},
			phone_number: {
				type: DataTypes.STRING(100),
				allowNull: true,
			},
			specialization: {
				type: DataTypes.STRING(100),
				allowNull: true,
			},
			address: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			status: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
			},
		},
		{
			sequelize,
			timestamps: false,
		}
	);

	return doctors;
};
