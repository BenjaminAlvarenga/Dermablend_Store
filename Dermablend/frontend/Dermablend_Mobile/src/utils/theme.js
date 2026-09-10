// Identidad visual de Dermablend: paleta inspirada en maquillaje premium
// (nude, rosa empolvado, café suave) aplicada de forma consistente en toda
// la aplicación. Cambiar un valor aquí re-skinea la app completa.
export const COLORS = {
  background: "#FFFFFF",
  surface: "#FBF5F3", // fondo de secciones suaves (ej. franjas, headers)
  card: "#FFF9F7",
  cardBorder: "#EFDEDA",

  ink: "#2B1B17", // texto principal (espresso profundo, no negro puro)
  inkMuted: "#8C766E", // texto secundario
  inkFaint: "#B7A69F", // placeholders, texto terciario

  accent: "#B8727E", // rosa empolvado — color de marca
  accentDark: "#96525C", // estados presionados, enlaces
  accentSoft: "#F3E0DE", // fondos suaves de acento
  blob: "#D9AFAE",
  gold: "#CDB07A", // detalle premium sutil (splash, valoraciones)

  buttonBg: "#F5E1DE",
  buttonBgPressed: "#EAD0CC",

  borderFocus: "#B8727E",

  errorBg: "#FBEAEA",
  errorBorder: "#F0C1BE",
  errorText: "#AE3B3B",

  successBg: "#EFF5EC",
  successBorder: "#C4D9BC",
  successText: "#4F7442",

  overlay: "rgba(43, 27, 23, 0.5)",
};

// Escala de espaciado consistente para paddings/márgenes/gaps.
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 28,
  xxxl: 36,
};

// Radios de borde consistentes (cards, inputs, botones).
export const RADIUS = {
  sm: 10,
  md: 14,
  lg: 18,
  xl: 22,
  pill: 999,
};

// Escala tipográfica.
export const FONT_SIZE = {
  xs: 11,
  sm: 12,
  base: 13,
  md: 14,
  lg: 15,
  title: 18,
  heading: 22,
  display: 28,
};

// Sombra estándar para cards y elementos elevados.
export const SHADOW = {
  shadowColor: "#2B1B17",
  shadowOffset: { width: 0, height: 6 },
  shadowOpacity: 0.06,
  shadowRadius: 14,
  elevation: 3,
};
