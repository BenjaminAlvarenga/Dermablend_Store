import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const SalesBarChart = ({ data }) => {
  return (
    <div className="h-64 w-full overflow-x-auto rounded-2xl bg-white p-5 shadow-md">
      <div className="h-full min-w-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="#f0e6d8" />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 11, fill: "#8a6a4a" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tickFormatter={(value) => `${value}%`}
              tick={{ fontSize: 11, fill: "#8a6a4a" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              formatter={(value) => [`${value}%`, "Ventas"]}
              contentStyle={{ borderRadius: 8, borderColor: "#D3AB80" }}
            />
            <Bar dataKey="value" fill="#D3AB80" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesBarChart;
