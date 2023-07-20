"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "modules",
      [
        {
          id: 1,
          name: "Produk",
          permission_key: "product",
        },
        {
          id: 2,
          name: "Resep",
          permission_key: "prescription",
        },
        {
          id: 3,
          name: "Penjualan",
          permission_key: "sale",
        },
        {
          id: 4,
          name: "Pembelian",
          permission_key: "purchase",
        },
        {
          id: 5,
          name: "Konsinyasi",
          permission_key: "consignment",
        },
        {
          id: 6,
          name: "Management",
          permission_key: "management",
        },
        {
          id: 7,
          name: "Pengaturan",
          permission_key: "setting",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("modules", null, {});
  },
};
