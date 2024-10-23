import FeedbacksModel from "../models/feedback.model.js";

const findAll = async () => {
  try {
    const items = await FeedbacksModel.findAll({
      order: [["created_at", "DESC"]],
    });
    return items;
  } catch (error) {
    throw new Error(error);
  }
};

const findOne = async (id) => {
  try {
    const item = await FeedbacksModel.findOne({ where: { id } });
    return item;
  } catch (error) {
    throw new Error(error);
  }
};

const deleteItem = async ({ id }) => {
  try {
    const item = await FeedbacksModel.findOne({ where: { id } });
    if (!item) return new Error("Item not found");
    return item.destroy();
  } catch (error) {
    throw new Error(error);
  }
};

const updateItem = async ({ name, comment, photo, id }) => {
  try {
    const item = await FeedbacksModel.findOne({ where: { id } });
    if (!item) return new Error("Item not found");
    item.name = name || item.name;
    item.comment = comment || item.comment;
    item.photo = photo || item.photo;
    const saved = await item.save();
    return saved;
  } catch (error) {
    throw new Error(error);
  }
};

const createItem = async ({ name, comment, photo }) => {
  try {
    const item = await FeedbacksModel.create({ name, comment, photo });
    return item;
  } catch (error) {
    throw new Error(error);
  }
};

export { findAll, findOne, deleteItem, updateItem, createItem };
