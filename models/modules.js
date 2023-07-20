"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class modules extends Model {
    static associate(models) {
      modules.hasMany(models.menus, { foreignKey: "module_id" });
      modules.belongsToMany(models.roles, { through: "role_access_modules", foreignKey: "module_id", otherKey: "role_id" });
    }
  }
  modules.init(
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

  return modules;
};
