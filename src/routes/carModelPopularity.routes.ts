import { Router } from "express";
import { CarModelPopularityController } from "../controllers/CarModelPopularityController";

const router = Router();

router.get("/", CarModelPopularityController.getAll);
export default router;
