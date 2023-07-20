"use strict";

const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          id: 1,
          role_id: 1,
          warehouse_id: 1,
          name: "Owner",
          username: "owner",
          email: "owner@gmail.com",
          password: await bcrypt.hash("1234", 10),
        },
        {
          id: 2,
          role_id: 2,
          warehouse_id: 1,
          name: "Admin",
          username: "admin",
          email: "admin@gmail.com",
          password: await bcrypt.hash("1234", 10),
        },
        {
          id: 3,
          role_id: 3,
          warehouse_id: 1,
          name: "Sales",
          username: "sales",
          email: "sales@gmail.com",
          password: await bcrypt.hash("1234", 10),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
