"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "menu_actions",
      [
        {
          menu_id: 1,
          name: "Detail",
          permission_key: "product.detail",
        },
        {
          menu_id: 1,
          name: "Tambah",
          permission_key: "product.create",
        },
        {
          menu_id: 1,
          name: "Ubah",
          permission_key: "product.update",
        },
        {
          menu_id: 1,
          name: "Hapus",
          permission_key: "product.delete",
        },
        {
          menu_id: 2,
          name: "Tambah",
          permission_key: "product.stock-expired.create",
        },
        {
          menu_id: 3,
          name: "Tebus",
          permission_key: "prescription.redeem",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("menu_actions", null, {});
  },
};
