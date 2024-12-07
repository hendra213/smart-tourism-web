"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

type Review = {
  id: number;
  komentar: string;
  source: string;
  rating: number;
  date: string;
};

export default function UlasanPage() {
  const router = useRouter();

  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/detail-destinasi/ulasan?tempat_wisata=likupang`
        );
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        setReviews(data.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleBackClick = () => {
    router.back();
  };

  return (
    <div className="bg-white min-h-screen p-8 text-black">
      {/* Kembali ke halaman sebelumnya */}
      <Button
        onClick={handleBackClick}
        className="mb-4 bg-orange-500 text-white hover:bg-orange-600"
      >
        &larr; Kembali
      </Button>

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-semibold">Ulasan</h1>

        {/* Total Ulasan di sebelah kanan */}
        <div className="text-lg font-bold">Total Ulasan: 10</div>
      </div>

      {/* Daftar Ulasan */}
      <div>
        {reviews.map((review) => (
          <div
            key={review.id}
            className="mb-8 p-4 bg-gray-50 rounded-lg shadow-md"
          >
            <div className="flex items-center space-x-4">
              {/* Profil Image */}
              <div className="flex-shrink-0">
                <img
                  src={`/${review.source}-icon.png`}
                  alt="Profile"
                  className="w-14 h-14 rounded-full border-2 border-orange-500"
                />
              </div>

              <div className="flex-1">
                {/* Nama Pengguna */}
                <p className="font-semibold text-lg text-gray-800">
                  {review.source} User
                </p>

                {/* Rating */}
                <div className="flex text-yellow-500 text-xl mt-1">
                  {[...Array(5)].map((_, index) => (
                    <span
                      key={index}
                      className={`${
                        index < review.rating
                          ? "text-orange-500"
                          : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4">
              {/* Komentar */}
              <p className="text-gray-700 text-sm italic">
                "{review.komentar}"
              </p>

              {/* Tanggal Ulasan */}
              <p className="text-xs text-gray-500 mt-2">
                Ditulis pada: {new Date(review.date).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
