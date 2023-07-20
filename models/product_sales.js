"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class product_sales extends Model {
    static associate(models) {
      product_sales.belongsTo(models.products, { foreignKey: "product_id" });
      product_sales.belongsTo(models.product_units, { foreignKey: "product_unit_id" });
      product_sales.belongsTo(models.product_stocks, { foreignKey: "product_stock_id" });
      product_sales.belongsTo(models.sales, { foreignKey: "sale_id" });
    }
  }
  product_sales.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      sale_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      product_stock_id: {
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
      total_qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      is_custom_price: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      price_type: {
        type: DataTypes.STRING(100),
        allowNull: false,
        defaultValue: "Harga Utama",
      },
      total: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
    }
  );

  return product_sales;
};
