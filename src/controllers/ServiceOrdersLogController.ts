import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { ServiceOrdersLog } from "../entities/ServiceOrdersLog";

export class ServiceOrdersLogController {
  static async getAll(req: Request, res: Response): Promise<Response> {
    const serviceOrdersLogRepository = AppDataSource.getRepository(ServiceOrdersLog);
    const logs = await serviceOrdersLogRepository.find();
    return res.json(logs);
  }

  static async getOne(req: Request, res: Response): Promise<Response> {
    const serviceOrdersLogRepository = AppDataSource.getRepository(ServiceOrdersLog);
    const log = await serviceOrdersLogRepository.findOneBy({
      logId: parseInt(req.params.id),
    });
    if (!log) {
      return res.status(404).json({ message: "Log entry not found" });
    }
    return res.json(log);
  }

  static async create(req: Request, res: Response): Promise<Response> {
    const serviceOrdersLogRepository = AppDataSource.getRepository(ServiceOrdersLog);
    try {
      const newLog = serviceOrdersLogRepository.create(req.body);
      const savedLog = await serviceOrdersLogRepository.save(newLog);
      return res.status(201).json(savedLog);
    } catch (error) {
      return res.status(400).json({ message: "Error creating log entry", error });
    }
  }

  static async delete(req: Request, res: Response): Promise<Response> {
    const serviceOrdersLogRepository = AppDataSource.getRepository(ServiceOrdersLog);
    const log = await serviceOrdersLogRepository.findOneBy({
      logId: parseInt(req.params.id),
    });
    if (!log) {
      return res.status(404).json({ message: "Log entry not found" });
    }
    await serviceOrdersLogRepository.remove(log);
    return res.status(204).send();
  }
}
