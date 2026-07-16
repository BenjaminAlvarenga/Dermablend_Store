import { Sun, Heart, Umbrella, Eye, Gift, Sparkle } from "lucide-react";

const categories = [
  { id: "rostro", name: "Rostro", icon: Sun },
  { id: "labios", name: "Labios", icon: Heart },
  { id: "cuerpo", name: "Cuidado Solar", icon: Umbrella },
  { id: "ojos", name: "Ojos", icon: Eye },
  { id: "sets", name: "Sets", icon: Gift },
  { id: "accesorios", name: "Accesorios", icon: Sparkle },
];

export default function Categories({ onSelect }) {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <div className="mb-10 text-center">
        <p className="font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-taupe">
          Explora por categoría
        </p>
        <h2 className="mt-2 font-display text-3xl font-light text-espresso sm:text-4xl">
          Categorías <em className="italic text-taupe">Principales</em>
        </h2>
      </div>

      <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => onSelect(cat.id)}
              className="animate-rise flex flex-col items-center gap-3 rounded-lg border border-border-tan bg-cream px-3 py-6 text-center transition-colors hover:border-taupe hover:bg-white"
            >
              <Icon className="h-5 w-5 text-taupe" strokeWidth={1.5} />
              <span className="font-body text-[11px] font-medium uppercase tracking-[0.15em] text-espresso">
                {cat.name}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
