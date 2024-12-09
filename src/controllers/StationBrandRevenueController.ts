import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import {StationBrandRevenue} from "../entities/StationBrandRevenue";

export class StationBrandRevenueController {
    static async getAll(req: Request, res: Response): Promise<Response> {
        try {
            const stationBrandRevenueRepository = AppDataSource.getRepository(StationBrandRevenue);

            const stationBrandRevenue = await stationBrandRevenueRepository.find();

            return res.json(stationBrandRevenue);
        } catch (error) {
            console.error("Error fetching car brands:", error);
            return res.status(500).json({ message: "Error getting car brands", error });
        }
    }
}
