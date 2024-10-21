import RequestModel from "../models/request.model.js";
import OrderModel from "../models/order.model.js";
import ProductModel from "../models/product.model.js";
import { DECIMAL, Op } from "sequelize";
import DiscountModel from "../models/discount.model.js";
import PromoModel from "../models/promo.model.js";
import UserModel from "../models/user.model.js";

const applyDiscount = async (totalAmount) => {
  try {
    const bestDiscount = await DiscountModel.findOne({
      attributes: ["percentage", "id"],
      where: {
        price_up: {
          [Op.lt]: totalAmount,
        },
      },
      order: [["percentage", "DESC"]],
    });
    if (bestDiscount) {
      const discountedAmount = (totalAmount * bestDiscount.percentage) / 100;
      return {
        discounted: discountedAmount,
        discount_id: bestDiscount.id,
      };
    }

    return {
      discounted: 0,
      discount_id: null,
    };
  } catch (error) {
    console.error("Error applying discount:", error.message);
    throw new Error("Error applying discount");
  }
};

const createRequest = async (
  orders,
  phone,
  address,
  branch,
  comment,
  name,
  delivery_id,
  target,
  user,
  delivery_range,
  promo,
  payment_type,
  entrance,
  floor,
  room
) => {
  try {
    const findedPromo = await PromoModel.findOne({
      where: {
        promo_code: promo,
        [Op.or]: [
          {
            count: {
              [Op.gt]: 0,
            },
          },
          {
            is_infinite: {
              [Op.eq]: true,
            },
          },
        ],
        expired_at: {
          [Op.gte]: new Date(),
        },
      },
    });

    const delivery_price =
      delivery_range == 1
        ? 350
        : delivery_range == 2
        ? 450
        : delivery_range == 3
        ? 550
        : 0;
    const getProductPrice = async (productId, quantity) => {
      const product = await ProductModel.findOne({
        attributes: ["price"],
        where: { id: productId },
      });

      if (!product) {
        throw new Error(`Product with id ${productId} not found`);
      }

      return product.dataValues.price * quantity;
    };

    const finded = await RequestModel.findOne({
      where: {
        phone,
        status: {
          [Op.ne]: "cancelled",
        },
      },
    });

    const orderPrices = await Promise.all(
      orders.map((order) => getProductPrice(order.product_id, order.quantity))
    );

    const full_price = orderPrices.reduce((acc, price) => {
      if (typeof price !== "number") {
        throw new Error(`Invalid price value: ${price}`);
      }
      return acc + price;
    }, 0);

    const discountAmount = await applyDiscount(full_price);

    const finalPrice = findedPromo
      ? (full_price - discountAmount.discounted) / findedPromo.discount
      : full_price - discountAmount.discounted;

    const request = await RequestModel.create(
      {
        full_price: delivery_id == 1 ? finalPrice + delivery_price : finalPrice,
        phone,
        address,
        delivery_id,
        branch,
        comment,
        name,
        discount_id: finded ? null : discountAmount.discount_id,
        target,
        user_id: user,
        entrance,
        floor,
        room,
      },
      { returning: true }
    );

    if (!findedPromo && !finded) {
      const findedUser = await UserModel.findOne({
        where: {
          id: user,
        },
      });

      findedUser.cashback += finalPrice * 0.02;
      await findedUser.save();
    } else if (findedPromo) {
      findedPromo.count -= 1;
      await findedPromo.save();
    }
    if (!request) {
      throw new Error("Failed to create request");
    }

    for (let order of orders) {
      order.request_id = request.id;
      await OrderModel.create(order);
    }

    return request;
  } catch (error) {
    console.error("Error in createRequest:", error.message);
    throw new Error(error.message);
  }
};

const findDiscount = async (orders, phone) => {
  try {
    const getProductPrice = async (productId, quantity) => {
      const product = await ProductModel.findOne({
        attributes: ["price"],
        where: { id: productId },
      });

      if (!product) {
        throw new Error(`Product with id ${productId} not found`);
      }

      return product.dataValues.price * quantity;
    };

    const finded = await RequestModel.findOne({
      where: {
        phone,
        status: {
          [Op.ne]: "cancelled",
        },
      },
    });

    const orderPrices = await Promise.all(
      orders.map((order) => getProductPrice(order.product_id, order.quantity))
    );

    const full_price = orderPrices.reduce((acc, price) => {
      if (typeof price !== "number") {
        throw new Error(`Invalid price value: ${price}`);
      }
      return acc + price;
    }, 0);

    const discountAmount = await applyDiscount(full_price);

    const finalPrice = full_price - discountAmount.discounted;

    if (finded) {
      return {
        message: "Не первый заказ",
        status: "already",
        price: full_price,
      };
    }

    if (finalPrice == full_price) {
      return {
        message: "Не достаточно для скидки",
        status: "not_enough",
        price: full_price,
      };
    }

    return {
      message: "Скидка",
      status: "success",
      price: finalPrice,
      percentage: (discountAmount.discounted / full_price) * 100,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

const findAll = async () => {
  try {
    const orders = await RequestModel.findAll({
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
        {
          model: DiscountModel,
          as: "discount",
          attributes: ["percentage"],
        },
      ],
      order: [["created_at", "DESC"]],
    });

    return orders;
  } catch (error) {
    throw new Error(error);
  }
};

const findOne = async (id) => {
  try {
    const orders = await RequestModel.findOne({
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
        {
          model: DiscountModel,
          as: "discount",
          attributes: ["percentage"],
        },
      ],
      where: {
        id,
      },
    });

    return orders;
  } catch (error) {
    throw new Error(error);
  }
};

const updateItem = async (id, status) => {
  try {
    const order = await RequestModel.findOne({ where: { id } });

    if (!order) return new Error("Item not found");

    order.status = status || order.status;
    const saved = await order.save();

    return order;
  } catch (error) {
    throw new Error(error);
  }
};

export { createRequest, findAll, findOne, updateItem, findDiscount };
