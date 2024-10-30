import {
  deleteItem,
  findAll,
  findOne,
  insertItem,
  updateItem,
} from "../services/notes.service.js";
import deletePhoto from "../plugins/file.js";

const GET = async (req, res) => {
  try {
    const items = await findAll();

    res.status(200).send(items);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const GETID = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await findOne(id);

    if (!item) return new Error({ message: "Ничего не найдено" });

    res.status(200).send(item);
  } catch (error) {
    res.status(400).send({ message: error });
  }
};

const POST = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return new Error("All datas is required");

    const item = await insertItem({ text });

    res.status(200).send(item);
  } catch (error) {
    res.status(400).send(error);
  }
};

const UPDATE = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;

    if (!id) return new Error("Id не обнаружен");
    const newItem = await updateItem({
      text,
      id,
    });

    res.status(200).send("Успешно обновлен.");
  } catch (error) {
    res.status(400).send(error);
  }
};

const DELETE = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) return new Error("Id не найден");

    const deleted = await deleteItem({ id });

    res.status(200).send({ message: "Deleted" });
  } catch (error) {
    res.status(400).send(error);
  }
};

export { GET, GETID, POST, UPDATE, DELETE };
