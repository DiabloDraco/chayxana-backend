import { Op } from "sequelize";
import DiscountModel from "../models/discount.model.js";
import OrderModel from "../models/order.model.js";
import ProductModel from "../models/product.model.js";
import RequestModel from "../models/request.model.js";
import UserModel from "../models/user.model.js";

const findMyOrders = async ({ user_id }) => {
  try {
    const orders = await RequestModel.findAll({
      where: {
        delivery_by: user_id,
      },
      include: [
        {
          model: UserModel,
          as: "courier",
          attributes: ["name", "phone"],
        },
        {
          model: OrderModel,
          as: "items",
          include: [
            {
              model: ProductModel,
              as: "product",
              attributes: ["price", "name", "photo"],
            },
          ],
        },
      ],
      order: [["created_at", "DESC"]],
    });

    return orders;
  } catch (error) {
    throw new Error(error.message);
  }
};

const findNewOrders = async () => {
  try {
    const orders = await RequestModel.findAll({
      where: {
        delivery_by: {
          [Op.is]: null,
        },
      },
      include: [
        {
          model: OrderModel,
          as: "items",
          include: [
            {
              model: ProductModel,
              as: "product",
              attributes: ["price", "name", "photo"],
            },
          ],
        },
      ],
      order: [["created_at", "DESC"]],
    });

    return orders;
  } catch (error) {
    throw new Error(error.message);
  }
};

const acceptOrder = async ({ user_id, id }) => {
  try {
    const order = await RequestModel.findOne({
      where: {
        id: id,
      },
    });

    order.delivery_by = user_id;

    await order.save();

    return order;
  } catch (error) {
    throw new Error(error.message);
  }
};

const finishOrder = async ({ id }) => {
  try {
    const order = await RequestModel.findOne({
      where: {
        id: id,
      },
    });

    order.delivery_time = new Date().getTime();
    order.delivery_date = new Date().toLocaleDateString();

    await order.save();

    return order;
  } catch (error) {
    throw new Error(error.message);
  }
};

export { findMyOrders, findNewOrders, acceptOrder, finishOrder };
