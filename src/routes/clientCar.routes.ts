import { Router } from "express";
import { ClientCarController } from "../controllers/ClientCarController";

const router = Router();

router.get("/", ClientCarController.getAll);
router.get("/:id", ClientCarController.getOne);
router.post("/", ClientCarController.create); 
router.put("/:id", ClientCarController.update);
router.delete("/:id", ClientCarController.delete);

export default router;
