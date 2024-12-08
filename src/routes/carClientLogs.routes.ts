import { Router } from "express";
import { ClientCarLogController } from "../controllers/CarClientLogController";

const router = Router();

router.get("/", ClientCarLogController.getAll);

export default router;