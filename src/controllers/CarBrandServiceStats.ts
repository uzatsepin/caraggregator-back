import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { CarBrandServiceStats } from "../entities/CarBrandServiceStats";

export class CarBrandServiceStatsController {
    static async getAll(req: Request, res: Response): Promise<Response> {
        try {
            const carBrandServiceStatsRepository = AppDataSource.getRepository(CarBrandServiceStats);

            const carBrandServiceStatus = await carBrandServiceStatsRepository.find();

            return res.json(carBrandServiceStatus);
        } catch (error) {
            console.error("Ошибка получения данных:", error);
            return res.status(500).json({ message: "Ошибка получения данных:", error });
        }
    }
}
