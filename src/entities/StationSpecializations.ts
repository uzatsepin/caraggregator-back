import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
} from "typeorm";
import { ServiceStations } from "./ServiceStations";
import { CarBrands } from "./CarBrands";

@Entity("station_specializations")
export class StationSpecializations {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id!: number;

  @Column({ name: "station_id", type: "int", nullable: false })
  stationId!: number;

  @Column({ name: "brand_id", type: "int", nullable: false })
  brandId!: number;

  @ManyToOne(() => ServiceStations, (station) => station.specializations, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "station_id" })
  station!: ServiceStations;

  @ManyToOne(() => CarBrands, (brand) => brand.specializations, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "brand_id" })
  brand!: CarBrands;
}