import { prismaClient } from "./init";

export const getDataChart = async () => {
  try {
    const result = await prismaClient.visitors.findMany({
      select: {
        id: true,
        nama_wisata: true,
        tanggal: true,
        pengunjung_di_dalam: true,
      },
      orderBy: {
        tanggal: "desc",
      },
      take: 7,
    });

    console.log(result);
    return result;
  } catch (error) {
    console.error("Error fetching data chart:", error);
    throw new Error("Failed to fetch reviews");
  }
};
