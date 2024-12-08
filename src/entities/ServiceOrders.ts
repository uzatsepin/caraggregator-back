import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Clients } from "./Clients";
import { ServiceStations } from "./ServiceStations";
import { CarModels } from "./CarModels";

@Index("car_model_id", ["carModelId"], {})
@Index("client_id", ["clientId"], {})
@Index("station_id", ["stationId"], {})
@Entity("service_orders", { schema: "service_agregator" })
export class ServiceOrders {
  @PrimaryGeneratedColumn({ type: "int", name: "order_id" })
  orderId!: number;

  @Column("int", { name: "client_id" })
  clientId!: number;

  @Column("int", { name: "station_id" })
  stationId!: number;

  @Column("int", { name: "car_model_id" })
  carModelId!: number;

  @Column("timestamp", {
    name: "order_date",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  orderDate!: Date | null;

  @Column("varchar", { name: "service_type", length: 200 })
  serviceType!: string;

  @Column({
    type: "enum",
    enum: ["Очікування", "В роботі", "Завершено", "Скасовано"],
    default: "Очікування",
  })
  status!: string;

  @Column("decimal", { name: "total_cost", precision: 10, scale: 2 })
  totalCost!: string;

  @ManyToOne(() => Clients, (clients) => clients.serviceOrders, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "client_id", referencedColumnName: "clientId" }])
  client!: Clients;

  @ManyToOne(
    () => ServiceStations,
    (serviceStations) => serviceStations.serviceOrders,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "station_id", referencedColumnName: "stationId" }])
  station!: ServiceStations;

  @ManyToOne(() => CarModels, (carModels) => carModels.serviceOrders, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "car_model_id", referencedColumnName: "modelId" }])
  carModel!: CarModels;
}
