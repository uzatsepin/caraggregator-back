import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { StationPerformance } from "../entities/StationPerformance";

export class StationPerformanceController {
    static async getAll(req: Request, res: Response): Promise<Response> {
        try {
            const performanceRepository = AppDataSource.getRepository(StationPerformance);
            const performance = await performanceRepository.find();
            
            return res.json(performance);
        } catch (error) {
            console.error("Error fetching specialization performance:", error);
            return res.status(500).json({ 
                message: "Error getting station specialization performance", 
                error 
            });
        }
    }
}