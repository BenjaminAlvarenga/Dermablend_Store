// Tu IP local de la computadora en la red (revisa con `ipconfig`).
// Esta IP es accesible tanto para tu celular físico como para los emuladores.
// Si cambias de red, o de PC, esta IP casi seguro cambia también: actualízala aquí y en .env.
const LOCAL_HOST_IP = "192.168.56.1";

// El backend de Dermablend corre por defecto en el puerto 3000 (ver Dermablend/backend/.env)
const rawUrl = process.env.EXPO_PUBLIC_API_URL || `http://${LOCAL_HOST_IP}:3000/api`;

export function getApiUrl() {
  // Si por alguna razón la URL configurada usa 'localhost', la reemplazamos con la IP de tu PC
  if (rawUrl.includes("localhost")) {
    return rawUrl.replace("localhost", LOCAL_HOST_IP);
  }
  return rawUrl;
}

export const API_URL = getApiUrl();