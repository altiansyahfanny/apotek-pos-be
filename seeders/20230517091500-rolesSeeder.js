"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "roles",
      [
        {
          id: 1,
          name: "OWNER",
        },
        {
          id: 2,
          name: "SALES",
        },
        {
          id: 3,
          name: "ADMIN",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("roles", null, {});
  },
};
