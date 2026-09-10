import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authService } from "../services/authService";

const AuthContext = createContext(null);
const AUTH_STORAGE_KEY = "dermablend:auth-session";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isBooting, setIsBooting] = useState(true);
  const [loading, setLoading] = useState(false);

  // Inicializa la sesión guardada en el dispositivo
  const initializeSession = useCallback(async () => {
    try {
      const raw = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
      if (raw) {
        const session = JSON.parse(raw);
        setUser(session.user);
        setToken(session.token);
      }
    } catch (error) {
      console.log("Error al cargar sesión de Dermablend:", error);
    } finally {
      setIsBooting(false);
    }
  }, []);

  useEffect(() => {
    initializeSession();
  }, [initializeSession]);

  const persistSession = useCallback(async (sessionUser, sessionToken) => {
    setUser(sessionUser);
    setToken(sessionToken);
    await AsyncStorage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify({ user: sessionUser, token: sessionToken })
    );
  }, []);

  const login = useCallback(
    async ({ email, password }) => {
      setLoading(true);
      try {
        const data = await authService.login({ email, password });
        await persistSession(data.user, data.token);
        return { ok: true, message: data?.message || "Bienvenido", user: data.user };
      } catch (error) {
        return { ok: false, message: error.message };
      } finally {
        setLoading(false);
      }
    },
    [persistSession]
  );

  // El backend crea la cuenta como activa de inmediato, así que el registro
  // también inicia sesión (igual que en Dermablend_Public).
  const register = useCallback(
    async ({ name, email, password, birthdate, phone, skin_type, skin_tone }) => {
      setLoading(true);
      try {
        const data = await authService.register({
          name,
          email,
          password,
          birthdate,
          phone,
          skin_type,
          skin_tone,
        });
        await persistSession(data.user, data.token);
        return { ok: true, message: data?.message || "Cuenta creada con éxito.", user: data.user };
      } catch (error) {
        return { ok: false, message: error.message };
      } finally {
        setLoading(false);
      }
    },
    [persistSession]
  );

  const logout = useCallback(async () => {
    setUser(null);
    setToken(null);
    try {
      await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (error) {
      console.log("Error al eliminar sesión:", error);
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(user),
      isBooting,
      loading,
      login,
      register,
      logout,
    }),
    [user, token, isBooting, loading, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;
