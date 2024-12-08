import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { ServiceStations } from "../entities/ServiceStations";

export class ServiceStationController {
  static async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const serviceStationRepository = AppDataSource.getRepository(ServiceStations);
      const serviceStations = await serviceStationRepository.find({
        relations: {
          city: true,
          specializations: {
            brand: true
          },
          serviceOrders: true
        }
      });
      return res.json(serviceStations);
    } catch (error) {
      console.error("Error fetching service stations:", error);
      return res.status(500).json({ message: "Error getting service stations", error });
    }
  }

  static async getOne(req: Request, res: Response): Promise<Response> {
    try {
      const serviceStationRepository = AppDataSource.getRepository(ServiceStations);
      const serviceStation = await serviceStationRepository.findOne({
        where: { stationId: parseInt(req.params.id) },
        relations: {
          city: true,
          specializations: {
            brand: true
          },
          serviceOrders: true
        }
      });

      if (!serviceStation) {
        return res.status(404).json({ message: "Service station not found" });
      }

      return res.json(serviceStation);
    } catch (error) {
      console.error("Error fetching service station:", error);
      return res.status(500).json({ message: "Error getting service station", error });
    }
  }

  static async create(req: Request, res: Response): Promise<Response> {
    const serviceStationRepository = AppDataSource.getRepository(ServiceStations);
    try {
      const newServiceStation = serviceStationRepository.create(req.body);
      const savedServiceStation = await serviceStationRepository.save(newServiceStation);
      return res.status(201).json(savedServiceStation);
    } catch (error) {
      return res.status(400).json({ message: "Error creating service station", error });
    }
  }

  static async update(req: Request, res: Response): Promise<Response> {
    const serviceStationRepository = AppDataSource.getRepository(ServiceStations);
    const serviceStation = await serviceStationRepository.findOneBy({
      stationId: parseInt(req.params.id),
    });
    if (!serviceStation) {
      return res.status(404).json({ message: "Service station not found" });
    }
    try {
      serviceStationRepository.merge(serviceStation, req.body);
      const updatedServiceStation = await serviceStationRepository.save(serviceStation);
      return res.json(updatedServiceStation);
    } catch (error) {
      return res.status(400).json({ message: "Error updating service station", error });
    }
  }

  static async delete(req: Request, res: Response): Promise<Response> {
    try {
      const serviceStationRepository = AppDataSource.getRepository(ServiceStations);
      const serviceStation = await serviceStationRepository.findOne({
        where: { stationId: parseInt(req.params.id) },
        relations: {
          specializations: true,
          serviceOrders: true
        }
      });

      if (!serviceStation) {
        return res.status(404).json({ message: "Service station not found" });
      }

      await serviceStationRepository.remove(serviceStation);
      return res.status(204).send();
    } catch (error) {
      console.error("Error deleting service station:", error);
      return res.status(500).json({ message: "Error deleting service station", error });
    }
  }
}
