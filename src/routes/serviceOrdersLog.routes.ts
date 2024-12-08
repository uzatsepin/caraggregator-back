import { Router } from "express";
import { ServiceOrdersLogController } from "../controllers/ServiceOrdersLogController";

const router = Router();

router.get("/", ServiceOrdersLogController.getAll); // Получить все записи лога
router.get("/:id", ServiceOrdersLogController.getOne); // Получить запись лога по ID
router.post("/", ServiceOrdersLogController.create); // Создать новую запись лога
router.delete("/:id", ServiceOrdersLogController.delete); // Удалить запись лога по ID

export default router;
