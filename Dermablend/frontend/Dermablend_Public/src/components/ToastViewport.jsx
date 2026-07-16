import { CheckCircle2, XCircle, Info, X } from "lucide-react";
import { useToast } from "../context/ToastContext";

const iconMap = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
};

const toneMap = {
  success: "border-sage/40 bg-sage-ink text-white",
  error: "border-error/40 bg-espresso text-white",
  info: "border-border-tan bg-espresso text-white",
};

export default function ToastViewport() {
  const { toasts, dismiss } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-4 z-[100] flex flex-col items-center gap-2 px-4 sm:top-6"
      role="region"
      aria-label="Notificaciones"
    >
      {toasts.map((t) => {
        const Icon = iconMap[t.type] ?? Info;
        return (
          <div
            key={t.id}
            role="status"
            className={`animate-toast-in pointer-events-auto flex w-full max-w-sm items-center gap-3 rounded-xl border px-4 py-3 shadow-lg backdrop-blur-sm ${toneMap[t.type] ?? toneMap.info}`}
          >
            <Icon className="h-5 w-5 shrink-0" strokeWidth={1.75} />
            <p className="flex-1 font-body text-sm leading-snug">{t.message}</p>
            <button
              onClick={() => dismiss(t.id)}
              aria-label="Cerrar notificación"
              className="shrink-0 rounded-full p-0.5 text-white/70 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
