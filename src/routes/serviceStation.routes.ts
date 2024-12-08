import { Router } from "express";
import { ServiceStationController } from "../controllers/ServiceStationController";

const router = Router();

router.get("/", ServiceStationController.getAll); // Получить все сервисные станции
router.get("/:id", ServiceStationController.getOne); // Получить сервисную станцию по ID
router.post("/", ServiceStationController.create); // Создать новую сервисную станцию
router.put("/:id", ServiceStationController.update); // Обновить сервисную станцию по ID
router.delete("/:id", ServiceStationController.delete); // Удалить сервисную станцию по ID

export default router;
