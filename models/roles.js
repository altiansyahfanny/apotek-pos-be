"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class roles extends Model {
    static associate(models) {}
  }
  roles.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
    }
  );

  return roles;
};
