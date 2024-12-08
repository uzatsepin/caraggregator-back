import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { CarModels } from "../entities/CarModels";

export class CarModelController {
  static async getAll(req: Request, res: Response): Promise<Response> {
    const carModelRepository = AppDataSource.getRepository(CarModels);
    
    try {
      const carModels = await carModelRepository.find({
        relations: ["brand", "serviceOrders"],
      });
      return res.json(carModels);
    } catch(error) {
      return res.status(500).json({ message: "Error getting car models", error });
    }
  }

  static async getOne(req: Request, res: Response): Promise<Response> {
    const carModelRepository = AppDataSource.getRepository(CarModels);
    const carModel = await carModelRepository.findOne({
      where: { modelId: parseInt(req.params.id) },
      relations: ["brand", "serviceOrders"],
    });
    if (!carModel) {
      return res.status(404).json({ message: "Car model not found" });
    }
    return res.json(carModel);
  }

  static async create(req: Request, res: Response): Promise<Response> {
    const carModelRepository = AppDataSource.getRepository(CarModels);
    const newCarModel = carModelRepository.create(req.body);
    const savedCarModel = await carModelRepository.save(newCarModel);
    return res.status(201).json(savedCarModel);
  }

  static async update(req: Request, res: Response): Promise<Response> {
    const carModelRepository = AppDataSource.getRepository(CarModels);
    const carModel = await carModelRepository.findOneBy({ modelId: parseInt(req.params.id) });
    if (!carModel) {
      return res.status(404).json({ message: "Car model not found" });
    }
    carModelRepository.merge(carModel, req.body);
    const updatedCarModel = await carModelRepository.save(carModel);
    return res.json(updatedCarModel);
  }

  static async delete(req: Request, res: Response): Promise<Response> {
    const carModelRepository = AppDataSource.getRepository(CarModels);
    const carModel = await carModelRepository.findOneBy({ modelId: parseInt(req.params.id) });
    if (!carModel) {
      return res.status(404).json({ message: "Car model not found" });
    }
    await carModelRepository.remove(carModel);
    return res.status(204).send();
  }
}
