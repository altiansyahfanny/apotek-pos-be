"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class product_concoctions extends Model {
    static associate(models) {
      product_concoctions.belongsTo(models.product_units, { foreignKey: "product_unit_id" });
      product_concoctions.belongsTo(models.products, { foreignKey: "product_id" });
    }
  }
  product_concoctions.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      concoction_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      product_unit_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
    }
  );

  return product_concoctions;
};
