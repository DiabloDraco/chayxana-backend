import PromoModel from "../models/promo.model.js";

const findAll = async () => {
  try {
    const items = await PromoModel.findAll();
    return items;
  } catch (error) {
    throw new Error(error);
  }
};

const findOne = async (id) => {
  try {
    const item = await PromoModel.findOne({ where: { id } });

    if (!item) return new Error("Не найдено");
    return item;
  } catch (error) {
    throw new Error(error);
  }
};

const createItem = async ({ promo_code, count, expired_at, is_infinite }) => {
  try {
    const item = await PromoModel.create(
      { promo_code, count, expired_at, is_infinite },
      { returning: true }
    );

    if (!item) return new Error();

    return item;
  } catch (error) {
    throw new Error(error);
  }
};

const updateItem = async ({ id, count, expired_at, is_infinite }) => {
  try {
    const item = await PromoModel.findOne({ where: { id } });
    if (!item) return new Error("Не найдено");
    item.count = count || item.count;
    item.expired_at = expired_at || item.expired_at;
    item.is_infinite = is_infinite || item.is_infinite;

    const saved = await item.save();
    return saved;
  } catch (error) {
    throw new Error(error);
  }
};

const deleteItem = async ({ id }) => {
  try {
    const item = await PromoModel.findOne({ where: { id } });

    if (!item) return new Error("Item not found");

    return item.destroy();
  } catch (error) {
    throw new Error(error);
  }
};

export { findAll, findOne, createItem, updateItem, deleteItem };
