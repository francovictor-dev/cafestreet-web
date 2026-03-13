import { ChartContainer } from "@/components/ui/chart";
import { Area, AreaChart, Tooltip, XAxis, YAxis } from "recharts";

type PieData = {
  name: string;
  value: number;
  color: string;
};

const data: PieData[] = [
  { name: "out", value: 350, color: "#8ec0c0" },
  { name: "nov", value: 500, color: "#a4cfa8" },
  { name: "dez", value: 400, color: "#cec28f" },
  { name: "jan", value: 520, color: "#cec28f" },
  { name: "fev", value: 400, color: "#cec28f" },
];

const chartConfig = {
  value: {
    label: "Usuários",
    color: "hsl(var(--chart-1))",
  },
};

export function LatestEarningsChart() {
  return (
    <ChartContainer className="h-full w-full pt-10 " config={chartConfig}>
      <AreaChart
        style={{
          aspectRatio: 1.618,
        }}
        responsive
        data={data}
        margin={{
          top: 20,
          right: 0,
          left: 0,
          bottom: 0,
        }}
        onContextMenu={(_, e) => e.preventDefault()}
      >
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis dataKey="name" />
        <YAxis width="auto" />
        <Tooltip />
        <Area type="monotone" dataKey="value" stroke="#dfce82" fill="#cec28f" />
      </AreaChart>
    </ChartContainer>
  );
}
