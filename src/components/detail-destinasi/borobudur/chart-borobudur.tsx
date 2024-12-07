"use client";

import { TrendingUp } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  YAxis,
  XAxis,
  Tooltip,
} from "recharts";
import { format, subDays } from "date-fns";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const generateChartData = (numDays: number) => {
  const chartData = [];
  const today = new Date();
  for (let i = 0; i < numDays; i++) {
    const date = subDays(today, i);
    chartData.push({
      date: format(date, "dd MMM yyyy"),
      days: Math.floor(Math.random() * 10), // for random data
    });
  }
  return chartData.slice(0, 10).reverse();
};

const chartConfig = {
  days: {
    label: "Jumlah Ulasan",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function ChartBorobudur() {
  const chartData = generateChartData(30); // Generate data for the last 30 days, but display only 10 entries

  return (
    <ChartContainer config={chartConfig}>
      <LineChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12,
          bottom: 30,
        }}
      >
        <CartesianGrid />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />

        <YAxis
          domain={[0, 10]}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <Tooltip
          cursor={false}
          content={({ payload }) => {
            if (payload && payload.length > 0) {
              const { date, days } = payload[0].payload;
              return (
                <div className="tooltip-content text-black bg-white p-2 rounded-lg">
                  <p>{`${date}`}</p>
                  <p>{`Jumlah Ulasan: ${days}`}</p>
                </div>
              );
            }
            return null;
          }}
        />
        <Line
          dataKey="days"
          type="monotone"
          stroke="rgb(255, 130, 37, 100)"
          strokeWidth={2}
          dot={{
            fill: "rgb(255, 130, 37, 100)",
          }}
          activeDot={{
            r: 6,
          }}
        />
      </LineChart>
    </ChartContainer>
  );
}
