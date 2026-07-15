import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from "recharts";

const NationalSalesDonut = ({ percentage = 0, label = "Ventas nacionales" }) => {
  const data = [{ value: percentage, fill: "#3a1e08" }];

  return (
    <div className="relative aspect-square w-full max-w-64 rounded-2xl bg-white p-5 shadow-md">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="75%"
          outerRadius="100%"
          barSize={14}
          startAngle={90}
          endAngle={-270}
          data={data}
        >
          <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
          <RadialBar background={{ fill: "#f3e6d6" }} dataKey="value" cornerRadius={20} />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-[#3a1e08]">{percentage}%</span>
        <span className="text-xs text-[#8a6a4a]">{label}</span>
      </div>
    </div>
  );
};

export default NationalSalesDonut;
