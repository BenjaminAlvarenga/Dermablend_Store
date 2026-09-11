// Validaciones compartidas para formularios de autenticación y checkout.
// Las funciones `validate*Fields` devuelven un objeto { campo: mensaje } para
// que cada error se muestre junto a su campo correspondiente en el formulario.

export const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
export const BIRTHDATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;
export const MIN_PASSWORD_LENGTH = 6;

export function isBlank(value) {
  return !value || !String(value).trim();
}

export function isValidEmail(value) {
  return EMAIL_REGEX.test(String(value || "").trim());
}

export function isValidPassword(value) {
  return String(value || "").length >= MIN_PASSWORD_LENGTH;
}

/**
 * Valida los campos del formulario de login.
 * @returns {{email?: string, password?: string}} Errores por campo (vacío si es válido).
 */
export function validateLoginFields({ email, password }) {
  const errors = {};

  if (isBlank(email)) {
    errors.email = "Ingresa tu correo electrónico.";
  } else if (!isValidEmail(email)) {
    errors.email = "Ingresa un correo electrónico válido.";
  }

  if (isBlank(password)) {
    errors.password = "Ingresa tu contraseña.";
  } else if (!isValidPassword(password)) {
    errors.password = `La contraseña debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres.`;
  }

  return errors;
}

/**
 * Valida los campos del formulario de registro.
 * @returns {Object} Errores por campo (vacío si es válido).
 */
export function validateRegisterFields({
  name,
  email,
  password,
  confirmPassword,
  birthdate,
  phone,
}) {
  const errors = {};

  if (isBlank(name)) errors.name = "Ingresa tu nombre completo.";

  if (isBlank(email)) {
    errors.email = "Ingresa tu correo electrónico.";
  } else if (!isValidEmail(email)) {
    errors.email = "Ingresa un correo electrónico válido.";
  }

  if (isBlank(password)) {
    errors.password = "Ingresa una contraseña.";
  } else if (!isValidPassword(password)) {
    errors.password = `La contraseña debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres.`;
  }

  if (isBlank(confirmPassword)) {
    errors.confirmPassword = "Confirma tu contraseña.";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Las contraseñas no coinciden.";
  }

  if (isBlank(birthdate)) {
    errors.birthdate = "Ingresa tu fecha de nacimiento.";
  } else if (!BIRTHDATE_REGEX.test(birthdate.trim()) || isNaN(Date.parse(birthdate.trim()))) {
    errors.birthdate = "Usa el formato AAAA-MM-DD.";
  }

  if (isBlank(phone)) errors.phone = "Ingresa tu número de teléfono.";

  return errors;
}

/**
 * Valida los campos del formulario de restablecimiento de contraseña.
 * @returns {{token?: string, newPassword?: string, confirmPassword?: string}}
 */
export function validateResetPasswordFields({ token, newPassword, confirmPassword }) {
  const errors = {};

  if (isBlank(token)) {
    errors.token = "Ingresa el código de recuperación.";
  } else if (!/^\d{6}$/.test(String(token).trim())) {
    errors.token = "El código debe tener 6 dígitos.";
  }

  if (isBlank(newPassword)) {
    errors.newPassword = "Ingresa tu nueva contraseña.";
  } else if (!isValidPassword(newPassword)) {
    errors.newPassword = `La contraseña debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres.`;
  }

  if (isBlank(confirmPassword)) {
    errors.confirmPassword = "Confirma tu nueva contraseña.";
  } else if (newPassword !== confirmPassword) {
    errors.confirmPassword = "Las contraseñas no coinciden.";
  }

  return errors;
}
