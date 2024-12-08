import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { TopServiceStation } from "../entities/TopServices";

export class TopServicesController {
    static async getAll(req: Request, res: Response): Promise<Response> {
        try {
            const topServicesRepository = AppDataSource.getRepository(TopServiceStation);

            const topServices = await topServicesRepository.find();

            return res.json(topServices);
        } catch (error) {
            console.error("Error fetching car brands:", error);
            return res.status(500).json({ message: "Error getting car brands", error });
        }
    }
}
