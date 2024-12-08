import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Cities } from "../entities/Cities";

export class CityController {
  static async getAll(req: Request, res: Response): Promise<Response> {
    const cityRepository = AppDataSource.getRepository(Cities);
    const cities = await cityRepository.find();
    return res.json(cities);
  }

  static async getOne(req: Request, res: Response): Promise<Response> {
    const cityRepository = AppDataSource.getRepository(Cities);
    const city = await cityRepository.findOneBy({ cityId: parseInt(req.params.id) });
    if (!city) {
      return res.status(404).json({ message: "City not found" });
    }
    return res.json(city);
  }

  static async create(req: Request, res: Response): Promise<Response> {
    const cityRepository = AppDataSource.getRepository(Cities);
    const newCity = cityRepository.create(req.body);
    await cityRepository.save(newCity);
    return res.status(201).json(newCity);
  }

  static async update(req: Request, res: Response): Promise<Response> {
    const cityRepository = AppDataSource.getRepository(Cities);
    const city = await cityRepository.findOneBy({ cityId: parseInt(req.params.id) });
    if (!city) {
      return res.status(404).json({ message: "City not found" });
    }
    cityRepository.merge(city, req.body);
    const result = await cityRepository.save(city);
    return res.json(result);
  }

  static async delete(req: Request, res: Response): Promise<Response> {
    const cityRepository = AppDataSource.getRepository(Cities);
    const city = await cityRepository.findOneBy({ cityId: parseInt(req.params.id) });
    if (!city) {
      return res.status(404).json({ message: "City not found" });
    }
    await cityRepository.remove(city);
    return res.status(204).send();
  }
}
