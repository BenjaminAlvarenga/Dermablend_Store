import { Sparkles, FlaskConical, Leaf, Stars } from "lucide-react";

const pillars = [
  {
    icon: Sparkles,
    title: "Cuidado Integral",
    text: "Formulaciones que nutren y protegen mientras embellecen. Skincare y maquillaje en perfecta armonía.",
  },
  {
    icon: FlaskConical,
    title: "Innovación Científica",
    text: "Décadas de investigación dermatológica respaldan cada fórmula que ponemos en tus manos.",
  },
  {
    icon: Leaf,
    title: "Ingredientes Puros",
    text: "Sin parabenos, sin crueldad animal. Belleza consciente con el medio ambiente y tu bienestar.",
  },
  {
    icon: Stars,
    title: "Para Toda Piel",
    text: "50 tonos que celebran la diversidad. Tu piel, tu identidad, nuestra misión de hacerla brillar.",
  },
];

export default function Philosophy() {
  return (
    <section className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:items-center lg:gap-16">
      <div className="animate-rise">
        <p className="font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-taupe">
          Nuestra esencia
        </p>
        <h2 className="mt-2 font-display text-3xl font-light leading-tight text-espresso sm:text-4xl">
          Filosofía <em className="italic text-taupe">Dermablend</em>
        </h2>
        <p className="mt-5 max-w-md font-body text-sm leading-relaxed text-muted">
          Cada producto nace de la unión entre ciencia avanzada y el respeto
          profundo por la piel. Creemos que el maquillaje ideal no solo
          cubre, sino que cuida, protege y potencia la belleza natural de
          cada persona.
        </p>
        <a
          href="#catalogo"
          className="mt-7 inline-block rounded-full bg-espresso px-7 py-3 font-body text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:bg-taupe"
        >
          Conoce nuestra historia
        </a>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {pillars.map((p) => {
          const Icon = p.icon;
          return (
            <div
              key={p.title}
              className="animate-rise rounded-xl border border-border-tan border-l-2 border-l-taupe bg-cream p-5"
            >
              <Icon className="h-4 w-4 text-taupe" strokeWidth={1.75} />
              <h3 className="mt-3 font-display text-lg font-medium text-espresso">
                {p.title}
              </h3>
              <p className="mt-1.5 font-body text-xs leading-relaxed text-muted">
                {p.text}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
