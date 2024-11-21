import {
  findAllDialogs,
  findAllMessages,
  sendMessages,
  deleteDialogs,
  createDialog,
  findDialog,
} from "../controllers/chat.controller.js";
import { Router } from "express";
import auth from "../middlewares/auth.global.js";
import roles from "../middlewares/roles.global.js";
import multer from "../plugins/multer.js";

const router = Router();

router.get("/chat/dialogs", auth, findAllDialogs);

router.get("/chat/dialog", auth, findDialog);

router.get("/chat/messages/:id", auth, findAllMessages);

router.post("/chat/messages", auth, multer.single("photo"), sendMessages);

router.delete("/chat/dialogs/:id", auth, deleteDialogs);

router.post("/chat/dialog", auth, createDialog);

export default router;
