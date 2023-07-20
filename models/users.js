"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    static associate(models) {
      users.belongsTo(models.roles, { foreignKey: "role_id" });
      users.belongsTo(models.warehouses, { foreignKey: "warehouse_id" });
    }
  }
  users.init(
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
      warehouse_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      timestamps: false,
    }
  );

  return users;
};
