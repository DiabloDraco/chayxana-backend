import { DataTypes } from "sequelize";
import sequelize from "../plugins/sequalize.js";

const ListsModel = sequelize.define(
  "lists",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
    },
    deleted_at: {
      type: DataTypes.DATE,
    },
    deleted_by: {
      type: DataTypes.BIGINT,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    created_by: {
      type: DataTypes.BIGINT,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
    updated_by: {
      type: DataTypes.BIGINT,
    },
    type_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name1: {
      type: DataTypes.STRING,
    },
    name2: {
      type: DataTypes.STRING,
    },
    name3: {
      type: DataTypes.STRING,
    },
    name4: {
      type: DataTypes.STRING,
    },
    val01: {
      type: DataTypes.STRING,
    },
    val02: {
      type: DataTypes.STRING,
    },
    val03: {
      type: DataTypes.STRING,
    },
    val04: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    underscored: true,
  }
);

export default ListsModel;
