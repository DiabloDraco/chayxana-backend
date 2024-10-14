import { DataTypes } from "sequelize";
import UserModel from "../models/user.model.js";

const findAll = async () => {
  try {
    const items = await UserModel.findAll();

    return items;
  } catch (error) {
    throw new Error(error);
  }
};

const findOne = async (id) => {
  try {
    const item = await UserModel.findOne({ where: { id } });

    if (!item) return new Error("Не найдено");
    return item;
  } catch (error) {
    throw new Error(error);
  }
};

const insertItem = async ({ name, surname, login, password, role_id }) => {
  try {
    const item = await UserModel.create(
      { name, surname, login, password, role_id },
      { returning: true }
    );

    if (!item) return new Error();
    return item;
  } catch (error) {
    throw new Error(error);
  }
};

const deleteItem = async ({ id }) => {
  try {
    const item = await UserModel.findOne({ where: { id } });

    if (!item) return new Error("Item not found");

    return item.destroy();
  } catch (error) {
    throw new Error(error);
  }
};

const updatePhoto = async ({
  id,
  filename,
  login,
  name,
  surname,
  password,
  role_id,
}) => {
  try {
    const item = await UserModel.findOne({ where: { id } });

    item.login = login || item.login;
    item.name = name || item.name;
    item.surname = surname || item.surname;
    item.password = password || item.password;
    item.role_id = role_id || item.role_id;
    item.avatar = filename || item.avatar;

    const saved = await item.save();
    return saved;
  } catch (error) {
    throw new Error(error);
  }
};

const changePassword = async ({ password, new_password, user_id }) => {
  try {
    const item = await UserModel.findOne({ where: { id: user_id } });

    if (item.password == password) {
      item.password = new_password || item.password;
    } else {
      throw new Error("Неверный текущий пароль");
    }

    const saved = await item.save();
    return saved;
  } catch (error) {
    throw new Error(error);
  }
};

export {
  findAll,
  findOne,
  deleteItem,
  updatePhoto,
  insertItem,
  changePassword,
};
