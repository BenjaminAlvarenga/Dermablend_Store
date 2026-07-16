import { useEffect, useRef, useState } from "react";

/**
 * useCountUp
 * Anima un número entero de 0 hasta `target` cuando el elemento referenciado
 * entra en el viewport. Encapsula IntersectionObserver + requestAnimationFrame
 * para que los componentes de presentación no necesiten conocer los detalles.
 */
export function useCountUp(target, { duration = 1200 } = {}) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();

          function tick(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
          }

          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [target, duration]);

  return { ref, value };
}
