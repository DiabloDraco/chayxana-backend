import { DataTypes } from "sequelize";
import sequelize from "../plugins/sequalize.js";

const NotesModel = sequelize.define(
  "notes",
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
    text: {
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

export default NotesModel;
