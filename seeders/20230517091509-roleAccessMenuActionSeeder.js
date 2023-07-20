"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "role_access_menu_actions",
      [
        {
          id: 1,
          role_id: 1,
          menu_action_id: 1,
        },
        {
          id: 2,
          role_id: 1,
          menu_action_id: 2,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("role_access_menu_actions", null, {});
  },
};
