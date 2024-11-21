"use client";

import { AiOutlineBars } from "react-icons/ai";
import { useState, useEffect } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, LabelList } from "recharts";
import {
  ChartContainer,
  ChartTooltipContent,
  ChartTooltip,
} from "@/components/ui/chart";
import { type ChartConfig } from "@/components/ui/chart";

import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
} from "@/components/ui/card";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Tipe data yang diterima dari API
export interface VisitorData {
  id: number;
  nama_wisata: string;
  tanggal: string;
  pengunjung_di_dalam: number;
}

// Konfigurasi chart
const chartConfig = {
  visitors: {
    label: "Visitors",
    color: "#FE7123",
  },
} satisfies ChartConfig;

// Daftar bulan untuk dropdown
const months = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

export function ChartKeramaian() {
  const [chartData, setChartData] = useState<{ week: string; visitors: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null); // State bulan yang dipilih

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3000/api/get-visitors"); // Endpoint API
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const apiResponse = await response.json();
        if (!Array.isArray(apiResponse.data)) {
          throw new Error("Invalid data format from API");
        }

        // Mengelompokkan dan menjumlahkan data berdasarkan tanggal
        const groupedData = apiResponse.data.reduce((acc: Record<string, number>, item: VisitorData) => {
          const formattedDate = new Date(item.tanggal).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short", // Menggunakan bulan singkat (Jan, Feb, dll.)
          });

          const visitorsCount =
            typeof item.pengunjung_di_dalam === "number" ? item.pengunjung_di_dalam : 0;

          if (!acc[formattedDate]) {
            acc[formattedDate] = 0;
          }
          acc[formattedDate] += visitorsCount;
          return acc;
        }, {});

        const aggregatedData = Object.entries(groupedData).map(([week, visitors]) => ({
          week,
          visitors: visitors as number,
        }));

        setChartData(aggregatedData);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Filter data berdasarkan bulan yang dipilih
  const filteredData = selectedMonth
    ? chartData.filter((item) => {
        const month = new Date(item.week).toLocaleDateString("id-ID", { month: "long" });
        return month === selectedMonth;
      })
    : chartData;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="mb-4">
          <div className="flex justify-between items-center w-full">
            <div>Chart - Tingkat Keramaian</div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <AiOutlineBars className="h-5 w-5 cursor-pointer" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuGroup>
                  {months.map((month) => (
                    <DropdownMenuItem
                      key={month}
                      onClick={() => setSelectedMonth(month)}
                    >
                      {month}
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuItem onClick={() => setSelectedMonth(null)}>
                    Semua Bulan
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[400px] w-full">
          <BarChart
            accessibilityLayer
            data={filteredData}
            margin={{ top: 30 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="week"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="visitors" fill="var(--color-visitors, #FE7123)" radius={4}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}