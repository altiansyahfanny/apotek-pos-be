"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class role_access_menus extends Model {
    static associate(models) {}
  }
  role_access_menus.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      menu_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
    }
  );

  return role_access_menus;
};
