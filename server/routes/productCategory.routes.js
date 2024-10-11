import { Router } from "express";
import {
  DELETE,
  GET,
  GETID,
  POST,
  UPDATE,
} from "../controllers/productCategory.controller.js";
import auth from "../middlewares/auth.global.js";
import roles from "../middlewares/roles.global.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Product Categories
 *   description: Operations with product categories
 */

/**
 * @swagger
 * /api/products/category:
 *   get:
 *     summary: Get all product categories
 *     tags: [Product Categories]
 *     responses:
 *       200:
 *         description: A list of product categories
 *       400:
 *         description: Error message
 */
router.get("/products/category", GET);

/**
 * @swagger
 * /api/products/category/{id}:
 *   get:
 *     summary: Get a product category by ID
 *     tags: [Product Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A product category object
 *       400:
 *         description: Error message
 */
router.get("/products/category/:id", GETID);

/**
 * @swagger
 * /api/products/category:
 *   post:
 *     summary: Create a new product category
 *     tags: [Product Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Created product category object
 *       400:
 *         description: Error message
 */
router.post("/products/category", auth, POST);

/**
 * @swagger
 * /api/products/category/{id}:
 *   patch:
 *     summary: Update a product category by ID
 *     tags: [Product Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated product category object
 *       400:
 *         description: Error message
 */
router.patch("/products/category/:id", auth, UPDATE);

/**
 * @swagger
 * /api/products/category/{id}:
 *   delete:
 *     summary: Delete a product category by ID
 *     tags: [Product Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Confirmation message
 *       400:
 *         description: Error message
 */
router.delete("/products/category/:id", auth, DELETE);

export default router;
