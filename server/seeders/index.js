import sequelize from "../plugins/sequalize.js";
import { Sequelize } from "sequelize";
import { up as upRoles } from "./20240705120200-Default-Roles.js";
import { up as UpLists } from "./Default-Lists.js";

async function runSeeders() {
  try {
    await upRoles(sequelize.getQueryInterface(), Sequelize);
    await UpLists(sequelize.getQueryInterface(), Sequelize);
    console.log("Connection has been closed successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

runSeeders();
