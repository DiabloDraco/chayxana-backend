import deletePhoto from "../plugins/file.js";
import {
  findAll,
  findOne,
  deleteItem,
  updateItem,
  createItem,
} from "../services/gallery.service.js";

const GET = async (req, res) => {
  try {
    const items = await findAll();

    res.status(200).send(items);
  } catch (error) {
    res.status(400).send(error);
  }
};

const GETID = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await findOne(id);
    res.status(200).send(item);
  } catch (error) {
    res.status(400).send(error);
  }
};

const POST = async (req, res) => {
  try {
    const filename = req.file.filename;

    if (!filename) {
      throw new Error("All datas is required");
    }

    const item = await createItem({ photo: filename });
    res.status(200).send(item);
  } catch (error) {
    res.status(400).send(error);
  }
};

const PUT = async (req, res) => {
  try {
    const { id } = req.params;
    const oldItem = await findOne(id);

    if (req.file) {
      const filename = req.file.filename;

      const item = await updateItem({ photo: filename, id });
      await deletePhoto(oldItem.photo);
      res.status(200).send(item);
    } else {
      throw new Error("All datas is required");
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

const DELETE = async (req, res) => {
  try {
    const { id } = req.params;

    const oldItem = await findOne(id);

    const item = await deleteItem({ id });

    await deletePhoto(oldItem.photo);

    res.status(200).send(item);
  } catch (error) {
    res.status(400).send(error);
  }
};

export { GET, GETID, POST, PUT, DELETE };
