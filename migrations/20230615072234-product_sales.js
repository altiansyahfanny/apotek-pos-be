"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("product_sales", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      sale_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      product_stock_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      product_unit_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      qty: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      total_qty: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      is_custom_price: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      price_type: {
        type: Sequelize.STRING(100),
        allowNull: false,
        defaultValue: "Harga Utama",
      },
      total: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("product_sales");
  },
};
