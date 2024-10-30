import { Router } from "express";
import AuthRouter from "./auth.routes.js";
import ProductCategoryRouter from "./productCategory.routes.js";
import ProductRouter from "./product.routes.js";
import UserRouter from "./user.routes.js";
import RequestRouter from "./request.routes.js";
import DiscountRouter from "./discount.routes.js";
import DashboardRouter from "./dashboard.routes.js";
import ListRouter from "./lists.routes.js";
import GalleryRouter from "./gallery.routes.js";
import WorkerRouter from "./workers.routes.js";
import FeedbackRouter from "./feedback.routes.js";
import PromoRouter from "./promo.routes.js";
import TablesRouter from "./tables.routes.js";
import StoriesRouter from "./stories.routes.js";
import CourierRouter from "./courier.routes.js";
import NotesRouter from "./notes.routes.js";

const routes = Router();

/**
 * @swagger
 * securityDefinitions:
 *   BearerAuth:
 *     type: apiKey
 *     in: header
 *     name: Authorization
 */

routes.use(AuthRouter);
routes.use(ProductCategoryRouter);
routes.use(ProductRouter);
routes.use(UserRouter);
routes.use(RequestRouter);
// routes.use(DiscountRouter);
routes.use(DashboardRouter);
routes.use(ListRouter);
routes.use(GalleryRouter);
routes.use(WorkerRouter);
routes.use(FeedbackRouter);
routes.use(PromoRouter);
routes.use(TablesRouter);
routes.use(StoriesRouter);
routes.use(CourierRouter);
routes.use(NotesRouter);

export default routes;
