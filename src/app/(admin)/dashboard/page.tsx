"use client";

import * as React from "react";
import { useCallback } from "react";
import { addDays, subDays, subMonths } from "date-fns";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TbMapSearch } from "react-icons/tb";
import { FaRegQuestionCircle } from "react-icons/fa";
import { ChartDashboard } from "@/components/dashboard/charts";
import TopKeywords from "@/components/dashboard/top-keywords";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import OverviewStatus from "@/components/dashboard/overview-status";
import { SentimentOverview } from "@/components/dashboard/sentiment";
import CustomerFeedback from "@/components/dashboard/customer-feedback";
import Impact from "@/components/dashboard/impact";
import { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { NextRequest } from "next/server";
import { useSearchParams } from "next/navigation";

export default function DashboardPage() {
  const searchParams = useSearchParams();
  let tempatWisata = searchParams.get("location");

  const [selectedRange, setSelectedRange] = React.useState<
    "7days" | "30days" | "6months" | "12months" | undefined
  >();

  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({
    from: undefined,
    to: undefined,
  });

  const [loading, setLoading] = React.useState(true);

  const [responseRate, setResponseRate] = useState<string | null>(null);
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setResponseRate("100%");
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  React.useEffect(() => {
    if (isDropdownOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isDropdownOpen]);

  const handleRangeClick = (
    range: "7days" | "30days" | "6months" | "12months"
  ) => {
    setSelectedRange(range);

    let dateRange;
    switch (range) {
      case "7days":
        dateRange = { from: subDays(new Date(), 7), to: new Date() };
        break;
      case "30days":
        dateRange = { from: subDays(new Date(), 30), to: new Date() };
        break;
      case "6months":
        dateRange = { from: subMonths(new Date(), 6), to: new Date() };
        break;
      case "12months":
        dateRange = { from: subMonths(new Date(), 12), to: new Date() };
        break;
    }
    setDateRange(dateRange);
  };

  // Fetch data
  const [selectedDestination, setSelectedDestination] = tempatWisata
    ? useState<string>(tempatWisata)
    : useState<string>("Pilih Destinasi");

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
    google: 0,
    tripadvisor: 0,
    traveloka: 0,
    tiket: 0,
  });

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `/api/dashboard?tempat_wisata=${encodeURIComponent(
          selectedDestination
        )}&dateRange=${encodeURIComponent(JSON.stringify(dateRange))}`
      );
      const res = await response.json();
      setDatas({
        averageRating: res.data.averageRating,
        totalReviews: res.data.totalReviews,
        positivePercentage: res.data.positivePercentage,
        reviewsByDate: res.data.reviewsByDate,
        positive: res.data.positive,
        netral: res.data.netral,
        negative: res.data.negative,
        topKeywords: res.data.dataTopKeywords,
        positiveFeedback: res.data.sortedPositiveFeedback,
        negativeFeedback: res.data.sortedNegativeFeedback,
        google: res.data.google,
        tripadvisor: res.data.tripadvisor,
        traveloka: res.data.traveloka,
        tiket: res.data.tiket,
      });
    };

    fetchData();
  }, [selectedDestination, dateRange]);

  return (
    <>
      <ContentLayout title="Dashboard">
        {/* Breadcrumb */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Dashboard</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Date Range Selector */}
        <div className="flex justify-between items-center my-4 text-black">
          <div className="flex gap-2">
            <Button
              className={`${
                selectedRange === "7days"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-black hover:text-white hover:bg-black"
              }`}
              onClick={() => handleRangeClick("7days")}
            >
              {loading ? <Skeleton className="w-16 h-4" /> : "7 Hari"}
            </Button>
            <Button
              className={`${
                selectedRange === "30days"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-black hover:text-white hover:bg-black"
              }`}
              onClick={() => handleRangeClick("30days")}
            >
              {loading ? <Skeleton className="w-16 h-4" /> : "30 Hari"}
            </Button>
            <Button
              className={`${
                selectedRange === "6months"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-black hover:text-white hover:bg-black"
              }`}
              onClick={() => handleRangeClick("6months")}
            >
              {loading ? <Skeleton className="w-16 h-4" /> : "6 Bulan"}
            </Button>
            <Button
              className={`${
                selectedRange === "12months"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-black hover:text-white hover:bg-black"
              }`}
              onClick={() => handleRangeClick("12months")}
            >
              {loading ? <Skeleton className="w-16 h-4" /> : "12 Bulan"}
            </Button>
          </div>

          {/* Pilih Destinasi Dropdown */}
          <div>
            <DropdownMenu onOpenChange={(open) => setIsDropdownOpen(open)}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex h-10 items-center justify-between rounded-md border 
                  border-input bg-transparent px-3 py-2 text-sm ring-offset-background 
                  placeholder:text-muted-foreground focus:outline-none focus:ring-2 
                  focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed 
                  disabled:opacity-50 lg:w-[100%] md:w-full sm:w-full"
                >
                  {loading ? (
                    <Skeleton className="mr-2 h-4 w-4" />
                  ) : (
                    <TbMapSearch className="mr-2 h-4 w-4" />
                  )}
                  {loading ? (
                    <Skeleton className="w-24 h-4" />
                  ) : (
                    selectedDestination
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[100%] flex flex-col items-center text-center">
                <DropdownMenuItem
                  onClick={() => setSelectedDestination("Pilih Destinasi")}
                  className="cursor-pointer"
                >
                  Semua Destinasi
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => setSelectedDestination("Likupang")}
                  className="cursor-pointer"
                >
                  Likupang
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => setSelectedDestination("Candi Borobudur")}
                  className="cursor-pointer"
                >
                  Borobudur
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => setSelectedDestination("Mandalika")}
                  className="cursor-pointer"
                >
                  Mandalika
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => setSelectedDestination("Labuan Bajo")}
                  className="cursor-pointer"
                >
                  Labuan Bajo
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => setSelectedDestination("Danau Toba")}
                  className="cursor-pointer"
                >
                  Danau Toba
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Maps / GIS Dashboard */}
        {/* <GISSentimentMap /> */}
        {/* Card Dashboard */}
        <div className="grid gap-4 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 grid-rows-1 mt-2">
          <Link href={`/dashboard/performa?location=${selectedDestination}`}>
            <Card className="rounded-lg border-none mt-6 hover:bg-gray-100">
              <CardHeader>
                <CardTitle className="flex flex-auto gap-1">
                  Performa
                  <HoverCard>
                    <HoverCardTrigger className="cursor-pointer">
                      <FaRegQuestionCircle />
                    </HoverCardTrigger>
                    <HoverCardContent className="z-50 bg-white shadow-md rounded-md">
                      <p className="font-normal text-sm">
                        Nilai Performa menunjukkan rata rata jumlah bintang tiap
                        destinasi.
                      </p>
                    </HoverCardContent>
                  </HoverCard>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {loading ? (
                  <Skeleton className="w-16 h-6" />
                ) : (
                  <h1 className="font-bold text-2xl">
                    {Math.round(datas.averageRating * 10) / 10} ⭐
                  </h1>
                )}
              </CardContent>
            </Card>
          </Link>

          <div>
            <Card className="rounded-lg border-none mt-6 hover:bg-gray-100">
              <CardHeader>
                <CardTitle className="flex flex-auto gap-1">
                  Tingkat Respon
                  <HoverCard>
                    <HoverCardTrigger className="cursor-pointer">
                      <FaRegQuestionCircle />
                    </HoverCardTrigger>
                    <HoverCardContent className="z-50 bg-white shadow-md rounded-md">
                      <p className="font-normal text-sm">
                        Tingkat Respon merupakan tingkat pencapaian destinasi
                        yang dihitung berdasarkan perbandingan antara pengunjung
                        yang hanya memberikan bintang dengan seluruh jumlah
                        review.
                      </p>
                    </HoverCardContent>
                  </HoverCard>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {loading ? (
                  <Skeleton className="w-16 h-6" />
                ) : (
                  <h1 className="font-bold text-2xl">{responseRate}</h1>
                )}
              </CardContent>
            </Card>
          </div>

          <Link href={`/dashboard/ulasan?location=${selectedDestination}`}>
            <Card className="rounded-lg border-none mt-6 hover:bg-gray-100">
              <CardHeader>
                <CardTitle className="flex flex-auto gap-1">
                  Jumlah Ulasan
                  <HoverCard>
                    <HoverCardTrigger className="cursor-pointer">
                      <FaRegQuestionCircle />
                    </HoverCardTrigger>
                    <HoverCardContent className="z-50 bg-white shadow-md rounded-md">
                      <p className="font-normal text-sm">
                        Ulasan merupakan jumlah seluruh response atau komentar
                        pada tiap destinasi.
                      </p>
                    </HoverCardContent>
                  </HoverCard>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {loading ? (
                  <Skeleton className="w-16 h-6" />
                ) : (
                  <h1 className="font-bold text-2xl">{datas.totalReviews}</h1>
                )}
              </CardContent>
            </Card>
          </Link>

          <div>
            <Card className="rounded-lg border-none mt-6 hover:bg-gray-100">
              <CardHeader>
                <CardTitle className="flex flex-auto gap-1">
                  Popularitas
                  <HoverCard>
                    <HoverCardTrigger className="cursor-pointer">
                      <FaRegQuestionCircle />
                    </HoverCardTrigger>
                    <HoverCardContent className="z-50 bg-white shadow-md rounded-md">
                      <p className="font-normal text-sm">
                        Nilai Popularitas menunjukkan presentase jumlah ulasan
                        positif dari seluruh ulasan.
                      </p>
                    </HoverCardContent>
                  </HoverCard>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {loading ? (
                  <Skeleton className="w-16 h-6" />
                ) : (
                  <h1 className="font-bold text-2xl">
                    {datas.positivePercentage}%
                  </h1>
                )}
              </CardContent>
            </Card>
          </div>

          <Link
            href={`/dashboard/penilaian-positif?location=${selectedDestination}`}
          >
            <Card className="rounded-lg border-none mt-6 hover:bg-gray-100">
              <CardHeader>
                <CardTitle className="flex flex-auto text-sm gap-1">
                  <h1 className="mt-[-2px]">Penilaian Positif</h1>
                  <HoverCard>
                    <HoverCardTrigger className="cursor-pointer">
                      <FaRegQuestionCircle />
                    </HoverCardTrigger>
                    <HoverCardContent className="z-50 bg-white shadow-md rounded-md">
                      <p className="font-normal text-sm">
                        Penilaian Positif adalah jumlah keseluruhan penilaian
                        positif yang diterima.
                      </p>
                    </HoverCardContent>
                  </HoverCard>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {loading ? (
                  <Skeleton className="w-16 h-6" />
                ) : (
                  <h1 className="font-bold text-2xl">{datas.positive}</h1>
                )}
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Chart & Top Keyword */}
        <div className="grid gap-4 lg:grid-cols-6 md:grid-cols-1 sm:grid-cols-1 grid-rows-1 text-black py-4">
          <div className="col-span-4">
            <Card className="w-full h-full">
              <CardHeader>
                <CardTitle className="flex flex-auto gap-1">
                  Jumlah Ulasan
                  <HoverCard>
                    <HoverCardTrigger className="cursor-pointer">
                      <FaRegQuestionCircle />
                    </HoverCardTrigger>
                    <HoverCardContent className="z-50 bg-white shadow-md rounded-md">
                      <p className="text-justify font-normal text-sm">
                        Trend rating unit dari waktu ke waktu.
                      </p>
                    </HoverCardContent>
                  </HoverCard>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* <div className=""> */}
                <div className="h-full lg:w-[100%] md:w-[70%] sm:w-[40%]">
                  {loading ? (
                    <Skeleton className="w-full h-48" />
                  ) : (
                    <ChartDashboard data={datas.reviewsByDate} />
                  )}
                </div>
                {/* </div> */}
              </CardContent>
            </Card>
          </div>
          <div className="col-span-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex flex-auto gap-1">
                  Top Keyword
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-start text-base text-[#B0B2B2]">
                  10 kata yang sering muncul pada review
                </p>
                {loading ? (
                  <Skeleton className="w-full h-6" />
                ) : (
                  <TopKeywords data={datas.topKeywords} />
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Overview Status, Dampak, Sentimen, & Customer Feedback */}
        <div className="flex w-full">
          <div className="grid gap-4 lg:grid-cols-3 md:grid-cols-1 sm:grid-cols-1">
            <div className="flex w-full">
              <Card>
                <CardHeader>
                  <CardTitle className="flex flex-auto gap-1">
                    Overview Status
                    <HoverCard>
                      <HoverCardTrigger className="cursor-pointer">
                        <FaRegQuestionCircle />
                      </HoverCardTrigger>
                      <HoverCardContent className="z-50 bg-white shadow-md rounded-md">
                        <p className="text-justify font-normal text-sm">
                          Distribusi review dari masing - masing OTA.
                        </p>
                      </HoverCardContent>
                    </HoverCard>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <Skeleton className="w-full h-6" />
                  ) : (
                    <OverviewStatus
                      google={datas.google}
                      tripadvisor={datas.tripadvisor}
                      traveloka={datas.traveloka}
                      tiket={datas.tiket}
                    />
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="flex w-full flex-grow flex-col gap-2">
              <Link href={`/dashboard/dampak?location=${selectedDestination}`}>
                <Card className="hover:border-neutral-600">
                  <CardHeader>
                    <CardTitle className="flex flex-auto gap-1">
                      Impact
                      <HoverCard>
                        <HoverCardTrigger className="cursor-pointer">
                          <FaRegQuestionCircle />
                        </HoverCardTrigger>
                        <HoverCardContent className="z-50 bg-white shadow-md rounded-md">
                          <p className="text-justify font-normal text-sm">
                            Nilai Dampak didapatkan dari perhitungan sentimen
                            masing - masing review yang dapat bernilai positif
                            dan negatif.
                          </p>
                        </HoverCardContent>
                      </HoverCard>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {loading ? (
                      <Skeleton className="w-full h-6" />
                    ) : (
                      <Impact
                        positive={datas.positive}
                        negative={datas.negative}
                      />
                    )}
                  </CardContent>
                </Card>
              </Link>

              <Card>
                <CardHeader>
                  <CardTitle className="flex flex-auto gap-1">
                    Sentiment Overview
                    <HoverCard>
                      <HoverCardTrigger className="cursor-pointer">
                        <FaRegQuestionCircle />
                      </HoverCardTrigger>
                      <HoverCardContent className="z-50 bg-white shadow-md rounded-md">
                        <p className="text-justify font-normal text-sm">
                          Statistik perbandingan sentimen review customer.
                        </p>
                      </HoverCardContent>
                    </HoverCard>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <Skeleton className="w-full h-6" />
                  ) : (
                    <SentimentOverview
                      total={datas.totalReviews}
                      positive={datas.positive}
                      negative={datas.negative}
                      netral={datas.netral}
                    />
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="flex w-full flex-grow">
              <Card>
                <CardHeader>
                  <CardTitle className="flex flex-auto gap-1">
                    Customer Feedback
                  </CardTitle>
                </CardHeader>
                <CardContent className="items-center">
                  {loading ? (
                    <Skeleton className="w-full h-6" />
                  ) : (
                    <CustomerFeedback
                      positiveFeedbacks={datas.positiveFeedback}
                      negativeFeedbacks={datas.negativeFeedback}
                      location={selectedDestination}
                    />
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </ContentLayout>
    </>
  );
}
