import {
  sendMessage,
  findAll,
  findDialogs,
  deleteDialog,
  createDialogs,
  findDialogItem,
} from "../services/chat.service.js";
import { getIO } from "../plugins/socket.js";

const sendMessages = async (req, res) => {
  try {
    const { dialog_id, message, is_user } = req.body;
    const file_id = req.file.filename;

    await getIO().emit("newMessage");

    const newMessage = await sendMessage(dialog_id, message, file_id, is_user);
    res.status(200).json(newMessage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const findAllMessages = async (req, res) => {
  try {
    const { id } = req.params;
    const items = await findAll(id);
    res.status(200).json(items);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const findAllDialogs = async (req, res) => {
  try {
    const user = req.user.id;

    const items = await findDialogs(user);
    res.status(200).json(items);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const findDialog = async (req, res) => {
  try {
    const user = req.user.id;

    const items = await findDialogItem(user);
    res.status(200).json(items);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteDialogs = async (req, res) => {
  try {
    const { id } = req.params;
    const items = await deleteDialog(id);
    res.status(200).json(items);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const createDialog = async (req, res) => {
  try {
    const user = req.user.id;
    const items = await createDialogs(user);

    await getIO().emit("newDialog");

    res.status(200).json(items);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export {
  sendMessages,
  findAllMessages,
  findAllDialogs,
  deleteDialogs,
  createDialog,
  findDialog,
};
