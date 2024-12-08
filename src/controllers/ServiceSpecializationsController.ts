import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { StationSpecializations } from "../entities/StationSpecializations";

export class ServiceSpecializationController {
  static async getAll(req: Request, res: Response): Promise<Response> {
    const serviceSpecializationRepository = AppDataSource.getRepository(StationSpecializations);
    const serviceSpecializations = await serviceSpecializationRepository.find({
        relations: ["station", "brand"]
    });
    
    return res.json(serviceSpecializations);
  }

  static async getOne(req: Request, res: Response): Promise<Response> {
    const serviceSpecializationRepository = AppDataSource.getRepository(StationSpecializations);
    const { stationId, brandId } = req.params;

    const serviceSpecialization = await serviceSpecializationRepository.findOne({
      where: {
        station: { stationId: parseInt(stationId) },
        brand: { brandId: parseInt(brandId) },
      },
    });

    if (!serviceSpecialization) {
      return res.status(404).json({ message: "Service specialization not found" });
    }

    return res.json(serviceSpecialization);
  }

  static async create(req: Request, res: Response): Promise<Response> {
    const serviceSpecializationRepository = AppDataSource.getRepository(StationSpecializations);
    const newServiceSpecialization = serviceSpecializationRepository.create(req.body);
    const savedServiceSpecialization = await serviceSpecializationRepository.save(newServiceSpecialization);
    return res.status(201).json(savedServiceSpecialization);
  }

  static async update(req: Request, res: Response): Promise<Response> {
    const serviceSpecializationRepository = AppDataSource.getRepository(StationSpecializations);
    const { stationId, brandId } = req.params;

    const serviceSpecialization = await serviceSpecializationRepository.findOne({
    where: {
        station: { stationId: parseInt(stationId) },
        brand: { brandId: parseInt(brandId) },
        },
    });

    if (!serviceSpecialization) {
      return res.status(404).json({ message: "Service specialization not found" });
    }

    serviceSpecializationRepository.merge(serviceSpecialization, req.body);
    const updatedServiceSpecialization = await serviceSpecializationRepository.save(serviceSpecialization);
    return res.json(updatedServiceSpecialization);
  }

  static async delete(req: Request, res: Response): Promise<Response> {
    const serviceSpecializationRepository = AppDataSource.getRepository(StationSpecializations);
    const { stationId, brandId } = req.params;

    const serviceSpecialization = await serviceSpecializationRepository.findOne({
    where: {
        station: { stationId: parseInt(stationId) },
        brand: { brandId: parseInt(brandId) },
        },
    });

    if (!serviceSpecialization) {
      return res.status(404).json({ message: "Service specialization not found" });
    }

    await serviceSpecializationRepository.remove(serviceSpecialization);
    return res.status(204).send();
  }

  static async getByStation(req: Request, res: Response): Promise<Response> {
    const serviceSpecializationRepository = AppDataSource.getRepository(StationSpecializations);
    const { stationId } = req.params;

    const specializations = await serviceSpecializationRepository.find({
      where: {
        station: { stationId: parseInt(stationId) }
      },
      relations: ["station", "brand"]
    });

    if (!specializations) {
      return res.status(404).json({ message: "No specializations found for this station" });
    }

    return res.json(specializations);
  }

  static async batchUpdate(req: Request, res: Response): Promise<Response> {
    const serviceSpecializationRepository = AppDataSource.getRepository(StationSpecializations);
    try {
        const { stationId, specializations } = req.body;
        
        // Удаляем все существующие специализации для станции
        await serviceSpecializationRepository.delete({ stationId });
        
        // Создаем новые специализации
        const newSpecializations = specializations.map((brandId: number) => ({
            stationId,
            brandId
        }));
        
        const saved = await serviceSpecializationRepository.save(newSpecializations);
        return res.status(200).json(saved);
    } catch (error) {
        return res.status(500).json({ message: "Error updating specializations" });
    }
}
}
