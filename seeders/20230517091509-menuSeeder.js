"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "menus",
      [
        {
          id: 1,
          module_id: 1,
          name: "Daftar Produk",
          permission_key: "product.read",
        },
        {
          id: 2,
          module_id: 1,
          name: "Stok Kadaluarsa",
          permission_key: "product.stock-expired.read",
        },
        {
          id: 3,
          module_id: 2,
          name: "Daftar Resep",
          permission_key: "prescription.read",
        },
        {
          id: 4,
          module_id: 2,
          name: "Racikan",
          permission_key: "prescription.concoction.read",
        },
        {
          id: 5,
          module_id: 3,
          name: "POS",
          permission_key: "sale.create",
        },
        {
          id: 6,
          module_id: 3,
          name: "Daftar Penjualan",
          permission_key: "sale.read",
        },
        {
          id: 7,
          module_id: 4,
          name: "Daftar Pembelian",
          permission_key: "purchase.read",
        },
        {
          id: 8,
          module_id: 4,
          name: "Rencana Pembelian",
          permission_key: "purchase.plan.read",
        },
        {
          id: 9,
          module_id: 4,
          name: "Daftar Pesanan",
          permission_key: "purchase.order.read",
        },
        {
          id: 10,
          module_id: 5,
          name: "Daftar Konsinyasi",
          permission_key: "consignment.read",
        },
        {
          id: 11,
          module_id: 6,
          name: "Daftra Pengguna",
          permission_key: "management.user.read",
        },
        {
          id: 12,
          module_id: 6,
          name: "Daftra Pelanggan",
          permission_key: "management.customer.read",
        },
        {
          id: 13,
          module_id: 6,
          name: "Daftra Dokter",
          permission_key: "management.doctor.read",
        },
        {
          id: 14,
          module_id: 6,
          name: "Daftra Supplier",
          permission_key: "management.supplier.read",
        },
        {
          id: 15,
          module_id: 7,
          name: "Hak Akses Pengguna",
          permission_key: "setting.user-access.read",
        },
        {
          id: 16,
          module_id: 7,
          name: "Satuan Produk",
          permission_key: "setting.product-unit.read",
        },
        {
          id: 17,
          module_id: 7,
          name: "Rak",
          permission_key: "setting.rack.read",
        },
        {
          id: 18,
          module_id: 7,
          name: "Gudang",
          permission_key: "setting.warehouse.read",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("menus", null, {});
  },
};
