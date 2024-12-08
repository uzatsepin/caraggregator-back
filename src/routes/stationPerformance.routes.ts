import { Router } from "express";
import { StationPerformanceController } from "../controllers/StationPerformanceController";

const router = Router();

router.get("/", StationPerformanceController.getAll);
export default router;
