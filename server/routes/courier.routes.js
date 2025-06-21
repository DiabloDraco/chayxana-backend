import { Router } from "express";
import {
  findAll,
  getAllNewOrders,
  applyDelivery,
  finishDelivery,
} from "../controllers/courier.controller.js";
import auth from "../middlewares/auth.global.js";
import roles from "../middlewares/roles.global.js";

const router = Router();

router.get("/courier", auth, roles(["COURIER"]), findAll);

router.get("/courier/new", auth, roles(["COURIER"]), getAllNewOrders);

router.post("/courier", auth, roles(["COURIER"]), applyDelivery);

router.post("/courier/finish", auth, roles(["COURIER"]), finishDelivery);

export default router;
