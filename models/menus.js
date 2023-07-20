"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class menus extends Model {
    static associate(models) {
      menus.hasMany(models.menu_actions, { foreignKey: "menu_id" });
      menus.belongsToMany(models.roles, { through: "role_access_menus", foreignKey: "menu_id", otherKey: "role_id" });
    }
  }
  menus.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      module_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      permission_key: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
    }
  );

  return menus;
};
