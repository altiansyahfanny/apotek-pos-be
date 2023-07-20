"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class prescription_details extends Model {
    static associate(models) {}
  }
  prescription_details.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      prescription_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
    }
  );

  return prescription_details;
};
