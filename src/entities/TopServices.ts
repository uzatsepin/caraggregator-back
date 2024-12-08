import { ViewEntity, ViewColumn } from 'typeorm';

@ViewEntity({
    name: "top_service_stations",
    expression: `
    SELECT 
        ss.station_name,
        c.city_name,
        ss.rating,
        COUNT(so.order_id) as total_orders
    FROM service_stations ss
    JOIN cities c ON ss.city_id = c.city_id
    LEFT JOIN service_orders so ON ss.station_id = so.station_id
    GROUP BY ss.station_id, ss.station_name, c.city_name, ss.rating
    ORDER BY total_orders DESC, ss.rating DESC;
    `
})
export class TopServiceStation {
    @ViewColumn()
    station_name!: string;

    @ViewColumn()
    city_name!: string;

    @ViewColumn()
    rating!: number;

    @ViewColumn()
    total_orders!: number;
}