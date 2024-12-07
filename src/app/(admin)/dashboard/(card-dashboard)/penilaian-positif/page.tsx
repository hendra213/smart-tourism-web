"use client";

import Link from "next/link";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartTraveloka } from "@/components/dashboard/card-dashboard/penilaian-keseluruhan/charts/chart-traveloka";
import { ChartTiket } from "@/components/dashboard/card-dashboard/penilaian-keseluruhan/charts/chart-tiket";
import { ChartTripadvisor } from "@/components/dashboard/card-dashboard/penilaian-keseluruhan/charts/chart-tripadvisor";
import { ChartGoogle } from "@/components/dashboard/card-dashboard/penilaian-keseluruhan/charts/chart-google";

import Image from "next/image";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function DashboardPenilaianKeseruluhan() {
  const [activeTab, setActiveTab] = useState("google");
  const searchParams = useSearchParams();
  let tempatWisata = searchParams.get("location") || "";

  // Fetch data
  const [datas, setDatas] = useState({
    reviewsByDate: [],
  });

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/dashboard/penilaian-positif?tempat_wisata=${encodeURIComponent(
            tempatWisata
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
  }, [tempatWisata, activeTab]);

  return (
    <ContentLayout title="Dashboard">
      {/* Breadcumbs */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Penilaian Positif</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex h-full flex-col gap-6 mt-8">
        <h2 className="text-2xl font-bold text-black">Penilaian Positif</h2>
        <p className="font-base text-muted-foreground">
          Penilaian positif adalah jumlah keseluruhan ulasan positif yang
          diterima.
        </p>

        {/* Button OTA & All */}
        <div className="h-14 items-center gap-2 rounded-md border-2 text-muted-foreground flex w-full justify-start">
          {/* Penilaian Keseruluhan OTA */}
          <div className="justify-center">
            <Tabs
              defaultValue="google"
              className=""
              onValueChange={(value) => setActiveTab(value)}
            >
              <TabsList className="w-full rounded-lg bg-white gap-2">
                <TabsTrigger
                  value="google"
                  className="w-1/2 text-center data-[state=active]:bg-[#4D4DC8] data-[state=active]:text-white hover:bg-[#4D4DC8] hover:text-white py-2"
                >
                  <Image
                    src="/google-icon.png"
                    alt="google"
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                  Google Maps
                </TabsTrigger>
                <TabsTrigger
                  value="traveloka"
                  className="w-1/2 text-center py-2 data-[state=active]:bg-[#4D4DC8] data-[state=active]:text-white hover:bg-[#4D4DC8] hover:text-white"
                >
                  <Image
                    src="/traveloka-icon.png"
                    alt="traveloka"
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                  Traveloka
                </TabsTrigger>
                <TabsTrigger
                  value="tripadvisor"
                  className="w-1/2 text-center py-2 data-[state=active]:bg-[#4D4DC8] data-[state=active]:text-white hover:bg-[#4D4DC8] hover:text-white"
                >
                  <Image
                    src="/tripadvisor-icon.png"
                    alt="tripadvisor"
                    width={40}
                    height={40}
                    className="mr-2"
                  />
                  Tripadvisor
                </TabsTrigger>
                <TabsTrigger
                  value="tiket"
                  className="w-1/2 text-center py-2 data-[state=active]:bg-[#4D4DC8] data-[state=active]:text-white hover:bg-[#4D4DC8] hover:text-white"
                >
                  <Image
                    src="/tiket-icon.png"
                    alt="ticket.com"
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                  Tiket
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
          <div className="w-[80%]">
            {activeTab === "google" && (
              <div>
                {/* Charts All */}
                <ChartGoogle data={datas.reviewsByDate} />
              </div>
            )}
            {activeTab === "traveloka" && (
              <div className="mt-8">
                {/* Charts Traveloka */}
                <ChartTraveloka data={datas.reviewsByDate} />
              </div>
            )}
            {activeTab === "tripadvisor" && (
              <div className="mt-8">
                {/* Charts Tripadvisor */}
                <ChartTripadvisor data={datas.reviewsByDate} />
              </div>
            )}
            {activeTab === "tiket" && (
              <div className="mt-8">
                {/* Charts Tiket */}
                <ChartTiket data={datas.reviewsByDate} />
              </div>
            )}
          </div>
        </div>
      </div>
    </ContentLayout>
  );
}
