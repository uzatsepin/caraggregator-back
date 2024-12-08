import { Router } from "express";
import { CarBrandController } from "../controllers/CarBrandController";

const router = Router();

router.get("/", CarBrandController.getAll); // Получить все марки автомобилей
router.get("/:id", CarBrandController.getOne); // Получить марку автомобиля по ID
router.post("/", CarBrandController.create); // Создать новую марку автомобиля
router.put("/:id", CarBrandController.update); // Обновить марку автомобиля по ID
router.delete("/:id", CarBrandController.delete); // Удалить марку автомобиля по ID

export default router;
