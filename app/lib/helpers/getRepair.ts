import { Connection, RowDataPacket } from "mysql2";
import { getProdLineList } from "../utility/getProdlineList";

export async function getRepair(connection: Connection, plant: string) {
  const sql = `
        SELECT
            COUNT(p.WorkUser_BarCode) AS input_qty,
            COUNT(CASE WHEN y.RepairEndTime IS NOT NULL THEN 1 END) AS output_qty,
            COUNT(p.WorkUser_BarCode) - COUNT(CASE WHEN y.RepairEndTime IS NOT NULL THEN 1 END) as remain_qty,
            n.WorkUser_LineCode as line_code,
            t.Work_Cell_Desc AS scan_station 
        FROM cosmo_im_${plant}.bns_qm_processtestdetail de -- detail scan defect
        INNER JOIN cosmo_im_${plant}.bns_qm_processtest p USE INDEX (TestTime_index)
            ON p.ProcessTest_ID = de.ProcessTest_ID AND p.TestResult = 0
        LEFT JOIN cosmo_im_${plant}.bns_pm_operation n
            ON p.WorkUser_BarCode = n.WorkUser_BarCode
        LEFT JOIN cosmo_im_${plant}.pm_Work_Cells_t t
            ON de.Reason_Code4 = t.Work_Cell_Code AND t.ACTIVE = '1'
        LEFT JOIN cosmo_im_${plant}.bns_qm_repairapply y
            ON de.ProcessTestDetail_ID = y.ProcessTestDetail_ID
        WHERE 1 = 1
            AND p.TestTime >= curdate()
            AND n.WorkUser_LineCode IN ${getProdLineList(plant)}
        GROUP BY
            n.WorkUser_LineCode ,t.Work_Cell_Desc;
    `;

  return connection.query<RowDataPacket[]>(sql);
}
