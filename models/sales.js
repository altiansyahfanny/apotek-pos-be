"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class sales extends Model {
    static associate(models) {
      sales.belongsTo(models.customers, { foreignKey: "customer_id" });
      sales.hasMany(models.product_sales, { foreignKey: "sale_id", onDelete: "cascade", hooks: true });
    }
  }
  sales.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      doctor_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      reference_number: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      service_fee: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      shipping_costs: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      embalase_fee: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      discount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      tax: {
        type: DataTypes.INTEGER,
        allowNull: false,
        default: 0,
      },
      selling_via: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      subtotal: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      total: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      total_paid: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      debt: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1, // 1 = lunas, 2 = kredit, 3 = pending, 4 = deleted
      },
      payment_method: {
        type: DataTypes.ENUM("Tunai", "Kredit"),
        allowNull: false,
        defaultValue: "Tunai",
      },
      payment_account: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      due_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      notes: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      timestamps: false,
    }
  );

  return sales;
};
