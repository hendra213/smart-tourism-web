import { upsertData } from "@/app/lib/mysql/post-visitors";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const searchParams = await request.formData();
    console.log(searchParams);

    const postData = await upsertData(
      searchParams.get("nama_wisata"),
      searchParams.get("tanggal"),
      searchParams.get("pengunjung_masuk"),
      searchParams.get("pengunjung_keluar"),
      searchParams.get("pengunjung_di_dalam"),
      searchParams.get("suhu"),
      searchParams.get("kelembapan")
    );

    return NextResponse.json(
      { status: 200, message: "Success to post data.", postData },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { status: 500, message: "Failed to post data." + error },
      { status: 500 }
    );
  }
}
