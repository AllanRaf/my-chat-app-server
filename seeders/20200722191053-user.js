"use strict";
const bcrypt = require("bcrypt");
bcrypt;
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          username: "Richie",
          email: "ric@demo.com",
          password: bcrypt.hashSync("pass1", 10),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "Al",
          email: "al@demo.com",
          password: bcrypt.hashSync("pass2", 10),
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
