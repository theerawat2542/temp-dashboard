import { connect78database } from '@/app/lib/db-util';
import { getMaterial } from "@/app/lib/helpers/getMaterial";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  let connect78db: any;
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

  try {
    connect78db = await connect78database();
    connect78db.connect();

    const [rows]: any = await getMaterial(connect78db, startdate, enddate, plant);
    return NextResponse.json({ rows }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Somethind went wrong!", error },
      { status: 500 }
    );
  } finally {
    connect78db?.destroy();
  }
}
