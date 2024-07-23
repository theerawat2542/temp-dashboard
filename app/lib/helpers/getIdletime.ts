import { Connection, RowDataPacket } from "mysql2";

export async function getIdleTime(
  connection: Connection,
  plant: string,
  prod_line: string
) {
  const sql = `
            select
            d.Production_Line_Code,
            d.Work_Cell_Code,
            c.Work_Cell_Desc,
            c.colum_index,
            d.ARRIVE_TIME,
            second(TIMEDIFF(NOW(), d.ARRIVE_TIME)) as idleTime
        from
            (
            select
                Production_Line_Code,
                Work_Cell_Code,
                MAX(ARRIVE_TIME) as ARRIVE_TIME
            from
                cosmo_im_${plant}.bns_pm_prodprocess
            where
                create_date >= curdate()
                and Production_Line_Code = '${prod_line}'
            group by
                Production_Line_Code,
                Work_Cell_Code
        ) d
        left join cosmo_im_${plant}.pm_work_cells_t c on
            c.Work_Cell_Code = d.Work_Cell_Code
        order by
            d.Production_Line_Code,
            c.colum_index
    `;
  return connection.query<RowDataPacket[]>(sql);
}
