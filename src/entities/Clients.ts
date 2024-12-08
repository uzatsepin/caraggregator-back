// Clients.ts
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ServiceOrders } from "./ServiceOrders";
import { ClientCar } from "./ClientCar";
import { ClientCarLog } from "./CarClientLog";

@Index("email", ["email"], { unique: true })
@Index("phone", ["phone"], { unique: true })
@Entity("clients", { schema: "service_agregator" })
export class Clients {
  @PrimaryGeneratedColumn({ type: "int", name: "client_id" })
  clientId!: number;

  @Column("varchar", { name: "first_name", length: 100 })
  firstName!: string;

  @Column("varchar", { name: "last_name", length: 100 })
  lastName!: string;

  @Column("varchar", { name: "phone", unique: true, length: 20 })
  phone!: string;

  @Column("varchar", {
    name: "email",
    nullable: true,
    unique: true,
    length: 100,
  })
  email!: string | null;

  @Column("timestamp", {
    name: "registration_date",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  registrationDate!: Date | null;

  @OneToMany(() => ServiceOrders, (serviceOrders) => serviceOrders.client)
  serviceOrders!: ServiceOrders[];

  @OneToMany(() => ClientCar, (clientCar) => clientCar.client)
  clientCars!: ClientCar[];

  @OneToMany(() => ClientCarLog, (log) => log.client)
  carLogs!: ClientCarLog[];
}