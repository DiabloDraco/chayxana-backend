import sequelize from "../plugins/sequalize.js";
import { DataTypes } from "sequelize";

const UserModel = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    deleted_at: {
      type: DataTypes.DATE,
    },
    name: {
      type: DataTypes.STRING,
    },
    birth_date: {
      type: DataTypes.DATE,
    },
    gender: {
      type: DataTypes.ENUM("male", "female"),
    },
    address: {
      type: DataTypes.STRING,
    },
    position: {
      type: DataTypes.STRING,
    },
    entrance: {
      type: DataTypes.STRING,
    },
    floor: {
      type: DataTypes.STRING,
    },
    room: {
      type: DataTypes.STRING,
    },
    comment: {
      type: DataTypes.STRING,
    },
    surname: {
      type: DataTypes.STRING,
    },
    login: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
      unique: true,
    },
    photo: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    code: {
      type: DataTypes.STRING,
      unique: true,
    },
    role_id: {
      type: DataTypes.BIGINT,
      references: {
        model: "roles", // указываем модель ролей
        key: "id", // ключ в модели ролей
      },
    },
    parent_id: {
      type: DataTypes.BIGINT,
      references: {
        model: "users", // указываем модель ролей
        key: "id", // ключ в модели ролей
      },
    },
    is_first: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    cashback: {
      type: DataTypes.DECIMAL(10, 2),
      get() {
        const rawValue = this.getDataValue("cashback");
        // Пример кастинга в другой тип
        return Number(rawValue);
      },
    },
    mail: {
      type: DataTypes.STRING,
    },
    referralCode: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  {
    underscored: true,
    timestamps: true,
  }
);

function generateReferralCode() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // Набор букв
  const digits = "0123456789"; // Набор цифр

  let code = "";

  // Генерируем 6 букв
  for (let i = 0; i < 6; i++) {
    code += letters.charAt(Math.floor(Math.random() * letters.length));
  }

  // Генерируем 2 цифры
  for (let i = 0; i < 2; i++) {
    code += digits.charAt(Math.floor(Math.random() * digits.length));
  }

  return code;
}

UserModel.beforeCreate(async (user) => {
  let referralCode;
  let isUnique = false;

  while (!isUnique) {
    referralCode = generateReferralCode();
    const existingUser = await UserModel.findOne({ where: { referralCode } });
    if (!existingUser) {
      isUnique = true;
    }
  }

  user.referralCode = referralCode;
});

export default UserModel;
