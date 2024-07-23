import { connectMESdatabase } from "@/app/lib/db-util";
import { getProdCompRate } from "@/app/lib/helpers/getProdCompRate";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  let connectMESdb: any;

  const url = new URL(req.url);
  const startdate = url.searchParams.get("startdate");
  const enddate = url.searchParams.get("enddate");
  const plant = url.searchParams.get("plant");

  if (!plant) {
    return NextResponse.json({ message: "กรุณาใส่ plant!" }, { status: 400 });
  }

  if (!startdate || !enddate) {
    return NextResponse.json(
      { message: "กรุณาใส่วันที่เริ่มต้นและสิ้นสุด" },
      { status: 400 }
    );
  }
  try {
    connectMESdb = await connectMESdatabase();
    connectMESdb.connect();

    const [rows]: any = await getProdCompRate(connectMESdb, startdate, enddate, plant);
    return NextResponse.json({ rows }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Somethind went wrong!", error },
      { status: 500 }
    );
  } finally {
    connectMESdb?.destroy();
  }
}
