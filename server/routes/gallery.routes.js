import { Router } from "express";
import {
  DELETE,
  GET,
  GETID,
  POST,
  PUT,
} from "../controllers/gallery.controller.js";
import auth from "../middlewares/auth.global.js";
import multer from "../plugins/multer.js";

const router = Router();

router.get("/gallery", GET);

router.get("/gallery/:id", GETID);

router.post("/gallery", auth, multer.single("photo"), POST);

router.patch("/gallery/:id", auth, multer.single("photo"), PUT);

router.delete("/gallery/:id", auth, DELETE);

export default router;
