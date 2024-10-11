import ProductModel from "./product.model.js";
import sequelize from "../plugins/sequalize.js";
import UserModel from "./user.model.js";
import ProductCategoryModel from "./productCategory.model.js";
import RoleModel from "./role.model.js";
import RequestModel from "./request.model.js";
import OrderModel from "./order.model.js";
import DiscountModel from "./discount.model.js";
import "./lists.model.js";
import "./workers.model.js";
import "./gallery.model.js";
import "./feedback.model.js";
import "./promo.model.js";

UserModel.belongsTo(RoleModel, {
  foreignKey: "role_id",
  as: "role",
});

ProductModel.belongsTo(UserModel, {
  foreignKey: "user_id",
  as: "user",
});

ProductModel.belongsTo(ProductCategoryModel, {
  foreignKey: "category_id",
  as: "category",
});

OrderModel.belongsTo(RequestModel, {
  foreignKey: "request_id",
  as: "request",
});

OrderModel.belongsTo(ProductModel, {
  foreignKey: "product_id",
  as: "product",
});

RequestModel.belongsTo(UserModel, {
  foreignKey: "user_id",
  as: "user",
});

RequestModel.hasMany(OrderModel, {
  foreignKey: "request_id",
  as: "items",
});

RequestModel.belongsTo(DiscountModel, {
  foreignKey: "discount_id",
  as: "discount",
});

sequelize.sync({ alter: true });
