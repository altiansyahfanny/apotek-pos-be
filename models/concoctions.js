"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class concoctions extends Model {
    static associate(models) {
      concoctions.belongsTo(models.product_units, { foreignKey: "product_unit_id" });
      concoctions.hasMany(models.product_concoctions, { foreignKey: "concoction_id", hooks: true, onDelete: "CASCADE" });
    }
  }
  concoctions.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      product_unit_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      note: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      timestamps: false,
    }
  );

  return concoctions;
};
