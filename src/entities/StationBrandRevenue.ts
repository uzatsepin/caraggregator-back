import { ViewEntity, ViewColumn } from 'typeorm';

@ViewEntity({
    name: "station_brand_revenue",
    expression: `
        SELECT
            station_name,
            brand_name,
            brand_logo,
            total_revenue
        FROM (
                 SELECT
                     ss.station_name,
                     cb.brand_name,
                     cb.brand_logo,
                     SUM(so.total_cost) AS total_revenue,
                     ROW_NUMBER() OVER (
                PARTITION BY ss.station_id 
                ORDER BY SUM(so.total_cost) DESC
            ) AS rn
                 FROM service_orders so
                          JOIN car_models cm ON so.car_model_id = cm.model_id
                          JOIN car_brands cb ON cm.brand_id = cb.brand_id
                          JOIN service_stations ss ON so.station_id = ss.station_id
                 GROUP BY ss.station_id, ss.station_name, cb.brand_id, cb.brand_name, cb.brand_logo
             ) AS ranked
        WHERE rn = 1
    `
})
export class StationBrandRevenue {
    @ViewColumn()
    station_name!: string;

    @ViewColumn()
    brand_name!: string;

    @ViewColumn()
    brand_logo!: string;

    @ViewColumn()
    total_revenue!: number;
}