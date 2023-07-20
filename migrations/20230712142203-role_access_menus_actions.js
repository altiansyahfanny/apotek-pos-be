"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("role_access_menu_actions", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      role_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      menu_action_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("role_access_menu_actions");
  },
};
