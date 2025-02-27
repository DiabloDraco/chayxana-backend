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
    throw new Error(error.message);
  }
};

const loginUser = async (phone, password) => {
  try {
    const user = await UserModel.findOne({
      where: {
        phone,
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

const registerUser = async ({ name, password, phone, referal, mail }) => {
  try {
    if (mail) {
      const isMail = await UserModel.findOne({
        where: { mail },
      });

      if (isMail) {
        throw new Error("Mail already exists");
      }
    }
    if (referal) {
      const parent = await UserModel.findOne({
        where: { referralCode: referal },
      });

      const user = await UserModel.create({
        name,
        password,
        phone,
        parent_id: parent ? parent.id : null,
        role_id: 4,
        mail,
      });

      return await user.save();
    } else {
      const user = await UserModel.create({
        name,
        password,
        phone,
        parent_id: null,
        role_id: 4,
        mail,
      });

      return await user.save();
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
export { me, loginAdmin, findAllRoles, registerUser, loginUser };
