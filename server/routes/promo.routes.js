import { Router } from "express";
import {
  DELETE,
  GET,
  GETID,
  CREATE,
  UPDATE,
  CHECKPROMO,
} from "../controllers/promo.controller.js";
import auth from "../middlewares/auth.global.js";

const router = Router();

router.get("/promo", auth, GET);

router.get("/promo/:id", auth, GETID);

router.get("/check/promo", auth, CHECKPROMO);

router.post("/promo", auth, CREATE);

router.patch("/promo/:id", auth, UPDATE);

router.delete("/promo/:id", auth, DELETE);

export default router;
