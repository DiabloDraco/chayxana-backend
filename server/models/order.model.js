import { DataTypes } from "sequelize";
import sequelize from "../plugins/sequalize.js";

const OrderModel = sequelize.define("orders", {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
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
  quantity: {
    type: DataTypes.INTEGER,
  },
  product_id: {
    type: DataTypes.BIGINT,
    references: {
      model: "products",
      key: "id",
    },
    allowNull: false,
  },
  request_id: {
    type: DataTypes.BIGINT,
    references: {
      model: "requests",
      key: "id",
    },
    allowNull: false,
  },
});

export default OrderModel;
