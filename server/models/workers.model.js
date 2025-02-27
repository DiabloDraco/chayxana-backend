import { DataTypes } from "sequelize";
import sequelize from "../plugins/sequalize.js";

const WorkersModel = sequelize.define(
  "workers",
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
    name: {
      type: DataTypes.STRING,
    },
    position: {
      type: DataTypes.STRING,
    },
    photo: {
      type: DataTypes.STRING,
    },
    rating: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    ratesCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    paranoid: true,
    underscored: true,
  }
);

export default WorkersModel;
