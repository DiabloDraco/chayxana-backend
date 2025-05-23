import {
  findAll,
  findOne,
  deleteItem,
  updateItem,
  createItem,
} from "../services/tables.service.js";
import { getIO } from "../plugins/socket.js";

const GET = async (req, res) => {
  try {
    const { branch_id } = req.query;
    const items = await findAll({ branch_id });

    res.status(200).send(items);
  } catch (error) {
    res.status(400).send(error.messages);
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
    const { is_account, table_id, branch_id } = req.body;

    if (!table_id || !branch_id) {
      throw new Error("All datas is required");
    }
    await getIO().emit("newTable");

    const item = await createItem({ is_account, table_id, branch_id });
    res.status(200).send(item);
  } catch (error) {
    res.status(400).send(error);
  }
};

const PUT = async (req, res) => {
  try {
    const { is_account, table_id, isWatched, branch_id } = req.body;
    const { id } = req.params;

    const item = await updateItem({
      is_account,
      table_id,
      isWatched,
      branch_id,
      id,
    });

    res.status(200).send(item);
  } catch (error) {
    res.status(400).send(error);
  }
};

const DELETE = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await deleteItem({ id });

    res.status(200).send(item);
  } catch (error) {
    res.status(400).send(error);
  }
};

export { GET, GETID, POST, PUT, DELETE };
