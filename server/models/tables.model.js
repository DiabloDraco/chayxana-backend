import { DataTypes } from "sequelize";
import sequelize from "../plugins/sequalize.js";

const TablesModel = sequelize.define("tables", {
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
  is_account: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  table_id: {
    type: DataTypes.BIGINT,
  },
  is_watched: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

export default TablesModel;
