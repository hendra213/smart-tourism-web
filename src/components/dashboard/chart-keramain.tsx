"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { ChartContainer, ChartTooltipContent, ChartTooltip } from "@/components/ui/chart";
import { type ChartConfig } from "@/components/ui/chart";

const chartData = [
    { week: "Sun 01 - Sun 07", desktop: 186 },
    { week: "Sun 08 - Sun 14", desktop: 305 },
    { week: "Sun 15 - Sun 21", desktop: 237 },
    { week: "Sun 22 - Sun 28", desktop: 73 },
    { week: "Sun 29 - Sun 05", desktop: 209 },
    { week: "Sun 06 - Sun 12", desktop: 214 },
];

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "#2563eb",
    },
} satisfies ChartConfig;

export function Chart() {
    return (
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="week"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value} // No need to slice for weeks
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
            </BarChart>
        </ChartContainer>
    );
}