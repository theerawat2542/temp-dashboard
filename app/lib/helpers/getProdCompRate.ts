import { Connection, RowDataPacket } from "mysql2";

export async function getProdCompRate(
  connection: Connection,
  startdate: string,
  enddate: string,
  plant: string
) {
  const RF_Lines: string = "('RA', 'RB')";
  const WAC_Lines: string = "('W1', 'W2', 'WC')";
  const SAC_Lines: string = "('W1', 'W2', 'IN', 'N2', 'N3', 'OU', 'U2', 'U3')";
  let lines: string = "";

  switch (plant) {
    case "9771":
      lines = RF_Lines;
      break;
    case "9773":
      lines = WAC_Lines;
      break;
    case "9774":
      lines = SAC_Lines;
      break;
    default:
      lines = "";
      break;
  }

  const sql = `select
                p.FactoryNo,
                p.EST as ProdDate,
                substr(p.Edition, 2, 2) as ProdLine,
                SUM(p.Quantity) as TotalPlanQty,
                SUM(p.ActualQuantity) as TotalActualQty,
                (SUM(p.ActualQuantity)/ SUM(p.Quantity))* 100 as CompleteRate,
                format(100-((SUM(p.ActualQuantity)/ SUM(p.Quantity))* 100),2)  as PendingRate
            from
                cosmo_im_${plant}.base_production_order_t p
            where
                1 = 1
                and substr(p.Edition, 2, 2) in ${lines}
                and date(p.EST) between '${startdate}' and '${enddate}'
            group by
                p.FactoryNo,
                p.EST,
                substr(p.Edition, 2, 2)
            order by
                substr(p.Edition, 2, 2),
                p.EST`;
  return connection.query<RowDataPacket[]>(sql);
}
