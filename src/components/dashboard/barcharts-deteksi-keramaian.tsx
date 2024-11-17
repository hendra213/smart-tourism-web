"use client";

import { Bar, BarChart, CartesianGrid, XAxis, LabelList } from "recharts";
import {
  ChartContainer,
  ChartTooltipContent,
  ChartTooltip,
} from "@/components/ui/chart";
import { type ChartConfig } from "@/components/ui/chart";
import { TrendingUp } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
  CardHeader,
} from "@/components/ui/card";

const rawData = [
  { week: "Sunday", desktop: 186 },
  { week: "Monday", desktop: 305 },
  { week: "Tuesday", desktop: 237 },
  { week: "Thursday", desktop: 73 },
  { week: "Friday", desktop: 209 },
  { week: "Saturday", desktop: 214 },
  { week: "Sunday", desktop: 100 },
  { week: "Monday", desktop: 80 },
  { week: "Thursday", desktop: 50 },
  { week: "Friday", desktop: 40 },
];

// Agregasi data untuk mendapatkan total per hari
const aggregatedData = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Thursday",
  "Friday",
  "Saturday",
].map((day) => {
  return {
    week: day,
    desktop: rawData
      .filter((item) => item.week === day)
      .reduce((acc, item) => acc + item.desktop, 0),
  };
});

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#FE7123",
  },
} satisfies ChartConfig;

export function ChartKeramaian() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="mb-4">
          <div className="flex justify-between items-center w-full">
            <div>Chart - Tingkat Keramain</div>
            <div className="p-1 rounded-full hover:bg-gray-200 cursor-pointer" onClick={() => console.log("Icon clicked!")}>
    <img
      src="/icon.png"
      alt="Icon"
      className="h-[12px] w-[12px]"
    />
  </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[400px] w-full">
          <BarChart
            accessibilityLayer
            data={aggregatedData}
            margin={{ top: 20 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="week"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value} // No need to slice for weeks
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4}>
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
