import { Router } from "express";
import {
  getRoles,
  loginAdmins,
  loginUsers,
  myUser,
  register,
} from "../controllers/auth.controller.js";
import auth from "../middlewares/auth.global.js";
import multer from "../plugins/multer.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Auth management
 */

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Get user info
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               login:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User info
 *       400:
 *         description: Error message
 */
router.post("/login", loginAdmins);

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Get user info
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               login:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User info
 *       400:
 *         description: Error message
 */
router.post("/login/user", loginUsers);

/**
 * @swagger
 * /api/me:
 *   get:
 *     summary: Get user info
 *     security:
 *       - bearerAuth: []
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: User info
 *       400:
 *         description: Error message
 */
router.get("/me", auth, myUser);

router.get("/roles", auth, getRoles);

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Get user info
 *     security:
 *       - bearerAuth: []
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Register message
 *       400:
 *         description: Error message
 */
router.post("/register", register);

export default router;
