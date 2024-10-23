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

router.get("/storeis", GET);

router.get("/storeis/:id", GETID);

router.post("/storeis", auth, multer.single("photo"), POST);

router.patch("/storeis/:id", auth, multer.single("photo"), PUT);

router.delete("/storeis/:id", auth, DELETE);

export default router;
