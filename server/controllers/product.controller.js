import {
  deleteItem,
  findAll,
  findOne,
  insertItem,
  updateItem,
  findAllByCategory,
  findSearch,
} from "../services/product.service.js";
import deletePhoto from "../plugins/file.js";

const GET = async (req, res) => {
  try {
    const { category_id } = req.query;
    let items;
    if (category_id) {
      items = await findAllByCategory(category_id);
    } else {
      items = await findAll();
    }

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
    const {
      category_id,
      name,
      price,
      description,
      on_shop,
      is_reccomend,
      is_set,
    } = req.body;
    const filename = req.file.filename;
    const user_id = req.user.id;
    if (
      !user_id ||
      !category_id ||
      !name ||
      !price ||
      !filename ||
      !description ||
      !on_shop ||
      !is_reccomend ||
      !is_set
    )
      throw new Error("All datas is required");
    const item = await insertItem({
      user_id,
      category_id,
      name,
      photo: filename,
      price,
      description,
      on_shop,
      is_reccomend,
      is_set,
    });

    res.status(200).send(item);
  } catch (error) {
    console.log(error.message);
    res.status(400).send(error);
  }
};

const UPDATE = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      category_id,
      name,
      price,
      description,
      on_shop,
      is_reccomend,
      is_set,
    } = req.body;
    const user_id = req.user.id;

    if (!id) return new Error("Id не обнаружен");
    if (req.file) {
      const filename = req.file.filename;

      const oldItem = await findOne(id);
      if (!oldItem) return new Error("Wrong id");

      await deletePhoto(oldItem.photo);
      const newItem = await updateItem({
        user_id,
        category_id,
        name,
        photo: filename,
        price,
        description,
        on_shop,
        id,
        is_reccomend,
        is_set,
      });
      res.status(200).send("Файл успешно обновлен и старый файл удален.");
    } else {
      await updateItem({
        user_id,
        category_id,
        name,
        price,
        description,
        on_shop,
        id,
        is_reccomend,
        is_set,
      });
      res.status(200).send("Успешно обвновлено");
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

const DELETE = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) return new Error("Id не найден");

    const deleted = await deleteItem({ id });

    deletePhoto(deleted.photo);

    res.status(200).send({ message: "Deleted" });
  } catch (error) {
    res.status(400).send(error);
  }
};

const SEARCH = async (req, res) => {
  try {
    const { search } = req.query;

    const items = await findSearch(search);

    res.status(200).send(items);
  } catch (error) {
    res.status(400).send(error);
  }
};

export { GET, GETID, POST, UPDATE, DELETE, SEARCH };
