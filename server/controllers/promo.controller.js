import {
  findAll,
  findOne,
  createItem,
  updateItem,
  deleteItem,
  checkPromo,
} from "../services/promo.service.js";

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

const CHECKPROMO = async (req, res) => {
  try {
    const items = await checkPromo({ promo_code: req.query.check_promo });
    return res.status(200).send(items);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
};

const CREATE = async (req, res) => {
  try {
    const { promo_code, count, expired_at, is_infinite } = req.body;

    const item = await createItem({
      promo_code,
      count,
      expired_at,
      is_infinite,
    });
    return res.status(200).send(item);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
};

const UPDATE = async (req, res) => {
  try {
    const { id } = req.params;
    const { count, expired_at, is_infinite } = req.body;
    const item = await updateItem({ id, count, expired_at, is_infinite });
    return res.status(200).send(item);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
};

const DELETE = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await deleteItem({ id });
    return res.status(200).send(item);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
};

export { GET, GETID, CREATE, UPDATE, DELETE, CHECKPROMO };
