import { Router } from "express";
import {
  DELETE,
  GET,
  GETID,
  POST,
  PUT,
} from "../controllers/tables.controller.js";
import auth from "../middlewares/auth.global.js";

const router = Router();

router.get("/tables", GET);

router.post("/tables/:id", GETID);

router.post("/tables", POST);

router.patch("/tables/:id", auth, PUT);

router.delete("/tables/:id", auth, DELETE);

export default router;
