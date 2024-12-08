import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CarBrands } from "./CarBrands";
import { ServiceOrders } from "./ServiceOrders";
import { ClientCar } from "./ClientCar";

@Index("brand_id", ["brandId"], {})
@Entity("car_models", { schema: "service_agregator" })
export class CarModels {
  @PrimaryGeneratedColumn({ type: "int", name: "model_id" })
  modelId!: number;

  @Column("int", { name: "brand_id" })
  brandId!: number;

  @Column("varchar", { name: "model_name", length: 100 })
  modelName!: string;

  @Column({ type: "varchar", name: "model_year", nullable: true })
  modelYear!: string | null;

  @Column("decimal", {
    name: "avg_service_cost",
    precision: 10,
    scale: 2,
    default: () => "0.00",
  })
  avgServiceCost!: string;

  @ManyToOne(() => CarBrands, (carBrands) => carBrands.carModels, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "brand_id", referencedColumnName: "brandId" }])
  brand!: CarBrands;

  @OneToMany(() => ServiceOrders, (serviceOrders) => serviceOrders.carModel)
  serviceOrders!: ServiceOrders[];

  @OneToMany(() => ClientCar, (clientCar) => clientCar.carModel)
  clientCars!: ClientCar[];
}