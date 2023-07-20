"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "purchases",
      [
        {
          id: 1,
          invoice_id: 1,
          product_id: 1,
          product_unit_id: 1,
          expired_date: new Date(),
          batch_number: "1b2b",
          total_amount: 200000,
          qty: 100,
          cashback: 0,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("purchases", null, {});
  },
};
