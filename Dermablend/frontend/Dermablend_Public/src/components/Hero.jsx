import { useState } from "react";
import { Sparkles } from "lucide-react";

const HERO_IMAGE = "/images/modelo.jpg";

export default function Hero({ onFindTone }) {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = !imageFailed;
  return (
    <section className="mx-auto max-w-6xl px-5 pt-10 sm:px-8 sm:pt-14">
      <div className="grid items-center gap-10 rounded-3xl border border-border-tan bg-cream px-6 py-12 sm:px-10 sm:py-16 lg:grid-cols-2 lg:gap-14">
        <div className="animate-rise">
          <p className="inline-flex items-center gap-1.5 font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-taupe">
            <Sparkles className="h-3.5 w-3.5" strokeWidth={2} />
            Skincare profesional
          </p>

          <h1 className="mt-4 font-display text-4xl font-light leading-[1.08] text-espresso sm:text-5xl">
            Belleza que <em className="italic text-taupe">cuida</em>
            <br />
            tu piel.
          </h1>

          <p className="mt-5 max-w-md font-body text-sm leading-relaxed text-muted">
            Formulaciones de grado profesional que unifican, protegen y
            transforman tu piel con resultados visibles desde la primera
            aplicación.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#catalogo"
              className="rounded-full bg-espresso px-7 py-3 font-body text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:bg-taupe"
            >
              Comprar ahora
            </a>
            <button
              onClick={onFindTone}
              className="rounded-full border border-espresso px-7 py-3 font-body text-xs font-semibold uppercase tracking-wide text-espresso transition-colors hover:bg-espresso hover:text-white"
            >
              Mi tono ideal
            </button>
          </div>
        </div>

        <div className="animate-rise relative">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-border-tan to-terracotta/60">
            {showImage && (
              <img
                src={HERO_IMAGE}
                alt="Modelo usando productos Dermablend Pro"
                loading="eager"
                onError={() => setImageFailed(true)}
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}
            {!showImage && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-8 text-center">
                <div className="h-28 w-20 rounded-[50%_50%_45%_45%] bg-taupe/25" />
                <p className="font-display text-sm italic text-taupe">
                  Coloca aquí la imagen de tu modelo
                </p>
              </div>
            )}
          </div>
          <div className="absolute bottom-5 right-5 rounded-xl border-l-2 border-terracotta bg-white px-5 py-3 shadow-sm">
            <p className="font-body text-[11px] uppercase tracking-wide text-muted">
              Cobertura certificada
            </p>
            <p className="font-display text-2xl font-light text-espresso">98%</p>
          </div>
        </div>
      </div>
    </section>
  );
}
