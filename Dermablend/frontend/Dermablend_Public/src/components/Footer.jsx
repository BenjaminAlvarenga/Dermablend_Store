import { Leaf } from "lucide-react";

const cols = [
  { title: "Productos", links: ["Rostro", "Labios", "Ojos", "Cuerpo", "Sets"] },
  { title: "Ayuda", links: ["Encuentra tu tono", "Envíos", "Devoluciones", "Contacto"] },
  { title: "Marca", links: ["Nuestra historia", "Ingredientes", "Sustentabilidad", "Blog"] },
];

export default function Footer() {
  return (
    <footer className="bg-espresso px-5 pb-6 pt-12 text-white/60 sm:px-8">
      <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-[2fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2 font-display text-xl font-semibold text-white">
            <Leaf className="h-4 w-4 text-terracotta" strokeWidth={1.75} />
            Dermablend <span className="font-display italic font-light text-terracotta">Pro</span>
          </div>
          <p className="mt-3 max-w-xs font-body text-xs leading-relaxed text-white/50">
            Belleza profesional accesible para todas. Más de 30 años
            innovando en skincare y maquillaje de alta cobertura.
          </p>
        </div>

        {cols.map((col) => (
          <div key={col.title}>
            <h5 className="mb-4 font-body text-[10px] font-semibold uppercase tracking-[0.2em] text-white/90">
              {col.title}
            </h5>
            <ul className="flex flex-col gap-2">
              {col.links.map((link) => (
                <li key={link}>
                  <button
                    type="button"
                    className="font-body text-xs text-white/50 transition-colors hover:text-terracotta"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-10 flex max-w-6xl flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-body text-[11px] text-white/40">
          © 2026 Dermablend Pro. Todos los derechos reservados.
        </p>
        <div className="flex gap-5">
          {["Instagram", "TikTok", "Pinterest"].map((s) => (
            <button
              key={s}
              type="button"
              className="font-body text-[11px] uppercase tracking-wide text-white/40 transition-colors hover:text-terracotta"
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
}
