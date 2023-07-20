"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class prescriptions extends Model {
    static associate(models) {
      prescriptions.belongsTo(models.customers, { foreignKey: "customer_id" });
      prescriptions.belongsTo(models.doctors, { foreignKey: "doctor_id" });
      prescriptions.hasMany(models.prescription_details, { foreignKey: "prescription_id", hooks: true, onDelete: "CASCADE" });
    }
  }
  prescriptions.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      code: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      warehouse_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
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
      embalase_fee: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      service_fee: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      total: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      total_paid: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      note: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 3, // 1 = lunas, 2 = dibayar sebagian, 3 = belum ditebus, 4 = deleted
      },
    },
    {
      sequelize,
      timestamps: false,
    }
  );

  return prescriptions;
};
