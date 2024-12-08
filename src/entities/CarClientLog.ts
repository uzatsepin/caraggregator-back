import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { ClientCar } from "./ClientCar";
import { Clients } from "./Clients";

@Entity("client_car_log", { schema: "service_agregator" })
export class ClientCarLog {
  @PrimaryGeneratedColumn({ type: "int", name: "log_id" })
  logId!: number;

  @Column("int", { name: "car_id" })
  carId!: number;

  @Column("int", { name: "client_id" })
  clientId!: number;

  @Column("varchar", { name: "action", length: 255 })
  action!: string;

  @Column("timestamp", { name: "change_date", default: () => "CURRENT_TIMESTAMP" })
  changeDate!: Date;

  @Column("varchar", { name: "user", length: 100, default: () => "'system'" })
  user!: string;

  @ManyToOne(() => ClientCar, (clientCar) => clientCar.logs, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  @JoinColumn([{ name: "car_id", referencedColumnName: "id" }])
  car!: ClientCar;

  @ManyToOne(() => Clients, (client) => client.carLogs, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  @JoinColumn([{ name: "client_id", referencedColumnName: "clientId" }])
  client!: Clients;
}