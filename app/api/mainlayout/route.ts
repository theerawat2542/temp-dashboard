import { connectMESdatabase } from "@/app/lib/db-util";
import { getIdleTime } from "@/app/lib/helpers/getIdletime";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  let connectmes9771db: any;
  const url = new URL(req.url);
  const plant = url.searchParams.get("plant");
  const prod_line = url.searchParams.get("prod_line");
  if (!plant || !prod_line) {
    return NextResponse.json(
      { message: "กรุณาระบุ plant และ production line" },
      { status: 400 }
    );
  }

  try {
    connectmes9771db = await connectMESdatabase();
    connectmes9771db.connect();

    const [row]: any = await getIdleTime(connectmes9771db, plant, prod_line);
    return NextResponse.json({ message: "success", row }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong!", error },
      { status: 500 }
    );
  } finally {
    connectmes9771db.destroy();
  }
}
