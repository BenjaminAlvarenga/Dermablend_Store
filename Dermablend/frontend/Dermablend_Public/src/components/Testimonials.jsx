import { Star } from "lucide-react";

const testimonials = [
  {
    text: "La base fluida transformó completamente mi rutina. Mi piel luce impecable sin sentir que llevo nada puesto.",
    author: "María R., San Salvador",
    stars: 5,
  },
  {
    text: "Finalmente encontré un tono que hace juego perfecto con mi piel. El servicio de asesoría de tonos es increíble.",
    author: "Sofía M., Guatemala",
    stars: 5,
  },
  {
    text: "El cleanser es suave pero profundamente efectivo. Mi dermatóloga me lo recomendó y no me ha fallado.",
    author: "Valentina C., Honduras",
    stars: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="bg-espresso py-16">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mb-10 text-center">
          <p className="font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-terracotta">
            Lo que dicen nuestras clientas
          </p>
          <h2 className="mt-2 font-display text-3xl font-light text-white sm:text-4xl">
            Reseñas <em className="italic text-terracotta">reales</em>
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.author}
              className="animate-rise rounded-xl border border-white/10 bg-white/5 p-6"
            >
              <div className="mb-3 flex gap-0.5 text-terracotta">
                {[...Array(t.stars)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5" strokeWidth={0} fill="currentColor" />
                ))}
              </div>
              <blockquote className="font-display text-base font-light italic leading-relaxed text-white/85">
                “{t.text}”
              </blockquote>
              <figcaption className="mt-4 font-body text-[11px] font-medium uppercase tracking-[0.15em] text-white/40">
                — {t.author}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
