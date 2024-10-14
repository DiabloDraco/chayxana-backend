import { Router } from "express";
import {
  DELETE,
  GET,
  GETID,
  POST,
  UPDATE,
} from "../controllers/discount.controller.js";
import auth from "../middlewares/auth.global.js";
import roles from "../middlewares/roles.global.js";

const router = Router();

router.get("/discount", GET);

router.get("/discount/:id", GETID);

router.post("/discount", auth, POST);

router.patch("/discount/:id", auth, UPDATE);

router.delete("/discount/:id", auth, DELETE);

export default router;
