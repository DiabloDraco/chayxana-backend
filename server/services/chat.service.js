import MessageModel from "../models/message.model.js";
import DialogModel from "../models/dialog.model.js";
import UserModel from "../models/user.model.js";
import { Op } from "sequelize";
import sequelize from "../plugins/sequalize.js";

const sendMessage = async (dialog_id, message, file_id, is_user) => {
  try {
    const dialog = await DialogModel.findByPk(dialog_id);

    if (!dialog) {
      throw new Error("Dialog not found");
    }

    const newMessage = await MessageModel.create({
      text: message,
      dialog_id,
      file: file_id || null,
      is_user,
    });

    return newMessage;
  } catch (error) {
    throw new Error(error.message);
  }
};

const findAll = async (dialog_id) => {
  try {
    const messages = await MessageModel.findAll({
      where: {
        dialog_id,
      },
    });

    await MessageModel.update(
      {
        is_read: true,
      },
      {
        where: {
          dialog_id,
        },
      }
    );

    return messages;
  } catch (error) {
    throw new Error(error.message);
  }
};

const findDialogs = async () => {
  try {
    const dialogs = await DialogModel.findAll({
      include: [
        {
          model: UserModel,
          as: "user",
          attributes: ["name", "phone", "photo"],
        },
      ],
    });

    for (let i = 0; i < dialogs.length; i++) {
      const messages = await MessageModel.count({
        where: {
          dialog_id: dialogs[i].dataValues.id,
          is_read: false,
        },
      });

      dialogs[i].dataValues.unread = messages;
    }
    return dialogs;
  } catch (error) {
    throw new Error(error.message);
  }
};

const findDialogItem = async (user_id) => {
  try {
    const dialogs = await DialogModel.findOne({
      where: {
        user_id,
      },
      include: [
        {
          model: MessageModel,
          as: "messages",
          attributes: [[sequelize.fn("COUNT", "*"), "unreads"]],
          where: {
            is_read: false,
          },
        },
      ],
    });

    return dialogs;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteDialog = async (dialog_id) => {
  try {
    const deletedDialog = await DialogModel.destroy({
      where: {
        id: dialog_id,
      },
    });

    return deletedDialog;
  } catch (error) {
    throw new Error(error.message);
  }
};

const createDialogs = async (user) => {
  try {
    const dialogs = await DialogModel.create({
      user_id: user,
    });

    return dialogs;
  } catch (error) {
    throw new Error(error.message);
  }
};

export {
  sendMessage,
  findAll,
  findDialogs,
  deleteDialog,
  createDialogs,
  findDialogItem,
};
