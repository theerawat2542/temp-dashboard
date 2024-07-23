import { Connection, RowDataPacket } from "mysql2";

export async function getDeliveryWeekly(
  connection: Connection,
  startdate: string,
  enddate: string,
  plant: string
) {
  const sql = `
    SELECT
        CONCAT(MONTH(pro_out_time), '-W', CEIL(DAY(pro_out_time) / 7)) AS month_week,
        IFNULL(SUM(order_amount), 0) AS allQty,
        IFNULL(SUM( CASE WHEN   WEEK( fin_time ) < pro_out_time THEN out_amount END ),0) as timelyQty
    FROM
        cosmo_wms_${plant}.ods_pro_out_dn
    WHERE
        pro_out_time > '${startdate} 00:00:00'
        AND pro_out_time < '${enddate} 23:59:59'
    GROUP BY
        month_week
    ORDER BY
        MIN(pro_out_time);`;
  return connection.query<RowDataPacket[]>(sql);
}