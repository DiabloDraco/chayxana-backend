import { Router } from "express";
import {
  DELETE,
  GET,
  GETID,
  POST,
  UPDATE,
} from "../controllers/product.controller.js";
import auth from "../middlewares/auth.global.js";

const router = Router();

router.get("/promo", auth, GET);

router.get("/promo/:id", auth, GETID);

router.post("/promo", auth, POST);

router.patch("/promo/:id", auth, UPDATE);

router.delete("/promo/:id", auth, DELETE);

export default router;
