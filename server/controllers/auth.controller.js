import {
  me,
  loginAdmin,
  findAllRoles,
  registerUser,
  loginUser,
} from "../services/auth.service.js";
import { sendMessageToAuthChannel } from "../plugins/telegram.js";

const loginAdmins = async (req, res) => {
  try {
    const { login, password } = req.body;

    if (!login || !password) throw new Error("All datas is required");

    const user = await loginAdmin(login, password);

    if (!user) throw new Error("user not found");

    res.status(200).send(user);
  } catch (error) {
    res.status(403).send({ message: error.message });
  }
};

const loginUsers = async (req, res) => {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) throw new Error("All datas is required");

    const user = await loginUser(phone, password);

    if (!user) throw new Error("user not found");

    res.status(200).send(user);
  } catch (error) {
    res.status(403).send({ message: error.message });
  }
};

const myUser = async (req, res) => {
  try {
    const user_id = req.user.id;

    if (!user_id) throw new Error("User not found");

    const user = await me(user_id);

    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const getRoles = async (req, res) => {
  try {
    const items = await findAllRoles();

    res.status(200).send(items);
  } catch (error) {
    res.status(400).send(error);
  }
};

const register = async (req, res) => {
  try {
    const { name, phone, password, referal, mail } = req.body;

    if (!phone || !password) throw new Error("All datas is required");

    const user = await registerUser({
      name,
      password,
      phone,
      referal,
      mail,
    });

    const tokens = await loginUser(phone, password);

    res.status(201).send(tokens);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

export { myUser, getRoles, register, loginAdmins, loginUsers };
