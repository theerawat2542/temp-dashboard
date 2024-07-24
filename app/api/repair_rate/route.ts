import { connectMESdatabase } from "@/app/lib/db-util";
import { getRepair } from "@/app/lib/helpers/getRepair";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  let connectMESdb: any;
  const url = new URL(req.url);
  const plant = url.searchParams.get("plant");

  if (!plant) {
    return NextResponse.json({ message: "กรุณาใส่ plant!" }, { status: 400 });
  }

  try {
    connectMESdb = await connectMESdatabase();
    connectMESdb.connect();

    const [rows]: any = await getRepair(connectMESdb, plant);

    if (!rows) {
      return NextResponse.json({ message: "Not have data!" }, { status: 200 });
    }

    return NextResponse.json({ rows }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong!", error }, {status: 500});
  } finally {
    connectMESdb?.destroy();
  }
}
