"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("prescriptions", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      warehouse_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      code: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      customer_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      doctor_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      embalase_fee: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      service_fee: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      total: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      total_paid: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      note: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 3, // 1 = lunas, 2 = dibayar sebagian, 3 = belum ditebus, 4 = deleted
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("prescriptions");
  },
};
