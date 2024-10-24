import { DataTypes } from "sequelize";
import UserModel from "../models/user.model.js";
import { generateRefreshToken, generateToken } from "../plugins/jwt.js";
import RoleModel from "../models/role.model.js";

const loginAdmin = async (login, password) => {
  try {
    const user = await UserModel.findOne({
      where: {
        login,
        password,
      },
      include: [
        {
          model: RoleModel,
          as: "role",
          attributes: ["name"],
        },
      ],
    });

    if (!user.id) return new Error("invalid code");

    let payload = {
      id: user.id,
      roles: [user.role.name],
    };

    const token = await generateToken(payload);
    const refresh_token = await generateRefreshToken(payload);

    return {
      message: "success",
      token,
      refresh_token,
    };
  } catch (error) {
    throw new Error("Invalid password or login");
  }
};

const me = async (id) => {
  try {
    const item = await UserModel.findOne({
      where: { id },
      include: [
        {
          model: RoleModel,
          as: "role",
          attributes: ["name"],
        },
      ],
    });

    delete item.dataValues.password;
    delete item.dataValues.code;

    if (!item) return new Error("user not found");

    return item;
  } catch (error) {
    throw new Error(error);
  }
};

const findAllRoles = async () => {
  try {
    const items = await RoleModel.findAll();

    return items;
  } catch (error) {
    throw new Error(error);
  }
};

const registerCode = async ({ code, phone }) => {
  try {
    const user = await UserModel.findOne({ where: { phone } });
    if (user) {
      user.code = code || code;
      return await user.save();
    } else {
      const item = await UserModel.create({
        code,
        phone,
      });

      return item;
    }
  } catch (error) {
    throw new Error(error);
  }
};

const registerUser = async ({
  name,
  birth_date,
  gender,
  login,
  password,
  phone,
  code,
  referal,
}) => {
  try {
    const user = await UserModel.findOne({ where: { phone, code } });

    if (!user) throw new Error("User not found");

    user.name = name || user.name;
    user.birth_date = birth_date || user.birth_date;
    user.gender = gender || user.gender;
    user.login = login || user.login;
    user.password = password || user.password;
    user.role_id = 4;
    if (referal) {
      const parent = await UserModel.findOne({
        where: { referralCode: referal },
      });
      user.parent_id = parent ? parent.id : null;
    }

    return await user.save();
  } catch (error) {
    throw new Error(error);
  }
};
export { me, loginAdmin, findAllRoles, registerCode, registerUser };
