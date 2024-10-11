"use strict";

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface) {
  await queryInterface.bulkInsert(
    "roles",
    [
      {
        id: 1,
        name: "ADMIN",
        created_at: new Date(),
        updated_at: new Date(),
        description: "THE ADMIN",
      },
      {
        id: 2,
        name: "SUPER_ADMIN",
        created_at: new Date(),
        updated_at: new Date(),
        description: "SUPER ADMIN",
      },
      {
        id: 3,
        name: "WORKER",
        created_at: new Date(),
        updated_at: new Date(),
        description: "WORKER",
      },
      {
        id: 4,
        name: "USER",
        created_at: new Date(),
        updated_at: new Date(),
        description: "USER",
      },
      {
        id: 5,
        name: "COURIER",
        created_at: new Date(),
        updated_at: new Date(),
        description: "COURIER",
      },
    ],
    {}
  );
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete("roles", null);
}
