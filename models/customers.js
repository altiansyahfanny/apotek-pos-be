"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class customers extends Model {
    static associate(models) {}
  }
  customers.init(
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
      member_code: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      birth_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      phone_number: {
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

  return customers;
};
