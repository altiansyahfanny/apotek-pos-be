"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class menu_actions extends Model {
    static associate(models) {
      menu_actions.belongsToMany(models.roles, { through: "role_access_menu_actions", foreignKey: "menu_action_id", otherKey: "role_id" });
    }
  }
  menu_actions.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      menu_id: {
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

  return menu_actions;
};
