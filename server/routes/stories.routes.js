import { Router } from "express";
import {
  DELETE,
  GET,
  GETID,
  POST,
  PUT,
} from "../controllers/stories.controller.js";
import auth from "../middlewares/auth.global.js";
import multer from "../plugins/multer.js";

const router = Router();

router.get("/stories", GET);

router.get("/stories/:id", GETID);

router.post("/stories", auth, multer.single("photo"), POST);

router.patch("/stories/:id", auth, multer.single("photo"), PUT);

router.delete("/stories/:id", auth, DELETE);

export default router;
