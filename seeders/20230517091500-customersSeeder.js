"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "customers",
      [
        {
          id: 1,
          member_code: "1",
          name: "Umum",
          birth_date: new Date(),
          // email: '-',
          // phone_number: '-',
          // address: '-',
          status: true,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("customers", null, {});
  },
};
