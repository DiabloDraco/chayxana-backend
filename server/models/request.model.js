import { DataTypes } from "sequelize";
import sequelize from "../plugins/sequalize.js";
import PromoModel from "./promo.model.js";

const RequestModel = sequelize.define(
  "requests",
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
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    deleted_at: {
      type: DataTypes.DATE,
    },
    phone: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    branch: {
      type: DataTypes.STRING,
    },
    comment: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.ENUM(
        "waiting",
        "pending",
        "working",
        "finished",
        "cancelled"
      ),
      defaultValue: "waiting",
    },
    full_price: {
      type: DataTypes.DECIMAL(10, 2),
    },
    discount_id: {
      type: DataTypes.BIGINT,
      references: {
        model: PromoModel,
        key: "id",
      },
    },
    delivery_id: {
      type: DataTypes.INTEGER,
    },
    target: {
      type: DataTypes.JSONB,
    },
    user_id: {
      type: DataTypes.BIGINT,
      references: {
        model: "users",
        key: "id",
      },
    },
    delivery_date: {
      type: DataTypes.DATE,
    },
    delivery_time: {
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
    delivery_by: {
      type: DataTypes.BIGINT,
      references: {
        model: "users",
        key: "id",
      },
    },
  },
  {
    timestamps: true,
    underscored: true,
    freezeTableName: true,
    paranoid: true,
  }
);

export default RequestModel;
