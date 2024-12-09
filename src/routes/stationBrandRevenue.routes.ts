import { Router } from "express";
import { StationBrandRevenueController } from "../controllers/StationBrandRevenueController";

const router = Router();

router.get("/", StationBrandRevenueController.getAll);
export default router;
