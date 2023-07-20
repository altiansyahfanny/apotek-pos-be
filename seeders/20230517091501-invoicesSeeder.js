"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "invoices",
      [
        {
          id: 1,
          supplier_id: 1,
          warehouse_id: 1,
          invoice_number: "INV/09/88/2023",
          order_letter_number: "LETTER/09/88/2023",
          date: new Date(),
          receipt_date: new Date(),
          total_amount: 200000,
          payment_method: "Tunai",
          payment_status: "Lunas",
          due_date: "",
          tax: 0,
          cashback: 10000,
          other_cost: 5000,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("invoices", null, {});
  },
};
