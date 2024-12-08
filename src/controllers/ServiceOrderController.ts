import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { ServiceOrders } from "../entities/ServiceOrders";

export class ServiceOrderController {
  static async getAll(req: Request, res: Response): Promise<Response> {
    const serviceOrderRepository = AppDataSource.getRepository(ServiceOrders);
    const serviceOrders = await serviceOrderRepository.find({
      relations: ["client", "station", "carModel"], // Загрузить связанные данные
    });
    return res.json(serviceOrders);
  }

  static async getOne(req: Request, res: Response): Promise<Response> {
    const serviceOrderRepository = AppDataSource.getRepository(ServiceOrders);
    const serviceOrder = await serviceOrderRepository.findOne({
      where: { orderId: parseInt(req.params.id) },
      relations: ["client", "station", "carModel"],
    });
    if (!serviceOrder) {
      return res.status(404).json({ message: "Service order not found" });
    }
    return res.json(serviceOrder);
  }

  static async create(req: Request, res: Response): Promise<Response> {
    const serviceOrderRepository = AppDataSource.getRepository(ServiceOrders);
    try {
        const serviceOrderData = {
            ...req.body,
        };
        const newServiceOrder = serviceOrderRepository.create(serviceOrderData);
        const savedServiceOrder = await serviceOrderRepository.save(newServiceOrder);
        return res.status(201).json(savedServiceOrder);
    } catch (error) {
        console.error("Error creating service order:", error);
        return res.status(400).json({ message: "Error creating service order", error });
    }
}
  static async update(req: Request, res: Response): Promise<Response> {
    const serviceOrderRepository = AppDataSource.getRepository(ServiceOrders);
    const orderId = parseInt(req.params.id);
        
    const serviceOrder = await serviceOrderRepository.findOne({
        where: { orderId }
    });
        
    if (!serviceOrder) {
        return res.status(404).json({ message: "Service order not found" });
    }
    
    try {
        serviceOrderRepository.merge(serviceOrder, req.body);
        const updatedServiceOrder = await serviceOrderRepository.save(serviceOrder);
        return res.json(updatedServiceOrder);
    } catch (error) {
        console.error('Update error:', error);
        return res.status(400).json({ message: "Error updating service order", error });
    }
}

  static async delete(req: Request, res: Response): Promise<Response> {
    const serviceOrderRepository = AppDataSource.getRepository(ServiceOrders);
    const serviceOrder = await serviceOrderRepository.findOneBy({
      orderId: parseInt(req.params.id),
    });
    if (!serviceOrder) {
      return res.status(404).json({ message: "Service order not found" });
    }
    await serviceOrderRepository.remove(serviceOrder);
    return res.status(204).send();
  }
}
