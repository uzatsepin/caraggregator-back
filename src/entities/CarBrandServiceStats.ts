import { ViewEntity, ViewColumn } from 'typeorm';

@ViewEntity({
    name: "car_brands_service_stats",
    expression: `
    SELECT 
        cb.brand_name,
        cb.brand_logo,
        COUNT(so.order_id) as total_orders,
        AVG(so.total_cost) as avg_service_cost
    FROM service_orders so
    JOIN car_models cm ON so.car_model_id = cm.model_id
    JOIN car_brands cb ON cm.brand_id = cb.brand_id
    GROUP BY cb.brand_id, cb.brand_name
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