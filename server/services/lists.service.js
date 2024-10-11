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
      attributes: ["id", "created_at"],
    });

    return items;
  } catch (error) {
    throw new Error(error);
  }
};

export { findAllBranches, findAllTables };
