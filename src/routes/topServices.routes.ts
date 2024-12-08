import { Router } from "express";
import { TopServicesController } from "../controllers/TopServicesController";

const router = Router();

router.get("/", TopServicesController.getAll);
export default router;
