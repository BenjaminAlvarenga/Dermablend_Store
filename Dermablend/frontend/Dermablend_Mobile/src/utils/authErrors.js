// El backend responde mensajes de error en inglés; aquí se traducen los más comunes.
const MESSAGES = {
  "invalid email or password": "Correo o contraseña incorrectos.",
  "invalid credentials": "Correo o contraseña incorrectos.",
  "email is already registered": "Ese correo ya está registrado. Intenta iniciar sesión.",
  "account is inactive": "Tu cuenta está inactiva. Contacta a soporte.",
  "your account is inactive. please contact support": "Tu cuenta está inactiva. Contacta a soporte.",
  "email and password are required": "Ingresa tu correo y contraseña.",
  "email and password cannot be empty strings": "El correo y la contraseña no pueden estar vacíos.",
  "please provide a valid email address format": "Ingresa un correo electrónico válido.",
  "please provide all required client fields": "Completa todos los campos requeridos.",
  "required registration fields cannot be empty strings": "Ningún campo puede quedar vacío.",
  "password must be at least 6 characters long": "La contraseña debe tener al menos 6 caracteres.",
  "please provide a valid date format for birthdate": "Ingresa una fecha de nacimiento válida (AAAA-MM-DD).",
};

export function translateAuthError(message) {
  if (!message) return "Ocurrió un error inesperado.";
  const key = message.trim().toLowerCase();
  return MESSAGES[key] || message;
}
