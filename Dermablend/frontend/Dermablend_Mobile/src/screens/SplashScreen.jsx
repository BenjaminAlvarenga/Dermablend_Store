import { useEffect, useRef, useState } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS, FONT_SIZE, SPACING } from "../utils/theme";

// El splash permanece el tiempo suficiente para sentirse intencional
// (identidad de marca, verificación de sesión, preparación de datos), pero
// nunca más allá de MAX_DISPLAY_MS aunque algo tarde en resolver: así nunca
// se queda atrapado en la pantalla de carga.
const MIN_DISPLAY_MS = 2600;
const MAX_DISPLAY_MS = 4000;
const EXIT_DURATION_MS = 420;

const STATUS_STAGES = [
  { at: 0, label: "Preparando tu experiencia Dermablend" },
  { at: 1100, label: "Verificando tu sesión" },
  { at: 2000, label: "Cargando tu tienda de belleza" },
];

/**
 * Splash screen de marca: se muestra mientras AuthContext verifica si existe
 * una sesión guardada (prop `ready`) y mientras se precarga el catálogo de
 * productos en segundo plano. `ready` siempre termina resolviéndose (ver
 * AuthContext.initializeSession), y MAX_DISPLAY_MS actúa como red de
 * seguridad adicional para garantizar que la app nunca quede atrapada aquí.
 *
 * @param {{ ready: boolean, onFinish: () => void }} props
 */
export default function SplashScreen({ ready, onFinish }) {
  const logoScale = useRef(new Animated.Value(0.8)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const wordmarkOpacity = useRef(new Animated.Value(0)).current;
  const wordmarkTranslate = useRef(new Animated.Value(12)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const statusOpacity = useRef(new Animated.Value(0)).current;
  const sparkleA = useRef(new Animated.Value(0)).current;
  const sparkleB = useRef(new Animated.Value(0)).current;
  const dot1 = useRef(new Animated.Value(0.3)).current;
  const dot2 = useRef(new Animated.Value(0.3)).current;
  const dot3 = useRef(new Animated.Value(0.3)).current;
  const screenOpacity = useRef(new Animated.Value(1)).current;

  const [statusLabel, setStatusLabel] = useState(STATUS_STAGES[0].label);
  const hasFinished = useRef(false);

  // Animación de entrada de marca (logo -> wordmark -> tagline -> estado).
  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 550,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.spring(logoScale, {
          toValue: 1,
          friction: 5,
          tension: 60,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(wordmarkOpacity, {
          toValue: 1,
          duration: 450,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(wordmarkTranslate, {
          toValue: 0,
          duration: 450,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(taglineOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(statusOpacity, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }),
    ]).start();

    // Destellos flotantes sutiles alrededor del logo (loop).
    const loopSparkle = (value, delay) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(value, {
            toValue: 1,
            duration: 1100,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(value, {
            toValue: 0,
            duration: 1100,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
        ])
      );
    loopSparkle(sparkleA, 300).start();
    loopSparkle(sparkleB, 900).start();

    // Loader de puntos pulsantes en la parte inferior.
    const loopDot = (value, delay) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(value, {
            toValue: 1,
            duration: 420,
            useNativeDriver: true,
          }),
          Animated.timing(value, {
            toValue: 0.3,
            duration: 420,
            useNativeDriver: true,
          }),
        ])
      );
    loopDot(dot1, 0).start();
    loopDot(dot2, 150).start();
    loopDot(dot3, 300).start();

    // Mensajes de estado escalonados, para que la espera se sienta como
    // trabajo real (inicializar, verificar sesión, preparar datos) y no
    // como una carga accidental.
    const stageTimers = STATUS_STAGES.slice(1).map((stage) =>
      setTimeout(() => setStatusLabel(stage.label), stage.at)
    );

    return () => stageTimers.forEach(clearTimeout);
  }, []);

  const finish = () => {
    if (hasFinished.current) return;
    hasFinished.current = true;
    Animated.timing(screenOpacity, {
      toValue: 0,
      duration: EXIT_DURATION_MS,
      easing: Easing.in(Easing.cubic),
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) onFinish?.();
    });
  };

  // Sale apenas la sesión esté verificada Y haya transcurrido el tiempo
  // mínimo de marca. Si algo tardara demasiado, MAX_DISPLAY_MS fuerza la
  // salida de todas formas.
  useEffect(() => {
    const maxTimer = setTimeout(finish, MAX_DISPLAY_MS);
    return () => clearTimeout(maxTimer);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const timer = setTimeout(finish, MIN_DISPLAY_MS);
    return () => clearTimeout(timer);
  }, [ready]);

  return (
    <Animated.View style={[styles.screen, { opacity: screenOpacity }]}>
      <View style={styles.blobTopRight} pointerEvents="none" />
      <View style={styles.blobBottomLeft} pointerEvents="none" />

      <View style={styles.center}>
        <View style={styles.logoWrapper}>
          <Animated.View
            style={[
              styles.sparkle,
              styles.sparkleTop,
              {
                opacity: sparkleA,
                transform: [
                  { translateY: sparkleA.interpolate({ inputRange: [0, 1], outputRange: [4, -6] }) },
                ],
              },
            ]}
          >
            <MaterialCommunityIcons name="star-four-points" size={16} color={COLORS.gold} />
          </Animated.View>

          <Animated.View
            style={[
              styles.sparkle,
              styles.sparkleBottom,
              {
                opacity: sparkleB,
                transform: [
                  { translateY: sparkleB.interpolate({ inputRange: [0, 1], outputRange: [-4, 6] }) },
                ],
              },
            ]}
          >
            <MaterialCommunityIcons name="star-four-points" size={12} color={COLORS.accent} />
          </Animated.View>

          <Animated.View
            style={[
              styles.logoCircle,
              { opacity: logoOpacity, transform: [{ scale: logoScale }] },
            ]}
          >
            <MaterialCommunityIcons name="lipstick" size={44} color={COLORS.accentDark} />
          </Animated.View>
        </View>

        <Animated.Text
          style={[
            styles.wordmark,
            { opacity: wordmarkOpacity, transform: [{ translateY: wordmarkTranslate }] },
          ]}
        >
          DERMABLEND
        </Animated.Text>

        <Animated.Text style={[styles.tagline, { opacity: taglineOpacity }]}>
          Belleza que cuida tu piel
        </Animated.Text>
      </View>

      <View style={styles.loaderRow}>
        <Animated.Text style={[styles.statusLabel, { opacity: statusOpacity }]}>
          {statusLabel}
        </Animated.Text>
        <View style={styles.dotsRow}>
          <Animated.View style={[styles.dot, { opacity: dot1 }]} />
          <Animated.View style={[styles.dot, { opacity: dot2 }]} />
          <Animated.View style={[styles.dot, { opacity: dot3 }]} />
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  blobTopRight: {
    position: "absolute",
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: COLORS.blob,
    opacity: 0.16,
    top: -110,
    right: -90,
  },
  blobBottomLeft: {
    position: "absolute",
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: COLORS.accent,
    opacity: 0.1,
    bottom: -90,
    left: -80,
  },
  center: {
    alignItems: "center",
  },
  logoWrapper: {
    width: 108,
    height: 108,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 22,
  },
  logoCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#2B1B17",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.14,
    shadowRadius: 20,
    elevation: 6,
  },
  sparkle: {
    position: "absolute",
    zIndex: 2,
  },
  sparkleTop: {
    top: 2,
    right: 4,
  },
  sparkleBottom: {
    bottom: 6,
    left: -2,
  },
  wordmark: {
    fontSize: 26,
    fontWeight: "800",
    letterSpacing: 4,
    color: COLORS.ink,
  },
  tagline: {
    marginTop: 8,
    fontSize: FONT_SIZE.base,
    fontWeight: "500",
    letterSpacing: 0.5,
    color: COLORS.inkMuted,
  },
  loaderRow: {
    position: "absolute",
    bottom: 72,
    alignItems: "center",
    gap: SPACING.md,
    paddingHorizontal: SPACING.xl,
  },
  statusLabel: {
    fontSize: FONT_SIZE.sm,
    fontWeight: "500",
    color: COLORS.inkMuted,
    letterSpacing: 0.3,
    textAlign: "center",
  },
  dotsRow: {
    flexDirection: "row",
    gap: 8,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: COLORS.accent,
  },
});
