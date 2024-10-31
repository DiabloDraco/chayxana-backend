import ProductModel from "./product.model.js";
import sequelize from "../plugins/sequalize.js";
import UserModel from "./user.model.js";
import ProductCategoryModel from "./productCategory.model.js";
import RoleModel from "./role.model.js";
import RequestModel from "./request.model.js";
import OrderModel from "./order.model.js";
import DiscountModel from "./discount.model.js";
import UserPromoModel from "./userPromo.model.js";
import "./stories.model.js";
import "./tables.model.js";
import "./lists.model.js";
import "./workers.model.js";
import "./gallery.model.js";
import "./feedback.model.js";
import PromoModel from "./promo.model.js";
import "./notes.model.js";

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

ProductCategoryModel.hasMany(ProductModel, {
  foreignKey: "category_id",
  as: "productList",
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

RequestModel.belongsTo(PromoModel, {
  foreignKey: "discount_id",
  as: "discount",
});

UserPromoModel.belongsTo(UserModel, {
  foreignKey: "user_id",
  as: "user",
});

UserPromoModel.belongsTo(PromoModel, {
  foreignKey: "promo_id",
  as: "promo",
});

RequestModel.belongsTo(UserModel, {
  foreignKey: "delivery_by",
  as: "courier",
});

UserModel.hasMany(RequestModel, {
  foreignKey: "delivery_by",
  as: "requests",
});

sequelize.sync();
