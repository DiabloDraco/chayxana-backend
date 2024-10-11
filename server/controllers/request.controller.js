import {
  createRequest,
  findAll,
  findOne,
  updateItem,
  findDiscount,
} from "../services/request.service.js";
import { sendMessageToChannel } from "../plugins/telegram.js";
import { getIO } from "../plugins/socket.js";
import RequestModel from "../models/request.model.js";

const POST = async (req, res) => {
  try {
    const {
      orders,
      phone,
      address,
      branch,
      comment,
      name,
      delivery_id,
      target,
    } = req.body;

    const user = req.user.id;

    const request = await createRequest(
      orders,
      phone,
      address,
      branch,
      comment,
      name,
      delivery_id,
      target,
      user
    );

    if (request instanceof Error) {
      return res.status(400).json({ message: request.message });
    }

    await getIO().emit("newRequst");

    return res.status(201).json(request);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const GET = async (req, res) => {
  try {
    const items = await findAll();
    return res.status(200).send(items);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
};

const GETID = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await findOne(id);
    return res.status(200).send(item);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
};

const CHECK = async (req, res) => {
  try {
    const { orders, phone } = req.body;

    const discount = await findDiscount(orders, phone);

    return res.status(200).send(discount);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
};

const UPDATE = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const item = await updateItem(id, status);
    await getIO().emit("newRequst");
    return res.status(200).send(item);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
};

const CALLBACK = async (req, res) => {
  try {
    const order = await findOne(req.body.OrderId);
    await sendMessageToChannel(
      `
=======================================================\n
Имя заказчика: ${order.name},
Телефон: ${order.phone},
Статус: ${req.body.Status},
Комментарий: ${order.comment || "Нет комментариев"},
Номер заказа: ${req.body.OrderId},
Сумма: ${req.body.Amount / 100},
Карта: ${req.body.Pan},
мес/год: ${req.body.ExpDate},
Скидка: ${order.discount ? order.discount.percentage : false || 0}%,
Адрес: ${order.address}
Ссылка на заказ: https://tashkentcityuz.ru/payment?order_id=${
        req.body.OrderId
      } \n
=======================================================
`
    );

    if (req.body.Status == "CONFIRMED") {
      await updateItem(req.body.OrderId, "pending");
    } else if (req.body.Status == "REJECTED") {
      await updateItem(req.body.OrderId, "cancelled");
    }

    return res.status(200).send("OK");
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
};

export { POST, GET, GETID, UPDATE, CHECK, CALLBACK };
