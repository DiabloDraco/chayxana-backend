import GalleryModel from "../models/gallery.model.js";

const findAll = async () => {
  try {
    const items = await GalleryModel.findAll({
      order: [["created_at", "DESC"]],
    });
    return items;
  } catch (error) {
    throw new Error(error);
  }
};

const findOne = async (id) => {
  try {
    const item = await GalleryModel.findOne({ where: { id } });
    return item;
  } catch (error) {
    throw new Error(error);
  }
};

const deleteItem = async ({ id }) => {
  try {
    const item = await GalleryModel.findOne({ where: { id } });
    if (!item) return new Error("Item not found");
    return item.destroy();
  } catch (error) {
    throw new Error(error);
  }
};

const updateItem = async ({ photo, id }) => {
  try {
    const item = await GalleryModel.findOne({ where: { id } });
    if (!item) return new Error("Item not found");

    item.photo = photo || item.photo;
    const saved = await item.save();
    return saved;
  } catch (error) {
    throw new Error(error);
  }
};

const createItem = async ({ photo }) => {
  try {
    const item = await GalleryModel.create({ photo });
    return item;
  } catch (error) {
    throw new Error(error);
  }
};

export { findAll, findOne, deleteItem, updateItem, createItem };
