import { connect78database } from "@/app/lib/db-util";
import { getAttendanceData } from "@/app/lib/helpers/getAttendance";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  let connect78db: any;
  const url = new URL(req.url);
  const plant = url.searchParams.get("plant");

  if (!plant) {
    return NextResponse.json({ message: "กรุณาใส่ plant!" }, { status: 400 });
  }

  try {
    connect78db = await connect78database();
    connect78db.connect();

    const [rows]: any = await getAttendanceData(connect78db, plant);
    return NextResponse.json({ rows }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong!", error },
      { status: 500 }
    );
  } finally {
    connect78db?.destroy();
  }
}
