"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

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
  { month: "July", desktop: 0 },
  { month: "August", desktop: 0 },
  { month: "September", desktop: 0 },
  { month: "October", desktop: 0 },
  { month: "November", desktop: 1 },
  { month: "December ", desktop: 3 },
];

const chartConfig = {
  desktop: {
    label: "Retos Realizados:  ",
    color: "hsl(var(--chart-1))",
  },
};

export function Grafica1() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tú Progreso</CardTitle>
        <CardDescription>July - December  2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8}>
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
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          ¡Has mejorado en este ultimo mes! <TrendingUp className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  );
}
