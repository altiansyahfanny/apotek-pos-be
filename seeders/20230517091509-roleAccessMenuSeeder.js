"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "role_access_menus",
      [
        // owner => Daftar Produk
        {
          id: 1,
          role_id: 1,
          menu_id: 1,
        },
        // owner => stok kadaluarsa
        {
          id: 2,
          role_id: 1,
          menu_id: 2,
        },
        // owner => daftar resep
        {
          id: 3,
          role_id: 1,
          menu_id: 3,
        },
        // owner => racikan
        {
          id: 4,
          role_id: 1,
          menu_id: 4,
        },
        // owner => pos
        {
          id: 5,
          role_id: 1,
          menu_id: 5,
        },
        // owner => daftar penjualan
        {
          id: 6,
          role_id: 1,
          menu_id: 6,
        },
        // owner => daftar pembelian
        {
          id: 7,
          role_id: 1,
          menu_id: 7,
        },
        // owner => rencana pembelian
        {
          id: 8,
          role_id: 1,
          menu_id: 8,
        },
        // owner => daftar pesanan
        {
          id: 9,
          role_id: 1,
          menu_id: 9,
        },
        // owner => daftar kosinyasi
        {
          id: 10,
          role_id: 1,
          menu_id: 10,
        },
        // owner => daftar pengguna
        {
          id: 11,
          role_id: 1,
          menu_id: 11,
        },
        // owner => daftar pelanggan
        {
          id: 12,
          role_id: 1,
          menu_id: 12,
        },
        // owner => daftar dokter
        {
          id: 13,
          role_id: 1,
          menu_id: 13,
        },
        // owner => daftar supplier
        {
          id: 14,
          role_id: 1,
          menu_id: 14,
        },
        // owner => hak akses pengguna
        {
          id: 15,
          role_id: 1,
          menu_id: 15,
        },
        // owner => satuan produk
        {
          id: 16,
          role_id: 1,
          menu_id: 16,
        },
        // owner => rak
        {
          id: 17,
          role_id: 1,
          menu_id: 17,
        },
        // owner => gudang
        {
          id: 18,
          role_id: 1,
          menu_id: 18,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("role_access_menus", null, {});
  },
};
