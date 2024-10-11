import { DataTypes } from "sequelize";
import sequelize from "../plugins/sequalize.js";

const DiscountModel = sequelize.define(
  "discounts",
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
    description: {
      type: DataTypes.STRING,
    },
    percentage: {
      type: DataTypes.INTEGER,
    },
    price_up: {
      type: DataTypes.DECIMAL(10, 2),
      get() {
        const rawValue = this.getDataValue("price_up");
        // Пример кастинга в другой тип
        return Number(rawValue);
      },
    },
  },
  {
    timestamps: true,
    paranoid: true,
    freezeTableName: true,
    underscored: true,
  }
);

export default DiscountModel;
