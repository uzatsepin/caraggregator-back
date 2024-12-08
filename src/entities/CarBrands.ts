import { CarModels } from "./CarModels";
import { StationSpecializations } from "./StationSpecializations";
import { ClientCar } from "./ClientCar";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("car_brands", { schema: "service_agregator" })
export class CarBrands {
  @PrimaryGeneratedColumn({ type: "int", name: "brand_id" })
  brandId!: number;

  @Column("varchar", { name: "brand_name", length: 100 })
  brandName!: string;

  @Column("varchar", { name: "brand_logo", nullable: true, length: 100 })
  brandLogo!: string | null;

  @Column("varchar", { name: "country_origin", nullable: true, length: 100 })
  countryOrigin!: string | null;

  @OneToMany(() => CarModels, (carModels) => carModels.brand)
  carModels!: CarModels[];

  @OneToMany(() => StationSpecializations, (specialization) => specialization.brand)
  specializations!: StationSpecializations[];

  @OneToMany(() => ClientCar, (clientCar) => clientCar.carBrand)
  clientCars!: ClientCar[];
}