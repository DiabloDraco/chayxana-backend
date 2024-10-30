import { Router } from "express";
import {
  DELETE,
  GET,
  GETID,
  POST,
  UPDATE,
} from "../controllers/notes.controller.js";
import auth from "../middlewares/auth.global.js";
import roles from "../middlewares/roles.global.js";

const router = Router();

router.get("/notes", auth, GET);

router.get("/notes/:id", auth, GETID);

router.post("/notes", auth, POST);

router.patch("/notes/:id", auth, UPDATE);

router.delete("/notes/:id", auth, DELETE);

export default router;
