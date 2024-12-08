import { Router } from "express";
import { ServiceSpecializationController } from "../controllers/ServiceSpecializationsController"

const router = Router();

router.get("/", ServiceSpecializationController.getAll);
router.get("/:stationId/:brandId", ServiceSpecializationController.getOne);
router.post("/", ServiceSpecializationController.create);
router.put("/:stationId/:brandId", ServiceSpecializationController.update);
router.delete("/:stationId/:brandId", ServiceSpecializationController.delete);
router.get('/station/:stationId', ServiceSpecializationController.getByStation);
router.post("/batch-update", ServiceSpecializationController.batchUpdate);

export default router;
