import { Router } from "express";
import {
  GETBRANCHES,
  GETTABLES,
  POSTTABLE,
  DELETETABLE,
} from "../controllers/lists.controller.js";
import auth from "../middlewares/auth.global.js";
import roles from "../middlewares/roles.global.js";

const router = Router();

router.get("/lists/branches", GETBRANCHES);

router.get("/lists/tables", GETTABLES);

router.post("/lists/tables", auth, POSTTABLE);

router.delete("/lists/tables/:id", auth, DELETETABLE);

export default router;
