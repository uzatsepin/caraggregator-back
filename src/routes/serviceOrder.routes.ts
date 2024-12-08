import { Router } from "express";
import { ServiceOrderController } from "../controllers/ServiceOrderController";

const router = Router();

router.get("/", ServiceOrderController.getAll);
router.get("/:id", ServiceOrderController.getOne);
router.post("/", ServiceOrderController.create);
router.patch("/:id", ServiceOrderController.update); // Убедимся что PATCH маршрут есть
router.delete("/:id", ServiceOrderController.delete);

export default router;