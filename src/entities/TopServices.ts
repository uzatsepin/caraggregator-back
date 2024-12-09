import { ViewEntity, ViewColumn } from 'typeorm';

@ViewEntity({
    name: "top_service_stations",
    expression: `
        SELECT
            ss.station_name,
            c.city_name,
            SUM(so.total_cost) as total_cost,
            COUNT(so.order_id) as total_orders,
            AVG(so.total_cost) as avg_order_cost
        FROM service_stations ss
                 JOIN cities c ON ss.city_id = c.city_id
                 LEFT JOIN service_orders so ON ss.station_id = so.station_id
        WHERE so.status = 'Завершено'
        GROUP BY ss.station_id, ss.station_name, c.city_name
        HAVING AVG(so.total_cost) > 500 AND SUM(so.total_cost) > 2000
        ORDER BY total_cost DESC, avg_order_cost DESC
            LIMIT 3;
    `
})
export class TopServiceStation {
    @ViewColumn()
    station_name!: string;

    @ViewColumn()
    city_name!: string;

    @ViewColumn()
    total_cost!: number;

    @ViewColumn()
    total_orders!: number;

    @ViewColumn()
    avg_order_cost!: number;
}
