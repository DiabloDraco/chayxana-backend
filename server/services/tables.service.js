import TablesModel from "../models/tables.model.js";

const findAll = async ({ branch_id }) => {
  try {
    const items = await TablesModel.findAll({
      order: [["created_at", "DESC"]],
      where: {
        branch_id,
      },
    });
    return items;
  } catch (error) {
    throw new Error(error.message);
  }
};

const findOne = async (id) => {
  try {
    const item = await TablesModel.findOne({ where: { id } });
    return item;
  } catch (error) {
    throw new Error(error);
  }
};

const deleteItem = async ({ id }) => {
  try {
    const item = await TablesModel.findOne({ where: { id } });
    if (!item) return new Error("Item not found");
    return item.destroy();
  } catch (error) {
    throw new Error(error);
  }
};

const updateItem = async ({
  is_account,
  table_id,
  isWatched,
  branch_id,
  id,
}) => {
  try {
    const item = await TablesModel.findOne({ where: { id } });
    if (!item) return new Error("Item not found");
    item.is_account = is_account || item.is_account;
    item.table_id = table_id || item.table_id;
    item.is_watched = isWatched || item.is_watched;
    item.branch_id = branch_id || item.branch_id;
    const saved = await item.save();
    return saved;
  } catch (error) {
    throw new Error(error);
  }
};

const createItem = async ({ is_account, table_id, branch_id }) => {
  try {
    const item = await TablesModel.create({ is_account, table_id, branch_id });
    return item;
  } catch (error) {
    throw new Error(error);
  }
};

export { findAll, findOne, deleteItem, updateItem, createItem };
