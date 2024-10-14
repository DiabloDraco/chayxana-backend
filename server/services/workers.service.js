import WorkersModel from "../models/workers.model.js";

const findAll = async () => {
  try {
    const items = await WorkersModel.findAll();
    return items;
  } catch (error) {
    throw new Error(error);
  }
};

const findOne = async (id) => {
  try {
    const item = await WorkersModel.findOne({ where: { id } });
    return item;
  } catch (error) {
    throw new Error(error);
  }
};

const deleteItem = async ({ id }) => {
  try {
    const item = await WorkersModel.findOne({ where: { id } });
    if (!item) return new Error("Item not found");
    return item.destroy();
  } catch (error) {
    throw new Error(error);
  }
};

const updateItem = async ({ name, description, photo, id }) => {
  try {
    const item = await WorkersModel.findOne({ where: { id } });
    if (!item) return new Error("Item not found");
    item.name = name || item.name;
    item.description = description || item.description;
    item.photo = photo || item.photo;
    const saved = await item.save();
    return saved;
  } catch (error) {
    throw new Error(error);
  }
};

const createItem = async ({ name, description, photo }) => {
  try {
    const item = await WorkersModel.create({ name, description, photo });
    return item;
  } catch (error) {
    throw new Error(error);
  }
};

export { findAll, findOne, deleteItem, updateItem, createItem };
