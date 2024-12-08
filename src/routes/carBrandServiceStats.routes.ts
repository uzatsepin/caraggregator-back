import { Router } from "express";
import { CarBrandServiceStatsController } from "../controllers/CarBrandServiceStats";

const router = Router();

router.get("/", CarBrandServiceStatsController.getAll);
export default router;
