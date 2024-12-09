import { ViewEntity, ViewColumn } from 'typeorm';

@ViewEntity({
    name: "station_specialization_performance",
    expression: `
        SELECT
            ss.station_name,
            c.city_name,
            COUNT(so.order_id) as total_orders,
            COUNT(DISTINCT so.client_id) as unique_clients,
            AVG(so.total_cost) as avg_service_cost,
            SUM(so.total_cost) as total_revenue,
            COUNT(CASE WHEN so.status = 'Завершено' THEN 1 END) as completed_services
        FROM service_stations ss
                 JOIN cities c ON ss.city_id = c.city_id
                 LEFT JOIN service_orders so ON ss.station_id = so.station_id
        GROUP BY ss.station_id, ss.station_name, c.city_name
        ORDER BY total_revenue DESC
    `
})
export class StationPerformance {
    @ViewColumn()
    station_name!: string;

    @ViewColumn()
    city_name!: string;

    @ViewColumn()
    total_orders!: number;

    @ViewColumn()
    unique_clients!: number;

    @ViewColumn()
    avg_service_cost!: number;

    @ViewColumn()
    total_revenue!: number;

    @ViewColumn()
    completed_services!: number;
}
