import { DataTypes } from "sequelize";
import ProductCategoryModel from "../models/productCategory.model.js";

const findAll = async () => {
  try {
    const items = await ProductCategoryModel.findAll({
      order: [["sort_order", "ASC"]],
    });

    return items;
  } catch (error) {
    throw new Error(error);
  }
};

const findOne = async (id) => {
  try {
    const item = await ProductCategoryModel.findOne({ where: { id } });

    if (!item) return new Error("Не найдено");
    return item;
  } catch (error) {
    throw new Error(error);
  }
};

const insertItem = async ({ name, description }) => {
  try {
    const item = await ProductCategoryModel.create(
      { name, description },
      { returning: true }
    );

    if (!item) return new Error();

    return item;
  } catch (error) {
    throw new Error(error);
  }
};

const updateItem = async ({ name, description, id }) => {
  try {
    const item = await ProductCategoryModel.findOne({ where: { id } });

    if (!item) return new Error("Item not found");

    item.name = name || item.name;
    item.description = description || item.description;

    const saved = await item.save();

    return saved;
  } catch (error) {
    throw new Error(error);
  }
};

const deleteItem = async ({ id }) => {
  try {
    const item = await ProductCategoryModel.findOne({ where: { id } });

    if (!item) return new Error("Item not found");

    return item.destroy();
  } catch (error) {
    throw new Error(error);
  }
};

export { findAll, findOne, insertItem, updateItem, deleteItem };
