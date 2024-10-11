import { Router } from "express";
import {
  DELETE,
  GET,
  GETID,
  POST,
  PUT,
} from "../controllers/workers.controller.js";
import auth from "../middlewares/auth.global.js";
import multer from "../plugins/multer.js";

const router = Router();

router.get("/workers", GET);

router.get("/workers/:id", GETID);

router.post("/workers", auth, multer.single("photo"), POST);

router.patch("/workers/:id", auth, multer.single("photo"), PUT);

router.delete("/workers/:id", auth, DELETE);

export default router;
