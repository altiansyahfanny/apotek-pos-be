"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "product_stocks",
      [
        {
          id: 1,
          product_id: 1,
          batch_number: "1b2b",
          qty: 100,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("product_stocks", null, {});
  },
};
