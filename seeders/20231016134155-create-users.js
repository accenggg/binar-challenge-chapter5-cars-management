"use strict";

const { User } = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", [
      {
        name: "Imam",
        age: 20,
        role: "Superadmin",
        address: "Bandung",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Michael",
        age: 19,
        role: "Superadmin",
        address: "Samarinda",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Yoga",
        age: 20,
        role: "Superadmin",
        address: "Balikpapan",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Ali",
        age: 20,
        role: "Superadmin",
        address: "Balikpapan",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Ale",
        age: 21,
        role: "Superadmin",
        address: "Medan",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    const users = await User.findAll();

    await queryInterface.bulkInsert(
      "Auths",
      [
        {
          email: "imam@gmail.com",
          password:
            "$2a$12$PSRKkLdltfqePXnr5Q8bLOktu43ob1XxoxHuRqlXbvP6FcgoBMgR2",
          confirmPassword:
            "$2a$12$PSRKkLdltfqePXnr5Q8bLOktu43ob1XxoxHuRqlXbvP6FcgoBMgR2",
          userId: users[0].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "michael@gmail.com",
          password:
            "$2a$12$TFxC50o0GYPArFDONh0GLuuHAQx9.220MvWwkvd6YHBMeeHMjama2",
          confirmPassword:
            "$2a$12$TFxC50o0GYPArFDONh0GLuuHAQx9.220MvWwkvd6YHBMeeHMjama2",
          userId: users[1].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "yoga@gmail.com",
          password:
            "$2a$12$h6vO.zh8DcHbEoRZMN/5g.s46E1YCsL7Cz5kgElSf3V2mMyjazB1K",
          confirmPassword:
            "$2a$12$h6vO.zh8DcHbEoRZMN/5g.s46E1YCsL7Cz5kgElSf3V2mMyjazB1K",
          userId: users[2].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "ali@gmail.com",
          password:
            "$2a$12$9RUSXuWqOvo1IJLOq2qG1OHh6E0ZaVmkNHuxoxWKxLdJvuLBP1SVq",
          confirmPassword:
            "$2a$12$9RUSXuWqOvo1IJLOq2qG1OHh6E0ZaVmkNHuxoxWKxLdJvuLBP1SVq",
          userId: users[3].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "ale@gmail.com",
          password:
            "$2a$12$FQWSG8KM9U.nBrkKGIbWeuJL8nvDAIeiGk3H2hnPPdpbnczOodT26",
          confirmPassword:
            "$2a$12$FQWSG8KM9U.nBrkKGIbWeuJL8nvDAIeiGk3H2hnPPdpbnczOodT26",
          userId: users[4].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
    await queryInterface.bulkDelete("Auths", null, {});
  },
};
