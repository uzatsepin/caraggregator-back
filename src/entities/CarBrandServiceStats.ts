import { ViewEntity, ViewColumn } from 'typeorm';

@ViewEntity({
    name: "car_brands_service_stats",
    expression: `
        SELECT
            cb.brand_name,
            cb.brand_logo,
            COUNT(DISTINCT so.order_id) AS total_orders,
            AVG(so.total_cost) AS avg_service_cost
        FROM car_brands cb
                 LEFT JOIN car_models cm ON cb.brand_id = cm.brand_id
                 LEFT JOIN service_orders so ON cm.model_id = so.car_model_id
        GROUP BY cb.brand_id, cb.brand_name, cb.brand_logo
        ORDER BY total_orders DESC
    `
})
export class CarBrandServiceStats {
    @ViewColumn()
    brand_name!: string;

    @ViewColumn()
    brand_logo!: string;

    @ViewColumn()
    total_orders!: number;

    @ViewColumn()
    avg_service_cost!: number;
}
