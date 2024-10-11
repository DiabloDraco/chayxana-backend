import {
  me,
  loginAdmin,
  findAllRoles,
  registerCode,
  registerUser,
} from "../services/auth.service.js";
import { sendMessageToAuthChannel } from "../plugins/telegram.js";

const login = async (req, res) => {
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

const sendRegisterCode = async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) throw new Error("All datas is required");

    const code = Math.floor(1000 + Math.random() * 9000);

    const user = await registerCode({ code, phone });

    console.log(code);

    await sendMessageToAuthChannel(`${code}`);

    res.status(200).send("Code sended");
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const register = async (req, res) => {
  try {
    const { name, birth_date, gender, login, phone, code, password } = req.body;

    if (!name || !birth_date || !gender || !login || !phone || !code)
      throw new Error("All datas is required");

    const user = await registerUser({
      name,
      birth_date,
      gender,
      login,
      password,
      phone,
      code,
    });

    const tokens = await loginAdmin(login, password);

    res.status(201).send(tokens);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

export { login, myUser, getRoles, sendRegisterCode, register };
