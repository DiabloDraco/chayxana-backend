import RequestModel from "../models/request.model.js";
import OrderModel from "../models/order.model.js";
import ProductModel from "../models/product.model.js";
import ProductCategoryModel from "../models/productCategory.model.js";
import sequelize from "sequelize";
import sequelizee from "../plugins/sequalize.js";
import { Op } from "sequelize";

const findTopProducts = async (type) => {
  try {
    let where = {
      "$product.deleted_at$": {
        [Op.is]: null,
      },
    };
    if (type === "month") {
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      where = {
        created_at: {
          [Op.between]: [startOfMonth, endOfMonth],
        },
        "$product.deleted_at$": {
          [Op.is]: null,
        },
      };
    }

    const topProducts = await OrderModel.findAll({
      attributes: [
        "product_id",
        [sequelize.fn("SUM", sequelize.col("quantity")), "total_quantity"],
      ],
      where,
      group: ["product_id", "product.id"],
      order: [[sequelize.literal("total_quantity"), "DESC"]],
      include: [
        {
          model: ProductModel,
          as: "product",
          attributes: ["name", "price", "photo", "id"],
        },
      ],
    });

    return topProducts;
  } catch (error) {
    console.log(error);
  }
};

const findCash = async (type) => {
  try {
    const [results, metadata] = await sequelizee.query(
      `
      select sum(r.full_price) as full_price
from requests r
where r.status = 'finished'
  and r.deleted_at is null
  ${
    type == "month"
      ? "and (created_at > date_trunc('month', CURRENT_DATE))"
      : ""
  }
      `,
      {
        type: sequelize.QueryTypes.SELECT, // Явно указываем тип запроса
      }
    );

    return results;
  } catch (error) {
    throw new Error(error);
  }
};

const countRequests = async (type) => {
  try {
    const [results, metadata] = await sequelizee.query(
      `
      select count(r.id)
from requests r
where r.status = 'finished'
  and r.deleted_at is null
  ${
    type == "month"
      ? "and (created_at > date_trunc('month', CURRENT_DATE))"
      : ""
  }
      `,
      {
        type: sequelize.QueryTypes.SELECT, // Явно указываем тип запроса
      }
    );

    return results;
  } catch (error) {
    throw new Error(error);
  }
};

const getCustomers = async (type) => {
  try {
    let where = {
      status: "finished",
    };
    if (type === "month") {
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      where = {
        status: "finished",
        created_at: {
          [Op.between]: [startOfMonth, endOfMonth],
        },
      };
    }

    const results = await RequestModel.findAll({
      where,
      group: ["phone"],
      attributes: [
        "phone",
        [sequelize.fn("SUM", sequelize.col("full_price")), "total_price"],
        [sequelize.fn("COUNT", sequelize.col("id")), "total_count"],
      ],
      order: sequelize.literal("total_price DESC"),
      limit: 5,
    });
    return results;
  } catch (error) {
    throw new Error(error);
  }
};

export { findTopProducts, findCash, countRequests, getCustomers };
