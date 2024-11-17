import sequelize from "../plugins/sequalize.js";
import { DataTypes } from "sequelize";

const MessageModel = sequelize.define(
  "messages",
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
    is_user: {
      type: DataTypes.BOOLEAN,
    },
    dialog_id: {
      type: DataTypes.BIGINT,
      references: {
        model: "dialogs",
        key: "id",
      },
    },
    text: {
      type: DataTypes.STRING,
    },
    file: {
      type: DataTypes.STRING,
    },
  },
  {
    underscored: true,
    timestamps: true,
    paranoid: true,
    freezeTableName: true,
  }
);

export default MessageModel;
