"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ChartLabuanBajo } from "@/components/detail-destinasi/labuan-bajo/chart-labuan-bajo";
import { ScrollArea } from "@/components/ui/scroll-area";
import TopKeywordsLabuanBajo from "@/components/detail-destinasi/labuan-bajo/topkeywords-labuan-bajo";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function LikupangDetail() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);

  const handleChartClick = () => {
    router.push("/detaildestinasi/labuan-bajo/ulasan");
  };

  const [datas, setDatas] = useState({
    averageRating: 0,
    totalReviews: 0,
    positivePercentage: 0,
    reviewsByDate: [],
    positive: 0,
    netral: 0,
    negative: 0,
    topKeywords: [],
    positiveFeedback: [],
    negativeFeedback: [],
  });

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const [selection, setSelection] = useState<string>("");

  const handleSelection = (choice: "SOLO" | "Family") => {
    setSelection(choice);
    setIsOpen(false);
  };

  return (
    <div className="p-8 bg-white min-h-screen">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button
          className="text-white font-bold text-2xl mr-4 bg-orange-500 p-1.5 rounded-sm"
          onClick={() => router.back()}
        >
          &larr;
        </button>
        <h1 className="text-orange-500 text-4xl font-bold uppercase">
          labuan bajo
        </h1>
      </div>

      {/* Konten Utama */}
      <div className="flex flex-wrap">
        {/* Gambar dan Rating */}
        <div className="w-full md:w-2/3">
          <div className="relative">
            <img
              src="/images/Labuan%20Bajo.jpg"
              alt="Likupang"
              className="w-full h-auto rounded-lg shadow-lg"
            />
            <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-md shadow-md flex items-center">
              <span className="text-yellow-500 font-bold">⭐</span>
              <p className="ml-1 font-bold text-gray-800">4.0</p>
            </div>
          </div>
        </div>

        {/* Detail Wisata */}
        <div className="w-full md:w-1/3 mt-6 md:mt-0 md:pl-6 text-justify">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Detail Wisata:
          </h2>
          <div className="text-gray-700 leading-relaxed">
            <p>
              <strong>Labuan Bajo</strong> adalah kelurahan yang terletak di{" "}
              <strong>
                {" "}
                Kecamatan Komodo, Kabupaten Manggarai Barat, Nusa Tenggara Timur
              </strong>
              , sekaligus <strong>ibu kota kabupaten</strong> tersebut. Labuan
              Bajo telah ditetapkan sebagai salah satu destinasi wisata{" "}
              <strong>superprioritas di Indonesia</strong>, dengan keindahan
              alamnya yang menjadi daya tarik utama.
            </p>
            <p className="mt-4">
              Sebagai{" "}
              <strong>gerbang utama menuju Taman Nasional Komodo</strong>,
              Labuan Bajo menawarkan pengalaman unik seperti melihat{" "}
              <strong>komodo di habitat aslinya</strong>, menikmati keindahan{" "}
              <strong>Pulau Padar</strong> dengan pemandangan ikoniknya, hingga
              snorkeling di <strong>Pulau Kanawa</strong> dan{" "}
              <strong>Pink Beach</strong>. Selain itu, di kawasan ini juga
              terdapat <strong>Hutan Solohana</strong>, hutan buatan yang
              menjadi salah satu lokasi wisata menarik untuk menjelajahi sisi
              alami Labuan Bajo.
            </p>
          </div>
        </div>
      </div>

      {/* Chart, Top Keywords, & Tingkat Respon */}
      <div className="grid gap-4 lg:grid-cols-3 md:grid-cols-1 sm:grid-cols-1 mt-10">
        {/* Card Jumlah Ulasan */}
        <div className="col-span-2 flex w-full cursor-pointer">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Jumlah Ulasan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-full lg:w-[100%] md:w-[70%] sm:w-[40%]">
                {loading ? (
                  <Skeleton className="w-full h-full" />
                ) : (
                  <ScrollArea>
                    <div onClick={handleChartClick} className="cursor-pointer">
                      <ChartLabuanBajo />
                    </div>
                  </ScrollArea>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex w-full flex-grow flex-col gap-2">
          {/* Card Tingkat Respon */}
          <Card className="flex flex-col items-center justify-center">
            <CardHeader>
              <CardTitle>Tingkat Respon</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-orange-500">2.3%</p>
            </CardContent>
          </Card>

          {/* Card Top Keywords */}
          <Card className="h-96">
            <CardHeader>
              <CardTitle className="flex flex-auto gap-1">
                Top Keywords
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-start text-base text-[#B0B2B2]">
                10 kata yang sering muncul pada review
              </p>
              {loading ? (
                <Skeleton className="w-full h-6" />
              ) : (
                <TopKeywordsLabuanBajo data={datas.topKeywords} />
              )}
              {/* yg top keywords ini aku copas dari yg dashboard tapi udah dibedakan filenya */}
              {/* nah yg di dashboard kan tergantung dari select destination + filter" lainnya, nah yg ini kan ngga nanti */}
              {/* jadi selamat mengatur" :D */}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tombol Aksi */}
      <div className="mt-8 text-center">
        <button
          className="bg-orange-500 text-white text-lg font-bold px-6 py-3 rounded-lg shadow-lg hover:bg-orange-600"
          onClick={() => setIsOpen(true)}
        >
          Ingin Berkunjung Ke Destinasi Ini?
        </button>

        {/* Dialog ShadCN */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="flex justify-center items-center">
                <img
                  src="/help-circle.png"
                  alt="Help"
                  className="w-[20%] h-auto"
                />
              </DialogTitle>
              <DialogDescription className="font-bold text-black text-center text-xl">
                Perjalanan ini dilakukan sendiri atau bersama keluarga?
              </DialogDescription>
            </DialogHeader>

            {/* Grid layout untuk dua tombol */}
            <div className="grid grid-cols-2 gap-4 py-4">
              <Button
                variant="outline"
                onClick={() => handleSelection("SOLO")}
                className="bg-orange-500 text-white hover:bg-orange-600 font-bold hover:text-white"
              >
                SOLO
              </Button>
              <Button
                variant="outline"
                onClick={() => handleSelection("Family")}
                className="bg-white border-[#FF8225] text-orange-500 hover:text-orange-600 hover:border-orange-600 font-bold"
              >
                Family
              </Button>
            </div>

            {/* Footer dialog */}
            {/* <DialogFooter>
              <Button variant="secondary" onClick={() => setIsOpen(false)}>
                Tutup
              </Button>
            </DialogFooter> */}
          </DialogContent>
        </Dialog>

        {/* Menampilkan pilihan yang dipilih */}
        {/* {selection && <p className="mt-4 text-lg">Anda memilih: {selection}</p>} */}
      </div>
    </div>
  );
}
