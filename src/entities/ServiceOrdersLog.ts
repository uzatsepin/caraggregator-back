import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("service_orders_log")
export class ServiceOrdersLog {
  @PrimaryGeneratedColumn({ name: "log_id" })
  logId!: number;

  @Column("int", { name: "order_id" })
  orderId!: number;

  @Column("varchar", { name: "changed_field", length: 50 })
  changedField!: string;

  @Column("text", { name: "old_value", nullable: true })
  oldValue!: string | null;

  @Column("text", { name: "new_value", nullable: true })
  newValue!: string | null;

  @Column("timestamp", {
    name: "change_date",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  changeDate!: Date | null;

  @Column("varchar", { name: "user", nullable: true, length: 100 })
  user!: string | null;
}
