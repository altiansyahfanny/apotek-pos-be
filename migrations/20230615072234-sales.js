"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("sales", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
      reference_number: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      service_fee: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      shipping_costs: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      embalase_fee: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      discount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      tax: {
        type: Sequelize.INTEGER,
        allowNull: false,
        default: 0,
      },
      selling_via: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      subtotal: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      total: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      total_paid: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      debt: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1, // 1 = lunas, 2 = kredit, 3 = pending, 4 = deleted
      },
      payment_method: {
        type: Sequelize.ENUM("Tunai", "Kredit"),
        allowNull: false,
        defaultValue: "Tunai",
      },
      payment_account: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      due_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      notes: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("sales");
  },
};
