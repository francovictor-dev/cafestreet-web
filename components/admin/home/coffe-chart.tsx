import {
  Cell,
  Label,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

type PieData = {
  name: string;
  value: number;
  color: string;
};

const data: PieData[] = [
  { name: "Cappucino", value: 100, color: "#8ec0c0" },
  { name: "Café com leite", value: 300, color: "#a4cfa8" },
  { name: "Café Express", value: 200, color: "#cec28f" },
];

const chartConfig = {
  value: {
    label: "Usuários",
    color: "hsl(var(--chart-1))",
  },
};

export function CoffeChart() {
  return (
    <ResponsiveContainer
      className="h-[300] w-full max-sm:min-h-[300]"
      width={"100%"}
      height={"100%"}
    >
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          outerRadius={"80%"}
          innerRadius="40%"
          cx="50%"
          cy="50%"
          paddingAngle={2}
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={entry.color} />
          ))}
          <Label
            value="Total: 600"
            position="center"
            className="body-xl-bold "
          />
        </Pie>
        <Tooltip />
        <Legend
          verticalAlign="middle"
          align="right"
          layout="vertical"
          wrapperStyle={{
            lineHeight: "36px", // aumenta espaço entre itens
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
