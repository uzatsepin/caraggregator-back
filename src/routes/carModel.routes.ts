import { Router } from "express";
import { CarModelController } from "../controllers/CarModelController";

const router = Router();

router.get("/", CarModelController.getAll); // Получить все модели автомобилей
router.get("/:id", CarModelController.getOne); // Получить модель автомобиля по ID
router.post("/", CarModelController.create); // Создать новую модель автомобиля
router.put("/:id", CarModelController.update); // Обновить модель автомобиля по ID
router.delete("/:id", CarModelController.delete); // Удалить модель автомобиля по ID

export default router;
