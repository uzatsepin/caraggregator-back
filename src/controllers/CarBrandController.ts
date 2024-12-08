import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { CarBrands } from "../entities/CarBrands";

export class CarBrandController {
  static async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const carBrandRepository = AppDataSource.getRepository(CarBrands);
      const carBrands = await carBrandRepository
        .createQueryBuilder("brand")
        .leftJoinAndSelect("brand.carModels", "carModels")
        .leftJoinAndSelect("brand.specializations", "specializations")
        .leftJoinAndSelect("specializations.station", "station")
        .getMany();
      
      return res.json(carBrands);
    } catch (error) {
      console.error("Error fetching car brands:", error);
      return res.status(500).json({ message: "Error getting car brands", error });
    }
  }

  static async getOne(req: Request, res: Response): Promise<Response> {
    try {
      const carBrandRepository = AppDataSource.getRepository(CarBrands);
      const carBrand = await carBrandRepository
        .createQueryBuilder("brand")
        .leftJoinAndSelect("brand.carModels", "carModels")
        .leftJoinAndSelect("brand.specializations", "specializations")
        .leftJoinAndSelect("specializations.station", "station")
        .where("brand.brandId = :id", { id: parseInt(req.params.id) })
        .getOne();

      if (!carBrand) {
        return res.status(404).json({ message: "Car brand not found" });
      }

      return res.json(carBrand);
    } catch (error) {
      console.error("Error fetching car brand:", error);
      return res.status(500).json({ message: "Error getting car brand", error });
    }
  }

  static async create(req: Request, res: Response): Promise<Response> {
    const carBrandRepository = AppDataSource.getRepository(CarBrands);
    const newCarBrand = carBrandRepository.create(req.body);
    const savedCarBrand = await carBrandRepository.save(newCarBrand);
    return res.status(201).json(savedCarBrand);
  }

  static async update(req: Request, res: Response): Promise<Response> {
    const carBrandRepository = AppDataSource.getRepository(CarBrands);
    const carBrand = await carBrandRepository.findOneBy({ brandId: parseInt(req.params.id) });
    if (!carBrand) {
      return res.status(404).json({ message: "Car brand not found" });
    }
    carBrandRepository.merge(carBrand, req.body);
    const updatedCarBrand = await carBrandRepository.save(carBrand);
    return res.json(updatedCarBrand);
  }

  static async delete(req: Request, res: Response): Promise<Response> {
    const carBrandRepository = AppDataSource.getRepository(CarBrands);
    const carBrand = await carBrandRepository.findOneBy({ brandId: parseInt(req.params.id) });
    if (!carBrand) {
      return res.status(404).json({ message: "Car brand not found" });
    }
    await carBrandRepository.remove(carBrand);
    return res.status(204).send();
  }
}
