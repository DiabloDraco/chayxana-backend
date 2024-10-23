import StoriesModel from "../models/stories.model.js";

const findAll = async () => {
  try {
    const items = await StoriesModel.findAll({
      order: [["created_at", "DESC"]],
    });
    return items;
  } catch (error) {
    throw new Error(error);
  }
};

const findOne = async (id) => {
  try {
    const item = await StoriesModel.findOne({ where: { id } });
    return item;
  } catch (error) {
    throw new Error(error);
  }
};

const deleteItem = async ({ id }) => {
  try {
    const item = await StoriesModel.findOne({ where: { id } });
    if (!item) return new Error("Item not found");
    return item.destroy();
  } catch (error) {
    throw new Error(error);
  }
};

const updateItem = async ({ title, description, photo, id }) => {
  try {
    const item = await StoriesModel.findOne({ where: { id } });
    if (!item) return new Error("Item not found");
    item.title = title || item.title;
    item.description = description || item.description;
    item.photo = photo || item.photo;
    const saved = await item.save();
    return saved;
  } catch (error) {
    throw new Error(error);
  }
};

const createItem = async ({ title, description, photo }) => {
  try {
    const item = await StoriesModel.create({
      title,
      description,
      photo,
    });
    return item;
  } catch (error) {
    throw new Error(error);
  }
};

export { findAll, findOne, deleteItem, updateItem, createItem };
