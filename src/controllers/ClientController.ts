import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Clients } from "../entities/Clients";

export class ClientController {
  static async getAll(req: Request, res: Response): Promise<Response> {
    const clientRepository = AppDataSource.getRepository(Clients);
    const clients = await clientRepository.find({
      relations: [
        "serviceOrders", 
        "serviceOrders.station",
        "clientCars", 
        "clientCars.carBrand",
        "clientCars.carModel"
    ],
    });
    return res.json(clients);
  }

  static async getOne(req: Request, res: Response): Promise<Response> {
    const clientRepository = AppDataSource.getRepository(Clients);
    const client = await clientRepository.findOne({
      where: { clientId: parseInt(req.params.id) },
      relations: ["serviceOrders", "clientCars"],
    });
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }
    return res.json(client);
  }

  static async create(req: Request, res: Response): Promise<Response> {
    const clientRepository = AppDataSource.getRepository(Clients);
    try {
      const newClient = clientRepository.create(req.body);
      
      const savedClient = await clientRepository.save(newClient);
      return res.status(201).json(savedClient);
    } catch (error:any) {
      return res.status(400).json({ message: "Error creating client", errorMessage: error.sqlMessage, error });
    }
  }

  static async update(req: Request, res: Response): Promise<Response> {
    const clientRepository = AppDataSource.getRepository(Clients);
    const client = await clientRepository.findOneBy({ clientId: parseInt(req.params.id) });
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }
    try {
      clientRepository.merge(client, req.body);
      const updatedClient = await clientRepository.save(client);
      return res.json(updatedClient);
    } catch (error) {
      return res.status(400).json({ message: "Error updating client", error });
    }
  }

  static async delete(req: Request, res: Response): Promise<Response> {
    const clientRepository = AppDataSource.getRepository(Clients);
    const client = await clientRepository.findOneBy({ clientId: parseInt(req.params.id) });
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }
    await clientRepository.remove(client);
    return res.status(204).send();
  }
}
