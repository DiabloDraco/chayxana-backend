import { DataTypes } from "sequelize";
import NotesModel from "../models/notes.model.js";

const findAll = async () => {
  try {
    const items = await NotesModel.findAll({
      order: [["created_at", "DESC"]],
    });

    return items;
  } catch (error) {
    throw new Error(error);
  }
};

const findOne = async (id) => {
  try {
    const item = await NotesModel.findOne({ where: { id } });

    if (!item) return new Error("Не найдено");
    return item;
  } catch (error) {
    throw new Error(error);
  }
};

const insertItem = async ({ text }) => {
  try {
    const item = await NotesModel.create({ text }, { returning: true });

    if (!item) return new Error();

    return item;
  } catch (error) {
    throw new Error(error);
  }
};

const updateItem = async ({ text, id }) => {
  try {
    const item = await NotesModel.findOne({ where: { id } });
    console.log(item);
    if (!item) return new Error("Item not found");

    item.text = text || item.text;

    const saved = await item.save();

    return saved;
  } catch (error) {
    throw new Error(error);
  }
};

const deleteItem = async ({ id }) => {
  try {
    const item = await NotesModel.findOne({ where: { id } });

    if (!item) return new Error("Item not found");

    return item.destroy();
  } catch (error) {
    throw new Error(error);
  }
};

export { findAll, findOne, insertItem, updateItem, deleteItem };
