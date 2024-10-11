import { DataTypes } from "sequelize";
import sequelize from "../plugins/sequalize.js";

const PromoModel = sequelize.define(
  "promos",
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
    created_by: {
      type: DataTypes.BIGINT,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_by: {
      type: DataTypes.DATE,
    },
    promo_code: {
      type: DataTypes.STRING,
    },
    count: {
      type: DataTypes.INTEGER,
    },
    expired_at: {
      type: DataTypes.DATE,
    },
    is_infinite: {
      type: DataTypes.BOOLEAN,
    },
    discount: {
      type: DataTypes.DECIMAL(10, 2),
      get() {
        const rawValue = this.getDataValue("discount");
        // Пример кастинга в другой тип
        return Number(rawValue);
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    paranoid: true,
    underscored: true,
  }
);

export default PromoModel;
