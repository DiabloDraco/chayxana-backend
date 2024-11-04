import { Router } from "express";
import {
  CHECK,
  GET,
  GETID,
  POST,
  UPDATE,
  CALLBACK,
  GETUSER,
} from "../controllers/request.controller.js";
import auth from "../middlewares/auth.global.js";

const router = Router();

router.post("/request", auth, POST);

router.get("/request", auth, GET);

router.get("/request/user", auth, GETUSER);

router.get("/request/:id", GETID);

router.get("/discounts/request", auth, CHECK);

router.patch("/request/:id", auth, UPDATE);

router.post("/tinkoff", CALLBACK);

export default router;
