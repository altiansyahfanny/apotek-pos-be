"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "role_access_modules",
      [
        // owner => produk
        {
          id: 1,
          role_id: 1,
          module_id: 1,
        },
        // sales => produk
        {
          id: 2,
          role_id: 2,
          module_id: 1,
        },
        // admin => produk
        {
          id: 3,
          role_id: 3,
          module_id: 1,
        },
        // owner => resep
        {
          id: 4,
          role_id: 1,
          module_id: 2,
        },
        // owner => penjualan
        {
          id: 5,
          role_id: 1,
          module_id: 3,
        },
        // owner => pembelian
        {
          id: 6,
          role_id: 1,
          module_id: 4,
        },
        // owner => konsinyasi
        {
          id: 7,
          role_id: 1,
          module_id: 5,
        },
        // owner => management
        {
          id: 8,
          role_id: 1,
          module_id: 6,
        },
        // owner => pengaturan
        {
          id: 9,
          role_id: 1,
          module_id: 7,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("role_access_modules", null, {});
  },
};
