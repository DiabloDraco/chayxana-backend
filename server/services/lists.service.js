import { Op } from "sequelize";
import ListsModel from "../models/lists.model.js";

const findAllBranches = async () => {
  try {
    const items = await ListsModel.findAll({
      where: { type_id: 1 },
      attributes: [
        "id",
        ["name1", "name"],
        ["name2", "city"],
        ["val01", "location"],
        ["val02", "phone_number"],
        ["val03", "image_list"],
        ["val04", "working_hours"],
        "created_at",
      ],
    });

    return items;
  } catch (error) {
    throw new Error(error);
  }
};

const findAllTables = async () => {
  try {
    const items = await ListsModel.findAll({
      where: { type_id: 2 },
      attributes: [["val01", "table_id"], "created_at"],
      order: [["id", "DESC"]],
    });

    return items;
  } catch (error) {
    throw new Error(error);
  }
};

const createTableItem = async ({ table_id }) => {
  try {
    const item = await ListsModel.create({
      type_id: 2,
      val01: table_id,
      id: table_id,
    });
    return item;
  } catch (error) {
    throw new Error(error);
  }
};

const deleteTableItem = async ({ table_id }) => {
  try {
    const item = await ListsModel.findOne({
      where: {
        [Op.and]: [{ val01: table_id }, { type_id: 2 }],
      },
    });
    if (!item) return new Error("Item not found");

    item.destroy();
    return item;
  } catch (error) {
    throw new Error(error);
  }
};

export { findAllBranches, findAllTables, createTableItem, deleteTableItem };
