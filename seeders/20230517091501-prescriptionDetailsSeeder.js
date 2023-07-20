"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {},

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("prescription_details", null, {});
  },
};
