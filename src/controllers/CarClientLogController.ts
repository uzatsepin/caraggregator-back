import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { ClientCarLog } from "../entities/CarClientLog";

export class ClientCarLogController {
    static async getAll(req: Request, res: Response): Promise<Response> {
        try {
            const clientCarLogRepository = AppDataSource.getRepository(ClientCarLog);
            
            const logs = await clientCarLogRepository.find({
                relations: ["car", "car.carModel", "car.carModel.brand", "client"],
                order: { changeDate: "DESC" }
            });

            return res.json(logs);
        } catch (error) {
            console.error("Error fetching client car logs:", error);
            return res.status(500).json({
                message: "Error getting client car logs",
                error
            });
        }
    }
}