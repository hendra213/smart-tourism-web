import { upsertData } from "@/app/lib/mysql/post-visitors";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Parsing body JSON dari request
    const body = await request.json();
    console.log("Request Body:", body);

    // Validasi apakah semua field yang diperlukan ada
    const requiredFields = [
      "nama_wisata",
      "tanggal",
      "pengunjung_masuk",
      "pengunjung_keluar",
      "pengunjung_di_dalam",
      "suhu",
      "kelembapan",
    ];

    for (const field of requiredFields) {
      if (!body[field]) {
        throw new Error(`Field "${field}" is missing in the request.`);
      }
    }

    // Kirim data ke database
    const postData = await upsertData(
      body.nama_wisata,
      body.tanggal,
      body.pengunjung_masuk,
      body.pengunjung_keluar,
      body.pengunjung_di_dalam,
      body.suhu,
      body.kelembapan
    );

    // Return success response
    return NextResponse.json(
      { status: 200, message: "Success to post data.", postData },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);

    // Return error response
    return NextResponse.json(
      {
        status: 500,
        message: "Failed to post data. " + (error as Error).message,
      },
      { status: 500 }
    );
    
  }
}
