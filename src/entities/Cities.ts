import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ServiceStations } from "./ServiceStations";

@Entity("cities", { schema: "service_agregator" })
export class Cities {
  @PrimaryGeneratedColumn({ type: "int", name: "city_id" })
  cityId!: number;

  @Column("varchar", { name: "city_name", length: 100 })
  cityName!: string;

  @Column("varchar", { name: "region", length: 100 })
  region!: string;

  @OneToMany(() => ServiceStations, (serviceStations) => serviceStations.city)
  serviceStations!: ServiceStations[];
}
