import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ServiceOrders } from "./ServiceOrders";
import { Cities } from "./Cities";
import { StationSpecializations } from "./StationSpecializations";

@Index("city_id", ["cityId"], {})
@Entity("service_stations", { schema: "service_agregator" })
export class ServiceStations {
  @PrimaryGeneratedColumn({ type: "int", name: "station_id" })
  stationId!: number;

  @Column("varchar", { name: "station_name", length: 200 })
  stationName!: string;

  @Column("int", { name: "city_id" })
  cityId!: number;

  @Column("varchar", { name: "address", length: 300 })
  address!: string;

  @Column("varchar", { name: "phone", length: 20 })
  phone!: string;

  @Column("varchar", { name: "email", nullable: true, length: 100 })
  email!: string | null;

  @Column("decimal", {
    name: "rating",
    nullable: true,
    precision: 3,
    scale: 2,
    default: () => "'0.00'",
  })
  rating!: string | null;

  @Column("timestamp", {
    name: "registration_date",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  registrationDate!: Date | null;

  @OneToMany(() => ServiceOrders, (serviceOrders) => serviceOrders.station)
  serviceOrders!: ServiceOrders[];

  @ManyToOne(() => Cities, (cities) => cities.serviceStations, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "city_id", referencedColumnName: "cityId" }])
  city!: Cities;

  @OneToMany(() => StationSpecializations, (specialization) => specialization.station)
  specializations!: StationSpecializations[];

  @Column("decimal", {
    name: "total_revenue",
    precision: 15,
    scale: 2,
    default: () => "0.00",
  })
  totalRevenue!: string;
}