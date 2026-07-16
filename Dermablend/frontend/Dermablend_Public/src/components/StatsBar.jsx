import { useCountUp } from "../hooks/useCountUp";

const stats = [
  { target: 30, suffix: "+", label: "Años de experiencia" },
  { target: 50, suffix: "", label: "Tonos disponibles" },
  { target: 98, suffix: "%", label: "Satisfacción cliente" },
  { target: 0, suffix: "", label: "Testado en animales" },
];

function StatItem({ target, suffix, label }) {
  const { ref, value } = useCountUp(target);

  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-3xl font-light text-white">
        {value}
        {suffix}
      </div>
      <div className="mt-1 font-body text-[10px] font-medium uppercase tracking-[0.18em] text-white/50">
        {label}
      </div>
    </div>
  );
}

export default function StatsBar() {
  return (
    <div className="bg-espresso">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-5 py-8 sm:grid-cols-4 sm:px-8">
        {stats.map((s) => (
          <StatItem key={s.label} {...s} />
        ))}
      </div>
    </div>
  );
}
