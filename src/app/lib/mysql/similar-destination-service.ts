import { prismaClient } from "./init";

type AverageRatingResult = {
  _avg: {
    rating: number | null;
  };
};

export const getDataSimilar = async (
  tempatWisata: string[],
  location: string
) => {
  try {
    const queries = [
      // query average rating
      prismaClient.sentiments.aggregate({
        _avg: { rating: true },
        where: {
          tempat_wisata: {
            in: tempatWisata,
          },
        },
      }),

      // query total ulasan
      prismaClient.sentiments.count({
        where: {
          tempat_wisata: {
            in: tempatWisata,
          },
        },
      }),

      // query total ulasan positif
      prismaClient.sentiments.count({
        where: {
          label: "positif",
          tempat_wisata: {
            in: tempatWisata,
          },
        },
      }),
    ];

    const [averageRatingResult, totalReviews, positifReviews] =
      await Promise.all(queries);

    // final average rating
    const averageRating = (averageRatingResult as AverageRatingResult)._avg
      .rating;

    // final total reviews
    const totalReviewsCount =
      typeof totalReviews === "number" ? totalReviews : 0;

    // final positive percentage
    const positivePercentage =
      totalReviewsCount && typeof positifReviews === "number"
        ? Math.round((positifReviews / totalReviewsCount) * 100)
        : 0;

    return {
      ratePrice: "Coming Soon",
      performa: averageRating,
      responseRate: "100%",
      reviews: totalReviews,
      popularity: positivePercentage,
      overallRating: positifReviews,
      location,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
