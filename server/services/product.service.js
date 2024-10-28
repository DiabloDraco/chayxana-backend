import { Op } from "sequelize";
import ProductModel from "../models/product.model.js";
import ProductCategoryModel from "../models/productCategory.model.js";

const findAll = async () => {
  try {
    const items = await ProductModel.findAll({
      order: [["created_at", "DESC"]],
      where: {
        is_set: false,
      },
    });
    return items;
  } catch (error) {
    throw new Error(error);
  }
};

const findAllByCategory = async (category_id) => {
  try {
    if (category_id == "reccom") {
      const items = await ProductModel.findAll({
        where: {
          is_reccomend: true,
          is_set: false,
        },
      });
      return items;
    } else if (category_id == "sets") {
      const items = await ProductModel.findAll({
        where: {
          is_set: true,
        },
      });
      return items;
    } else {
      const items = await ProductModel.findAll({
        where: {
          category_id,
          is_set: false,
        },
      });
      return items;
    }
  } catch (error) {
    throw new Error(error);
  }
};

const findAllBySort = async () => {
  try {
    const products = await ProductCategoryModel.findAll({
      order: [["sort_order", "ASC"]],
    });

    return products;
  } catch (error) {
    throw new Error(error.message);
  }
};

const findOne = async (id) => {
  try {
    const item = await ProductModel.findOne({ where: { id } });

    if (!item) return new Error("Не найдено");
    return item;
  } catch (error) {
    throw new Error(error);
  }
};

const insertItem = async ({
  user_id,
  category_id,
  name,
  photo,
  price,
  description,
  on_shop,
  is_reccomend,
  is_set,
}) => {
  try {
    const item = await ProductModel.create(
      {
        user_id,
        category_id,
        name,
        photo,
        price,
        description,
        on_shop,
        is_reccomend,
        is_set,
      },
      { returning: true }
    );

    if (!item) return new Error();

    return item;
  } catch (error) {
    throw new Error(error);
  }
};

const updateItem = async ({
  user_id,
  category_id,
  name,
  photo,
  price,
  description,
  on_shop,
  id,
  is_reccomend,
  is_set,
}) => {
  try {
    const item = await ProductModel.findOne({ where: { id } });

    if (!item) return new Error("Item not found");

    item.user_id = user_id || item.user_id;
    item.category_id = category_id || item.category_id;
    item.name = name || item.name;
    item.photo = photo || item.photo;
    item.price = price || item.price;
    item.description = description || item.description;
    item.on_shop = on_shop || item.on_shop;
    item.is_reccomend = is_reccomend || item.is_reccomend;
    item.is_set = is_set || item.is_set;

    const saved = await item.save();

    return saved;
  } catch (error) {
    throw new Error(error);
  }
};

const deleteItem = async ({ id }) => {
  try {
    const item = await ProductModel.findOne({ where: { id } });

    if (!item) return new Error("Item not found");

    return await item.destroy();
  } catch (error) {
    throw new Error(error);
  }
};

const findSearch = async (search) => {
  try {
    const items = await ProductModel.findAll({
      where: {
        name: {
          [Op.iLike]: `%${search}%`,
        },
      },
    });
    return items;
  } catch (error) {
    throw new Error(error);
  }
};

export {
  findAll,
  findOne,
  insertItem,
  updateItem,
  deleteItem,
  findAllByCategory,
  findSearch,
  findAllBySort,
};
