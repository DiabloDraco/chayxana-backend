import sequelize from "../plugins/sequalize.js";
import { DataTypes } from "sequelize";

const DialogModel = sequelize.define(
  "dialogs",
  {
    id: {
      primaryKey: true,
      type: DataTypes.BIGINT,
      autoIncrement: true,
      unique: true,
      allowNull: false,
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
    user_id: {
      type: DataTypes.BIGINT,
      references: {
        model: "users",
        key: "id",
      },
    },
  },
  {
    underscored: true,
    timestamps: true,
    paranoid: true,
    freezeTableName: true,
  }
);

export default DialogModel;
