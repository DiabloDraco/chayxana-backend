import { DataTypes, NUMBER } from "sequelize";
import sequelize from "../plugins/sequalize.js";

const ProductModel = sequelize.define(
  "products",
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
    user_id: {
      type: DataTypes.BIGINT,
      references: {
        model: "users",
        key: "id",
      },
    },
    category_id: {
      type: DataTypes.BIGINT,
      references: {
        model: "product_category",
        key: "id",
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    photo: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      get() {
        const rawValue = this.getDataValue("price");
        // Пример кастинга в другой тип
        return Number(rawValue);
      },
    },
    description: {
      type: DataTypes.STRING,
    },
    on_shop: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    is_reccomend: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_set: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    paranoid: true,
    underscored: true,
  }
);

export default ProductModel;
