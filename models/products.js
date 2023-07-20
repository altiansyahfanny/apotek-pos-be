"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class products extends Model {
    static associate(models) {
      products.belongsTo(models.product_categories, { foreignKey: "product_category_id" });
      products.belongsTo(models.product_statuses, { foreignKey: "product_status_id" });
      products.belongsTo(models.racks, { foreignKey: "rack_id" });
      products.belongsTo(models.product_units, { foreignKey: "product_unit_id" });
      products.hasMany(models.other_product_units, { foreignKey: "product_id" });
      products.hasMany(models.alternative_prices, { foreignKey: "product_id" });
      products.hasMany(models.purchases, { foreignKey: "product_id" });
      products.hasMany(models.product_stocks, { foreignKey: "product_id" });
      products.hasMany(models.product_sales, { foreignKey: "product_id" });
    }
  }

  products.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      product_category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      product_unit_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      rack_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      product_status_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      minimum_stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      capital_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      factory_name: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      sku_code: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      barcode: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      active_substance: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      other_information: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
    }
  );

  return products;
};
