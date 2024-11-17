import { NextRequest, NextResponse } from "next/server";
import { getDataChart } from "@/app/lib/mysql/visitors";

export async function GET(request: NextRequest) {
  try {
    const data = await getDataChart();

    return NextResponse.json(
      { status: 200, message: "Success", data },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: 500, message: "Failed to fetch visitors count." },
      { status: 500 }
    );
  }
}
