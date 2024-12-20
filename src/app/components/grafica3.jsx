"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
    { browser: "Tú curso", visitors: 35, fill: "var(--color-chrome, #4285f4)" },
    { browser: "2-B", visitors: 9, fill: "var(--color-safari, #ff9500)" },
    { browser: "2-C", visitors: 29, fill: "var(--color-firefox, #ff7139)" },
    { browser: "2-D", visitors: 17, fill: "var(--color-edge, #9e9e9e)" },
  ];
  

const chartConfig = {
  visitors: {
    label: "Retos Realizados:  ",
  },
  "Tú curso": {
    label: "Tú curso",
    color: "hsl(var(--chart-1))",
  },
  "2-B": {
    label: "2-B",
    color: "hsl(var(--chart-2))",
  },
  "2-C": {
    label: "2-C",
    color: "hsl(var(--chart-3))",
  },
  "2-D": {
    label: "2-D",
    color: "hsl(var(--chart-4))",
  },
  "2-E": {
    label: "2-E",
    color: "hsl(var(--chart-5))",
  },
};

export function Grafica3() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tú curso VS Los demás</CardTitle>
        <CardDescription>2A - 2D 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="browser"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => chartConfig[value]?.label || value}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="visitors"
              strokeWidth={2}
              radius={8}
              activeIndex={2}
              activeBar={(props) => {
                return (
                  <Rectangle
                    {...props}
                    fillOpacity={0.8}
                    stroke={props.payload.fill}
                    strokeDasharray={4}
                    strokeDashoffset={4}
                  />
                );
              }}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          😛¡Tú curso esta liderando en el top!😎 <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
