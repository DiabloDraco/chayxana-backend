import { Router } from "express";
import {
  DELETE,
  GET,
  GETID,
  POST,
  SEARCH,
  UPDATE,
} from "../controllers/product.controller.js";
import multer from "../plugins/multer.js";
import auth from "../middlewares/auth.global.js";
import roles from "../middlewares/roles.global.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Operations with products
 */

/**
 * @swagger
 * /api/product:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of products
 *       400:
 *         description: Error message
 */
router.get("/product", GET);

/**
 * @swagger
 * /api/product/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the product
 *     responses:
 *       200:
 *         description: Product data
 *       400:
 *         description: Error message
 */
router.get("/product/:id", GETID);

/**
 * @swagger
 * /api/product:
 *   post:
 *     summary: Create a new product
 *     security:
 *       - bearerAuth: []
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *               category_id:
 *                 type: string
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *               photo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Created product data
 *       400:
 *         description: Error message
 */
router.post("/product", auth, multer.single("photo"), POST);

/**
 * @swagger
 * /api/product/{id}:
 *   patch:
 *     summary: Update product by ID
 *     security:
 *       - bearerAuth: []
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *               category_id:
 *                 type: string
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: Updated product data
 *       400:
 *         description: Error message
 */
router.patch("/product/:id", auth, multer.single("photo"), UPDATE);

/**
 * @swagger
 * /api/product/{id}:
 *   delete:
 *     summary: Delete product by ID
 *     security:
 *       - bearerAuth: []
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the product
 *     responses:
 *       200:
 *         description: Product deleted
 *       400:
 *         description: Error message
 */
router.delete("/product/:id", auth, DELETE);

router.get("/products/search", SEARCH);

export default router;
