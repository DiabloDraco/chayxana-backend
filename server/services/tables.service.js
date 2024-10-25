import TablesModel from "../models/tables.model.js";

const findAll = async () => {
  try {
    const items = await TablesModel.findAll({
      order: [["created_at", "DESC"]],
    });
    return items;
  } catch (error) {
    throw new Error(error);
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

const updateItem = async ({ is_account, table_id, isWatched, id }) => {
  try {
    const item = await TablesModel.findOne({ where: { id } });
    if (!item) return new Error("Item not found");
    item.is_account = is_account || item.is_account;
    item.table_id = table_id || item.table_id;
    item.is_watched = isWatched || item.is_watched;
    const saved = await item.save();
    return saved;
  } catch (error) {
    throw new Error(error);
  }
};

const createItem = async ({ is_account, table_id }) => {
  try {
    const item = await TablesModel.create({ is_account, table_id });
    return item;
  } catch (error) {
    throw new Error(error);
  }
};

export { findAll, findOne, deleteItem, updateItem, createItem };
