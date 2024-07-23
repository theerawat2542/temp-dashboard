import { NextRequest, NextResponse } from "next/server";
import { connectWMS9771Database } from "@/app/lib/db-util";
import { getDeliveryWeekly } from "@/app/lib/helpers/getDeliveryWeekly";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const startdate = url.searchParams.get("startdate");
  const enddate = url.searchParams.get("enddate");
  const plant = url.searchParams.get("plant");

  if (!plant) {
    return NextResponse.json({ message: "กรุณาใส่ plant!" }, { status: 400 });
  }

  if (!startdate || !enddate) {
    return NextResponse.json({message: 'กรุณาใส่วันที่เริ่มต้นและสิ้นสุด'}, {status: 400})
  }

  let wms9771_connection: any;
  // Connect Database
  try {
    wms9771_connection = await connectWMS9771Database();
    wms9771_connection.connect();

    const [rows]: any = await getDeliveryWeekly(
      wms9771_connection,
      startdate,
      enddate,
      plant
    );
    return NextResponse.json({ rows }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong!", error },
      { status: 500 }
    );
  } finally {
    wms9771_connection?.destroy();
  }
}
