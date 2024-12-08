import { Router } from "express";
import { ClientController } from "../controllers/ClientController";

const router = Router();

router.get("/", ClientController.getAll); // Получить всех клиентов
router.get("/:id", ClientController.getOne); // Получить клиента по ID
router.post("/", ClientController.create); // Создать нового клиента
router.put("/:id", ClientController.update); // Обновить клиента по ID
router.delete("/:id", ClientController.delete); // Удалить клиента по ID

export default router;
