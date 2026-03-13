import { ChartContainer } from "@/components/ui/chart";
import { Bar, BarChart, Legend, Tooltip, XAxis, YAxis } from "recharts";

type PieData = {
  name: string;
  value: number;
  color: string;
};

const data: PieData[] = [
  { name: "Cappucino", value: 5, color: "#8ec0c0" },
  { name: "Café com leite", value: 4.5, color: "#a4cfa8" },
  { name: "Café Express", value: 3, color: "#cec28f" },
];

const chartConfig = {
  value: {
    label: "Usuários",
    color: "hsl(var(--chart-1))",
  },
};

export function RatingsChart() {
  return (
    <ChartContainer className="h-full w-[120%] pt-10 " config={chartConfig}>
      <BarChart
        style={{
          aspectRatio: 1.618,
        }}
        width={400}
        height={300}
        responsive
        data={data}
      >
        <XAxis dataKey="name" />
        <YAxis domain={[0, 5]} ticks={[0, 1, 2, 3, 4, 5]} />
        <Bar
          dataKey="value"
          name={"Média de avaliação"}
          fill={"#aecfb1"}
          radius={[10, 10, 0, 0]}
        />

        <Legend
          verticalAlign="middle"
          align="right"
          layout="vertical"
          wrapperStyle={{
            lineHeight: "36px",
          }}
        />
        <Tooltip />
        {/* <RechartsDevtools /> */}
      </BarChart>
    </ChartContainer>
  );
}
