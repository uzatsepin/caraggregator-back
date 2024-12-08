import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    Unique,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from "typeorm";
import { Clients } from "./Clients";
import { CarBrands } from "./CarBrands";
import { CarModels } from "./CarModels";
import { ClientCarLog } from "./CarClientLog";

@Entity("client_car", { schema: "service_agregator" })
@Unique(["licensePlate"])
@Unique(["vin"])
export class ClientCar {
    @PrimaryGeneratedColumn({ type: "int", name: "id" })
    id!: number;

    @Column("varchar", { name: "license_plate", length: 20 })
    licensePlate!: string;

    @Column("varchar", { name: "vin", length: 17 })
    vin!: string;

    @Column("varchar", { name: "mileage", length: 6 })
    mileage!: string;

    @ManyToOne(() => Clients, (client) => client.clientCars, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    @JoinColumn([{ name: "client_id", referencedColumnName: "clientId" }])
    client!: Clients;

    @OneToMany(() => ClientCarLog, (log) => log.car)
    logs!: ClientCarLog[];

    @ManyToOne(() => CarBrands, (brand) => brand.clientCars, { onDelete: "SET NULL", onUpdate: "CASCADE" })
    @JoinColumn([{ name: "brand_id", referencedColumnName: "brandId" }])
    carBrand!: CarBrands;

    @ManyToOne(() => CarModels, (model) => model.clientCars, { onDelete: "SET NULL", onUpdate: "CASCADE" })
    @JoinColumn([{ name: "model_id", referencedColumnName: "modelId" }])
    carModel!: CarModels;

    @Column("timestamp", {
        name: "created_at",
        nullable: false,
        default: () => "CURRENT_TIMESTAMP"
    })
    createdAt!: Date;

    @Column("timestamp", {
        name: "updated_at",
        nullable: false,
        default: () => "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP"
    })
    updatedAt!: Date;
}