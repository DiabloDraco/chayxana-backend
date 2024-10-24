"use strict";

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface) {
  await queryInterface.bulkInsert(
    "lists",
    [
      {
        id: 1,
        type_id: 0,
        name1: "BRANCHES",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        type_id: 0,
        name1: "TABLES",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 1,
        type_id: 1,
        name1: "Чайхана Ташкент сити",
        name2: "Москва, Минская ул., 6, корп. 3",
        val01: "55.734498, 37.488296",
        val02: "998958006151",
        val03: "",
        val04: "",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        type_id: 1,
        name1: "Ташкент сити Москва",
        name2: "Москва, Волгоградский просп., 37А",
        val01: "55.722407, 37.696851",
        val02: "998958006151",
        val03: "",
        val04: "",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 1,
        type_id: 2,
        val01: "1",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        type_id: 2,
        val01: "2",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 3,
        type_id: 2,
        val01: "3",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 4,
        type_id: 2,
        val01: "4",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 5,
        type_id: 2,
        val01: "5",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 6,
        type_id: 2,
        val01: "6",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 7,
        type_id: 2,
        val01: "7",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 8,
        type_id: 2,
        val01: "8",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 9,
        type_id: 2,
        val01: "9",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 10,
        type_id: 2,
        val01: "10",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ],
    {}
  );
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete("roles", null);
}
