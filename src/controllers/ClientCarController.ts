import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { ClientCar } from "../entities/ClientCar";

export class ClientCarController {
  static async getAll(req: Request, res: Response): Promise<Response> {
    const clientCarRepository = AppDataSource.getRepository(ClientCar);
    try {
      const clientCars = await clientCarRepository.find({
        relations: ["client", "carBrand", "carModel"], // Получаем связанные сущности
      });
      return res.json(clientCars);
    } catch (error) {
      return res.status(500).json({ message: "Error fetching client cars", error });
    }
  }

  static async getOne(req: Request, res: Response): Promise<Response> {
    const clientCarRepository = AppDataSource.getRepository(ClientCar);
    try {
      const clientCar = await clientCarRepository.findOne({
        where: { id: parseInt(req.params.id) },
        relations: ["client", "carBrand", "carModel"], // Получаем связанные сущности
      });
      if (!clientCar) {
        return res.status(404).json({ message: "Client car not found" });
      }
      return res.json(clientCar);
    } catch (error) {
      return res.status(500).json({ message: "Error fetching client car", error });
    }
  }

  static async create(req: Request, res: Response): Promise<void> {
    const clientCarRepository = AppDataSource.getRepository(ClientCar);
    try {
      const { brand_id, client_id, model_id, licensePlate, vin, mileage } = req.body;
      const newClientCar = clientCarRepository.create({
        licensePlate,
        vin,
        client: { clientId: client_id },
        carBrand: { brandId: brand_id },
        carModel: { modelId: model_id },
        mileage,
      });
      const savedClientCar = await clientCarRepository.save(newClientCar);
      res.status(201).json(savedClientCar);
    } catch (error: any) {
      res.status(400).json({ message: "Error creating client car", errorMessage: error.sqlMessage, error });
    }
  }

  static async update(req: Request, res: Response): Promise<Response> {
    const clientCarRepository = AppDataSource.getRepository(ClientCar);
    try {
      const clientCar = await clientCarRepository.findOneBy({ id: parseInt(req.params.id) });
      if (!clientCar) {
        return res.status(404).json({ message: "Client car not found" });
      }
      clientCarRepository.merge(clientCar, req.body);
      const updatedClientCar = await clientCarRepository.save(clientCar);
      return res.json(updatedClientCar);
    } catch (error) {
      return res.status(400).json({ message: "Error updating client car", error });
    }
  }

  static async delete(req: Request, res: Response): Promise<Response> {
    const clientCarRepository = AppDataSource.getRepository(ClientCar);
    try {
      const clientCar = await clientCarRepository.findOneBy({ id: parseInt(req.params.id) });
      if (!clientCar) {
        return res.status(404).json({ message: "Client car not found" });
      }
      await clientCarRepository.remove(clientCar);
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: "Error deleting client car", error });
    }
  }
}
