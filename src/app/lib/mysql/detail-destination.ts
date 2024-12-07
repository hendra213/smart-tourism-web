import { prismaClient } from "./init";

// format tanggal
function formatDate(date: Date): string {
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// type for average rating
type AverageRatingResult = {
  _avg: {
    rating: number | null;
  };
};

export const getDataDetailDestination = async (tempatWisata: string[]) => {
  try {
    const queries = [
      // query average rating
      prismaClient.sentiments.aggregate({
        _avg: { rating: true },
        where: {
          ...(tempatWisata.length > 0
            ? { tempat_wisata: { in: tempatWisata } }
            : {}),
        },
      }),

      // query last 5 dates
      prismaClient.sentiments.findMany({
        select: { date: true },
        distinct: ["date"],
        orderBy: { date: "desc" },
        take: 5,
        where: {
          ...(tempatWisata.length > 0
            ? { tempat_wisata: { in: tempatWisata } }
            : {}),
        },
      }),
    ];

    const [averageRatingResult, lastFiveDates] = await Promise.all(queries);

    // final average rating
    const averageRating = (averageRatingResult as AverageRatingResult)._avg
      .rating;

    // final last 5 dates
    const dates = (lastFiveDates as { date: Date }[]).map((item) => item.date);
    const reviews = await prismaClient.sentiments.groupBy({
      by: ["date"],
      _count: { id: true },
      where: {
        date: { in: dates },
        tempat_wisata:
          tempatWisata.length > 0 ? { in: tempatWisata } : undefined,
      },
      orderBy: { date: "asc" },
    });

    const reviewsByDate = reviews.map((item) => ({
      date: formatDate(item.date),
      count: item._count.id,
    }));

    // query tokenized
    const sentiments = await prismaClient.sentiments.findMany({
      select: { tokenized: true },
      where: {
        ...(tempatWisata.length > 0
          ? { tempat_wisata: { in: tempatWisata } }
          : {}),
      },
    });

    // final top keywords
    const keywordMap: { [key: string]: number } = {};
    sentiments.forEach((sentiment) => {
      const fixedTokenized = sentiment.tokenized.replace(/'/g, '"');
      try {
        const tokens = JSON.parse(fixedTokenized);
        for (let i = 0; i < tokens.length - 1; i++) {
          const phrase = `${tokens[i].trim()} ${tokens[i + 1].trim()}`;
          keywordMap[phrase] = (keywordMap[phrase] || 0) + 1;
        }
      } catch (error) {
        console.error("Error parsing tokenized data:", error);
      }
    });

    const topKeywords = Object.entries(keywordMap)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([text, count]) => ({ text, count }));

    const tingkatRespon = "100%";

    return {
      averageRating,
      reviewsByDate,
      topKeywords,
      tingkatRespon,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getDataDetailDestinationReview = async (
  tempatWisata: string[]
) => {
  try {
    const sentiments = await prismaClient.sentiments.findMany({
      select: {
        id: true,
        komentar: true,
        source: true,
        rating: true,
        date: true,
      },
      where: {
        tempat_wisata:
          tempatWisata.length > 0 ? { in: tempatWisata } : undefined,
      },
      orderBy: {
        date: "desc",
      },
      take: 10,
    });

    return sentiments;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
