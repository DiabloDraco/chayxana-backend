import {
  findMyOrders,
  findNewOrders,
  acceptOrder,
  finishOrder,
} from "../services/courier.service.js";

const findAll = async (req, res) => {
  try {
    const items = await findMyOrders({ user_id: req.user.id });
    res.status(200).send(items);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const getAllNewOrders = async (req, res) => {
  try {
    const items = await findNewOrders({ user_id: req.user.id, status: "new" });
    res.status(200).send(items);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const applyDelivery = async (req, res) => {
  try {
    const { id } = req.body;
    const user_id = req.user.id;
    const items = await acceptOrder({ user_id, id });

    res.status(200).send(items);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const finishDelivery = async (req, res) => {
  try {
    const { id } = req.body;
    const user_id = req.user.id;
    const items = await finishOrder({ user_id, id });

    res.status(200).send(items);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

export { findAll, getAllNewOrders, applyDelivery, finishDelivery };
