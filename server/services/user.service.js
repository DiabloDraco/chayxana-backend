import { DataTypes } from "sequelize";
import UserModel from "../models/user.model.js";

const findAll = async () => {
  try {
    const items = await UserModel.findAll({
      order: [["created_at", "DESC"]],
    });

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

const insertItem = async ({
  name,
  surname,
  login,
  password,
  role_id,
  photo,
  phone,
}) => {
  try {
    const item = await UserModel.create(
      { name, surname, login, password, role_id, photo, phone },
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
  name,
  surname,
  birth_date,
  gender,
  address,
  position,
  entrance,
  floor,
  room,
  comment,
  mail,
}) => {
  try {
    const item = await UserModel.findOne({ where: { id } });

    item.name = name || item.name;
    item.surname = surname || item.surname;
    item.birth_date = birth_date || item.birth_date;
    item.gender = gender || item.gender;
    item.address = address || item.address;
    item.position = position || item.position;
    item.entrance = entrance || item.entrance;
    item.floor = floor || item.floor;
    item.room = room || item.room;
    item.comment = comment || item.comment;
    item.mail = mail || item.mail;
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
