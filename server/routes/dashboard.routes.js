import { Router } from "express";
import {
  GETCASH,
  GETCOUNT,
  GETCUSTOMERS,
  GETPRODUCTS,
} from "../controllers/dashboard.controller.js";
import auth from "../middlewares/auth.global.js";
import roles from "../middlewares/roles.global.js";

const router = Router();

router.get("/dashboard/products", auth, GETPRODUCTS);
router.get("/dashboard/cash", auth, GETCASH);
router.get("/dashboard/count", auth, GETCOUNT);
router.get("/dashboard/customers", auth, GETCUSTOMERS);

// router.get("/dashboard/status", auth, GETSTATUSES);

export default router;
