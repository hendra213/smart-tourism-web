import { prismaClient } from "./init";

export const upsertData = async (
  namaWisata: string,
  tanggal: string,
  pengunjungMasuk: number,
  pengunjungKeluar: number,
  pengunjungDiDalam: number,
  suhu: number,
  kelembapan: number
) => {
  try {
    const convertedDate = new Date(tanggal).toISOString();
    console.log(convertedDate);
    // cek data apakah sudah ada
    const checkData = await prismaClient.visitors.findFirst({
      where: {
        tanggal: convertedDate,
        nama_wisata: namaWisata,
      },
    });
    const data = {
      pengunjung_masuk: parseInt(pengunjungMasuk),
      pengunjung_keluar: parseInt(pengunjungKeluar),
      pengunjung_di_dalam: parseInt(pengunjungDiDalam),
      suhu: parseInt(suhu),
      kelembapan: parseInt(kelembapan),
    };

    if (checkData) {
      // if data sudah tersedia

      const updateData = await prismaClient.visitors.update({
        where: {
          id: checkData.id,
        },
        data,
      });

      console.log("Visitors data updated.");
      return updateData;
    } else {
      const newData = await prismaClient.visitors.create({
        data: {
          nama_wisata: namaWisata,
          tanggal: convertedDate,
          ...data,
        },
      });

      console.log("Visitors data inserted.");
      return newData;
    }
  } catch (error) {
    console.error("Error post data visitors:", error);
    throw error;
  }
};
