import { Connection, RowDataPacket } from "mysql2";

export async function getMaterial(
  connection: Connection,
  startdate: string,
  enddate: string,
  plant: string
) {
  const sql = `select
                    t.*
                        from
                        t1purchase t
                        inner join
                    (
                        select
                            Plant ,
                            max(CreateDate) as CreateDate
                        from
                            t1purchase tp
                        where
                            CreateDate > '${startdate} 00:00:00'
                            and CreateDate < '${enddate} 23:59:59'
                        group by
                            plant,
                            date(CreateDate)
                        ) md on
                        md.plant = t.Plant
                        and md.CreateDate = t.CreateDate
                    where
                    t.plant = '${plant}'`;
  return connection.query<RowDataPacket[]>(sql);
}
