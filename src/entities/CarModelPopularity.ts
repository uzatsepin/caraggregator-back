import { ViewEntity, ViewColumn } from 'typeorm';

@ViewEntity({
    name: "car_model_popularity",
    expression: `
        SELECT
            cb.brand_name,
            cb.brand_logo,
            cm.model_name,
            cm.model_year,
            COUNT(DISTINCT so.order_id) AS service_visits,
            AVG(so.total_cost) AS avg_service_cost,
            COUNT(DISTINCT cc.client_id) AS unique_owners,
            AVG(cc.mileage) AS avg_mileage
        FROM car_models cm
                 JOIN car_brands cb ON cm.brand_id = cb.brand_id
                 LEFT JOIN service_orders so ON cm.model_id = so.car_model_id
                 LEFT JOIN client_car cc ON cm.model_id = cc.model_id
        GROUP BY cb.brand_id, cb.brand_name, cb.brand_logo, cm.model_id, cm.model_name, cm.model_year
        HAVING COUNT(DISTINCT cc.client_id) > 0
        ORDER BY service_visits DESC
    `
})
export class CarModelPopularity {
    @ViewColumn()
    brand_name!: string;

    @ViewColumn()
    brand_logo!: string;

    @ViewColumn()
    model_name!: string;

    @ViewColumn()
    model_year!: string;

    @ViewColumn()
    service_visits!: number;

    @ViewColumn()
    avg_service_cost!: number;

    @ViewColumn()
    unique_owners!: number;

    @ViewColumn()
    avg_mileage!: number;
}
