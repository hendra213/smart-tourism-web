"use client";

import Link from "next/link";
import * as React from "react";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { ChartRateTrendTiket } from "@/components/dashboard/rate-trend/tiket/chart-tiket";
import { ChartRateTrendTraveloka } from "@/components/dashboard/rate-trend/traveloka/chart-traveloka";
import { ChartRateTrendTripadvisor } from "@/components/dashboard/rate-trend/tripadvisor/chart-tripadvisor";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useState } from "react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Button } from "@/components/ui/button";
import { TbMapSearch } from "react-icons/tb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { addDays, format, subDays, subMonths } from "date-fns";
import { DateRange } from "react-day-picker";
import { ChartRateTrendGoogle } from "@/components/dashboard/rate-trend/google/chart-google";
export default function RateTrendPage() {
  const [activeTab, setActiveTab] = useState("google");
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate a loading delay
    const timeout = setTimeout(() => {
      setLoading(false); // Data is now loaded
    }, 2000);

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

  // Fetch data
  const [selectedDestination, setSelectedDestination] =
    useState<string>("Pilih Destinasi");

  const [datas, setDatas] = useState({
    reviewsByDate: [],
  });

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/rate-trend?tempat_wisata=${encodeURIComponent(
            selectedDestination
          )}&active_tab=${encodeURIComponent(activeTab)}`
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const res = await response.json();
        setDatas({
          reviewsByDate: res.data ? res.data : [],
        });
      } catch (error) {
        console.error("Fetching data failed:", error);
      }
    };

    fetchData();
  }, [selectedDestination, activeTab]);

  return (
    <ContentLayout title="Rate Trend">
      <div className="flex h-full flex-col gap-6 mt-4">
        <div className="flex justify-between items-center">
          <div className="w-1/2">
            <p className="font-base text-muted-foreground">
              Rate Trend adalah jumlah ulasan dari setiap destinasi di setiap
              OTA
            </p>
          </div>

          {/* Pilih Destinasi Dropdown */}
          <div>
            <DropdownMenu onOpenChange={(open) => setIsDropdownOpen(open)}>
              <DropdownMenuTrigger asChild className="text-black">
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
              <DropdownMenuContent className="w-full flex flex-col items-center text-center">
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
                  onClick={() => setSelectedDestination("Borobudur")}
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

        {/* Button OTA & All */}
        <div className="h-14 items-center gap-2 rounded-md border-2 text-muted-foreground flex w-full justify-start">
          {/* Performa OTA */}
          <div className="justify-center">
            <Tabs
              defaultValue="google"
              className=""
              onValueChange={(value) => setActiveTab(value)}
            >
              <TabsList className="w-full rounded-lg bg-white gap-2">
                <TabsTrigger
                  value="google"
                  className="w-1/2 text-center py-2 data-[state=active]:bg-[#4D4DC8] data-[state=active]:text-white hover:bg-[#4D4DC8] hover:text-white"
                >
                  {loading ? (
                    <Skeleton className="mr-2 h-4 w-4 bg-white" />
                  ) : (
                    <Image
                      src="/google-icon.png"
                      alt="google maps"
                      width={20}
                      height={20}
                      className="mr-2"
                    />
                  )}
                  {loading ? (
                    <Skeleton className="w-24 h-4 bg-white" />
                  ) : (
                    "Google Maps"
                  )}
                </TabsTrigger>
                <TabsTrigger
                  value="traveloka"
                  className="w-1/2 text-center py-2 data-[state=active]:bg-[#4D4DC8] data-[state=active]:text-white hover:bg-[#4D4DC8] hover:text-white"
                >
                  {loading ? (
                    <Skeleton className="mr-2 h-4 w-4 bg-white" />
                  ) : (
                    <Image
                      src="/traveloka-icon.png"
                      alt="traveloka"
                      width={20}
                      height={20}
                      className="mr-2"
                    />
                  )}
                  {loading ? (
                    <Skeleton className="w-24 h-4 bg-white" />
                  ) : (
                    "Traveloka"
                  )}
                </TabsTrigger>
                <TabsTrigger
                  value="tripadvisor"
                  className="w-1/2 text-center py-2 data-[state=active]:bg-[#4D4DC8] data-[state=active]:text-white hover:bg-[#4D4DC8] hover:text-white"
                >
                  {loading ? (
                    <Skeleton className="mr-2 h-4 w-4" />
                  ) : (
                    <Image
                      src="/tripadvisor-icon.png"
                      alt="tripadvisor"
                      width={80}
                      height={80}
                      className="mr-2"
                    />
                  )}
                  {loading ? <Skeleton className="w-24 h-4" /> : "Tripadvisor"}
                </TabsTrigger>
                <TabsTrigger
                  value="tiket"
                  className="w-1/2 text-center py-2 data-[state=active]:bg-[#4D4DC8] data-[state=active]:text-white hover:bg-[#4D4DC8] hover:text-white"
                >
                  {loading ? (
                    <Skeleton className="mr-2 h-4 w-4" />
                  ) : (
                    <Image
                      src="/tiket-icon.png"
                      alt="ticket.com"
                      width={20}
                      height={20}
                      className="mr-2"
                    />
                  )}
                  {loading ? <Skeleton className="w-24 h-4" /> : "Tiket"}
                </TabsTrigger>
              </TabsList>
              <TabsContent value="google"></TabsContent>
              <TabsContent value="traveloka"></TabsContent>
              <TabsContent value="tripadvisor"></TabsContent>
              <TabsContent value="tiket"></TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Charts nanti berubah sesuai dengan tabs */}
        <div className="flex h-full w-full justify-center rounded-lg border-2">
          <div className="w-[100%]">
            {activeTab === "google" && (
              <div className="mt-8 mr-4">
                {/* Charts Google */}
                {loading ? (
                  <Skeleton className="w-full" />
                ) : (
                  <ScrollArea>
                    <ChartRateTrendGoogle data={datas.reviewsByDate} />
                  </ScrollArea>
                )}
              </div>
            )}
            {activeTab === "traveloka" && (
              <div className="mt-8 mr-4">
                {/* Charts Traveloka */}
                {loading ? (
                  <Skeleton className="w-full" />
                ) : (
                  <ScrollArea>
                    <ChartRateTrendTraveloka data={datas.reviewsByDate} />
                  </ScrollArea>
                )}
              </div>
            )}
            {activeTab === "tripadvisor" && (
              <div className="mt-8 mr-4">
                {/* Charts Tripadvisor */}
                {loading ? (
                  <Skeleton className="w-full" />
                ) : (
                  <ScrollArea>
                    <ChartRateTrendTripadvisor data={datas.reviewsByDate} />
                  </ScrollArea>
                )}
              </div>
            )}
            {activeTab === "tiket" && (
              <div className="mt-8 mr-4">
                {/* Charts Tiket */}
                {loading ? (
                  <Skeleton className="w-full" />
                ) : (
                  <ScrollArea>
                    <ChartRateTrendTiket data={datas.reviewsByDate} />
                  </ScrollArea>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </ContentLayout>
  );
}
