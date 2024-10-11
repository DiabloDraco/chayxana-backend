import { Router } from "express";
import {
  DELETE,
  GET,
  GETID,
  POST,
  PUT,
} from "../controllers/feedback.controller.js";
import auth from "../middlewares/auth.global.js";
import multer from "../plugins/multer.js";

const router = Router();

router.get("/feedbacks", GET);

router.get("/feedbacks/:id", GETID);

router.post("/feedbacks", auth, multer.single("photo"), POST);

router.patch("/feedbacks/:id", auth, multer.single("photo"), PUT);

router.delete("/feedbacks/:id", auth, DELETE);

export default router;
