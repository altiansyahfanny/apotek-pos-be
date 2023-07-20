"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class role_access_modules extends Model {
    static associate(models) {
      role_access_modules.belongsTo(models.roles, { foreignKey: "role_id" });
      role_access_modules.belongsTo(models.modules, { foreignKey: "module_id" });
    }
  }
  role_access_modules.init(
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
      module_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
    }
  );

  return role_access_modules;
};
