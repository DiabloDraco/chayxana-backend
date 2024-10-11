import { DataTypes } from "sequelize";
import sequelize from "../plugins/sequalize.js";

const ProductCategoryModel = sequelize.define(
  "product_category",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
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
    description: {
      type: DataTypes.STRING,
    },
    sort_order: {
      type: DataTypes.BIGINT,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    paranoid: true,
    underscored: true,
  }
);

export default ProductCategoryModel;
