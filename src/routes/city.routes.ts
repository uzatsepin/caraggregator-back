import { Router } from "express";
import { CityController } from "../controllers/CityController";

const router = Router();

router.get("/", CityController.getAll); // Получить все города
router.get("/:id", CityController.getOne); // Получить город по ID
router.post("/", CityController.create); // Создать новый город
router.put("/:id", CityController.update); // Обновить город по ID
router.delete("/:id", CityController.delete); // Удалить город по ID

export default router;
