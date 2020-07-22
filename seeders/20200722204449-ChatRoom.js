"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "ChatRooms",
      [
        {
          username: "ChatBot",
          message: "Welcome",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "ChatBot",
          message: "Say Something...",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
