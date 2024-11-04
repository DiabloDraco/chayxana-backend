import RequestModel from "../models/request.model.js";
import OrderModel from "../models/order.model.js";
import ProductModel from "../models/product.model.js";
import { DECIMAL, Op } from "sequelize";
import DiscountModel from "../models/discount.model.js";
import PromoModel from "../models/promo.model.js";
import UserModel from "../models/user.model.js";
import UserPromoModel from "../models/userPromo.model.js";

const createOrder = async ({
  orders,
  phone,
  address,
  branch,
  comment,
  name,
  delivery_id,
  target,
  delivery_range,
  promo,
  entrance,
  floor,
  room,
  user_id,
}) => {
  try {
    const user = await UserModel.findOne({
      where: {
        id: user_id,
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

    if (promo) {
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

      if (promo && !findedPromo) {
        throw new Error("Такого промокода не существует!");
      }

      const userPromo = await UserPromoModel.findOne({
        where: { user_id: user.id, promo_id: findedPromo.id },
      });

      if (userPromo) {
        throw new Error("Вы уже активировали этот промокод!");
      }

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

      const orderPrices = await Promise.all(
        orders.map((order) => getProductPrice(order.product_id, order.quantity))
      );

      let full_price = orderPrices.reduce((acc, price) => {
        if (typeof price !== "number") {
          throw new Error(`Invalid price value: ${price}`);
        }
        return acc + price;
      }, 0);

      if (full_price > 1199 && user.is_first && promo == null) {
        full_price -= 300;
        user.is_first = false;
        await user.save();
      } else if (!user.is_first && promo) {
        full_price -= (full_price * findedPromo.discount) / 100;
      }
      const finalPrice = full_price;
      console.log("findedPromo:", findedPromo); // Убедитесь, что findedPromo это объект или null
      console.log("findedPromo.id:", findedPromo ? findedPromo.id : null);

      const request = await RequestModel.create(
        {
          full_price:
            delivery_id == 1 ? finalPrice + delivery_price : finalPrice,
          phone,
          address,
          delivery_id,
          branch,
          comment,
          name,
          discount_id: findedPromo ? findedPromo.id : null,
          target,
          user_id: user_id,
          entrance,
          floor,
          room,
        },
        { returning: true }
      );

      if (!findedPromo && !user.is_first) {
        user.cashback += finalPrice * 0.02;
        await user.save();
      } else if (findedPromo) {
        if (!findedPromo.is_infinite) {
          findedPromo.count -= 1;
          await findedPromo.save();
        }
      }
      if (!request) {
        throw new Error("Failed to create request");
      }

      await UserPromoModel.create({
        user_id: user.id,
        promo_id: findedPromo.id,
      });

      for (let order of orders) {
        order.request_id = request.id;
        await OrderModel.create(order);
      }

      return request;
    } else {
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

      const orderPrices = await Promise.all(
        orders.map((order) => getProductPrice(order.product_id, order.quantity))
      );

      let full_price = orderPrices.reduce((acc, price) => {
        if (typeof price !== "number") {
          throw new Error(`Invalid price value: ${price}`);
        }
        return acc + price;
      }, 0);

      if (full_price > 1199 && user.is_first && promo == null) {
        full_price -= 300;
        user.is_first = false;
        await user.save();
      }
      const finalPrice = full_price;

      const request = await RequestModel.create(
        {
          full_price:
            delivery_id == 1 ? finalPrice + delivery_price : finalPrice,
          phone,
          address,
          delivery_id,
          branch,
          comment,
          name,
          discount_id: null,
          target,
          user_id: user_id,
          entrance,
          floor,
          room,
        },
        { returning: true }
      );

      if (!user.is_first) {
        user.cashback += finalPrice * 0.02;
        await user.save();
      }
      if (!request) {
        throw new Error("Failed to create request");
      }

      for (let order of orders) {
        order.request_id = request.id;
        await OrderModel.create(order);
      }

      return request;
    }
  } catch (error) {
    throw new Error(error.message);
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

    let full_price = orderPrices.reduce((acc, price) => {
      if (typeof price !== "number") {
        throw new Error(`Invalid price value: ${price}`);
      }
      return acc + price;
    }, 0);

    const discountAmount = await applyDiscount(full_price);

    const finalPrice = findedPromo
      ? (full_price - discountAmount.discounted) * (findedPromo.discount / 100)
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

    if (findedPromo) {
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

const findDiscount = async ({ promo_code, user_id }) => {
  try {
    const findedPromo = await PromoModel.findOne({
      where: {
        promo_code: promo_code,
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

    if (promo && !findedPromo) {
      throw new Error("Такого промокода не существует!");
    }

    console.log(findedPromo, "findedPromo");

    const findedUserPromo = await UserPromoModel.findOne({
      where: { user_id: user_id, promo_id: findedPromo.id },
    });

    if (findedUserPromo) {
      throw new Error("Вы уже активировали этот промокод!");
    }

    return findedPromo;
  } catch (error) {
    console.log(error);

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
          model: PromoModel,
          as: "discount",
          attributes: [["discount", "percentage"]],
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
          model: PromoModel,
          as: "discount",
          attributes: [["discount", "percentage"]],
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

const findOneUser = async ({ user_id }) => {
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
          model: PromoModel,
          as: "discount",
          attributes: [["discount", "percentage"]],
        },
      ],
      where: {
        user_id,
      },
      order: [["created_at", "DESC"]],
    });

    return orders;
  } catch (error) {
    throw new Error(error);
  }
};

const updateItem = async (id, status) => {
  try {
    const order = await RequestModel.findOne({ where: { id } });
    const user = UserModel.findOne({ where: { id: order.user_id } });
    order.discount_id;
    if (!order) return new Error("Item not found");
    if (!order.discount_id) {
      if (order.delivery_id == 1) {
        user.cashback += (order.full_price - 550) * 0.02;
        await user.save();
      } else {
        user.cashback += order.full_price * 0.02;
        await user.save();
      }
    }
    order.status = status || order.status;
    await order.save();

    return order;
  } catch (error) {
    throw new Error(error);
  }
};

export {
  createRequest,
  findAll,
  findOne,
  updateItem,
  findDiscount,
  findOneUser,
  createOrder,
};
