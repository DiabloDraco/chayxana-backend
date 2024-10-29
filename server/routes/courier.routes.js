import { Router } from "express";
import {
  findAll,
  getAllNewOrders,
  applyDelivery,
} from "../controllers/courier.controller.js";
import auth from "../middlewares/auth.global.js";
import roles from "../middlewares/roles.global.js";

const router = Router();

router.get("/courier", auth, roles(["COURIER"]), findAll);

router.get("/courier/new", auth, roles(["COURIER"]), getAllNewOrders);

router.post("/courier", auth, roles(["COURIER"]), applyDelivery);

export default router;
