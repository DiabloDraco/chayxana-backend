import { Op } from "sequelize";
import UserPromoModel from "../models/userPromo.model.js";
import PromoModel from "../models/promo.model.js";

const findAll = async () => {
  try {
    const items = await PromoModel.findAll({
      order: [["created_at", "DESC"]],
    });
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

const checkPromo = async ({ promo_code, user_id }) => {
  try {
    const item = await PromoModel.findOne({
      where: {
        promo_code,
        [Op.or]: [{ count: { [Op.gt]: 0 } }, { is_infinite: true }],
      },
    });

    if (!item) {
      throw new Error("Такого промокода не существует!");
    }

    const is_Activated = UserPromoModel.findOne({
      where: { user_id, promo_id: item.id },
    });

    if (is_Activated) {
      throw new Error("Вы уже активировали этот промокод!");
    }

    return item;
  } catch (error) {
    throw new Error(error.message);
  }
};

const createItem = async ({
  promo_code,
  count,
  expired_at,
  is_infinite,
  discount,
}) => {
  try {
    const item = await PromoModel.create(
      { promo_code, count, expired_at, is_infinite, discount },
      { returning: true }
    );

    if (!item) return new Error();

    return item;
  } catch (error) {
    throw new Error(error);
  }
};

const updateItem = async ({ id, count, expired_at, is_infinite, discount }) => {
  try {
    const item = await PromoModel.findOne({ where: { id } });
    if (!item) return new Error("Не найдено");
    item.count = count || item.count;
    item.expired_at = expired_at || item.expired_at;
    item.is_infinite = is_infinite || item.is_infinite;
    item.discount = discount || item.discount;

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

export { findAll, findOne, createItem, updateItem, deleteItem, checkPromo };
