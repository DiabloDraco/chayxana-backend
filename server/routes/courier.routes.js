import { Router } from "express";
import {
  DELETE,
  GET,
  GETID,
  POST,
  UPDATE,
} from "../controllers/courier.controller.js";
import auth from "../middlewares/auth.global.js";
import roles from "../middlewares/roles.global.js";

const router = Router();

router.get("/courier", GET);

router.get("/courier/:id", GETID);

router.post("/courier", auth, POST);

router.patch("/courier/:id", auth, UPDATE);

router.delete("/courier/:id", auth, DELETE);

export default router;
