import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { CarModelPopularity } from "../entities/CarModelPopularity";

export class CarModelPopularityController {
    static async getAll(req: Request, res: Response): Promise<Response> {
        try {
            const popularityRepository = AppDataSource.getRepository(CarModelPopularity);

            const popularModels = await popularityRepository.find();

            return res.json(popularModels);
        } catch (error) {
            console.error("Error fetching car model popularity:", error);
            return res.status(500).json({ 
                message: "Error getting car model popularity statistics", 
                error 
            });
        }
    }
}