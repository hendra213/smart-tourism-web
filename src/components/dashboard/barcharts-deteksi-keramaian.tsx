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

interface ChartKeramaianProps {
  selectedDestination: string | null; // Destinasi yang dipilih
}

export function ChartKeramaian({ selectedDestination }: ChartKeramaianProps) {
  const [chartData, setChartData] = useState<
    { week: string; visitors: number; nama_wisata: string }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3000/api/get-visitors");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const apiResponse = await response.json();
        if (!Array.isArray(apiResponse.data)) {
          throw new Error("Invalid data format from API");
        }

        // Mengelompokkan data berdasarkan tanggal dan destinasi
        const groupedData = apiResponse.data.reduce(
          (
            acc: Record<string, { week: string; visitors: number; nama_wisata: string }>,
            item: VisitorData
          ) => {
            const formattedDate = new Date(item.tanggal).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "short", // Contoh: '1 Jan'
            });

            const key = `${formattedDate}_${item.nama_wisata}`;
            if (!acc[key]) {
              acc[key] = {
                week: formattedDate,
                visitors: 0,
                nama_wisata: item.nama_wisata,
              };
            }
            acc[key].visitors += item.pengunjung_di_dalam || 0;
            return acc;
          },
          {}
        );

        setChartData(Object.values(groupedData));
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Filter data berdasarkan bulan dan destinasi
  const filteredData = chartData.filter((item) => {
    const month = new Date(item.week).toLocaleDateString("id-ID", { month: "long" });
    const matchMonth = selectedMonth ? month === selectedMonth : true;
    const matchDestination = selectedDestination
      ? item.nama_wisata === selectedDestination
      : true;

    return matchMonth && matchDestination;
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-col items-center space-y-4">
          <div className="flex justify-between items-center w-full">
            <div>Chart - Tingkat Keramaian</div>

             {/* Destinasi yang dipilih */}
        {selectedDestination && (
          <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
            {selectedDestination}
          </span>
        )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <AiOutlineBars className="h-5 w-5 cursor-pointer" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 z-50">
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