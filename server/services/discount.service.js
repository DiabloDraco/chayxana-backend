import { DataTypes } from "sequelize";
import DiscountModel from "../models/discount.model.js";

const findAll = async () => {
  try {
    const items = await DiscountModel.findAll({
      order: [["created_at", "DESC"]],
    });

    return items;
  } catch (error) {
    throw new Error(error);
  }
};

const findOne = async (id) => {
  try {
    const item = await DiscountModel.findOne({ where: { id } });

    if (!item) return new Error("Не найдено");
    return item;
  } catch (error) {
    throw new Error(error);
  }
};

const insertItem = async ({ name, description, price_up, percentage }) => {
  try {
    const item = await DiscountModel.create(
      { name, description, percentage, price_up },
      { returning: true }
    );

    if (!item) return new Error();

    return item;
  } catch (error) {
    throw new Error(error);
  }
};

const updateItem = async ({ name, description, price_up, percentage, id }) => {
  try {
    const item = await DiscountModel.findOne({ where: { id } });
    console.log(item);
    if (!item) return new Error("Item not found");

    item.name = name || item.name;
    item.description = description || item.description;
    item.price_up = price_up || item.price_up;
    item.percentage = percentage || item.percentage;

    const saved = await item.save();

    return saved;
  } catch (error) {
    throw new Error(error);
  }
};

const deleteItem = async ({ id }) => {
  try {
    const item = await DiscountModel.findOne({ where: { id } });

    if (!item) return new Error("Item not found");

    return item.destroy();
  } catch (error) {
    throw new Error(error);
  }
};

export { findAll, findOne, insertItem, updateItem, deleteItem };
