import { Camera } from "lucide-react";
import { useRef, useState } from "react";

function Profile({ form, onChange, onSave }) {
  const fileInputRef = useRef(null);
  const [avatarSrc, setAvatarSrc] = useState(null);

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setAvatarSrc(url);
  };

  return (
    <main className="min-h-screen px-6 py-16 md:px-16" style={{ backgroundColor: "#faf9f7" }}>
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-semibold" style={{ color: "#3b2f2f" }}>
          Mi perfil
        </h1>

        <div className="mt-16 grid gap-16 md:grid-cols-2 md:items-center">
          {/* Avatar */}
          <div className="flex justify-center">
            <div className="relative">
              <div
                className="flex h-72 w-72 items-center justify-center rounded-full overflow-hidden"
                style={{ border: "1px solid #d6cfc7", backgroundColor: "#f0ece6" }}
              >
                {avatarSrc ? (
                  <img
                    src={avatarSrc}
                    alt="Avatar"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-5xl font-light" style={{ color: "#b0a89e" }}>
                    Foto
                  </span>
                )}
              </div>

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />

              <button
                type="button"
                aria-label="Cambiar foto"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-2 right-6 transition-opacity hover:opacity-70"
                style={{ color: "#3b2f2f" }}
              >
                <Camera className="h-7 w-7" strokeWidth={1.75} />
              </button>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSave?.();
            }}
            className="flex flex-col gap-6"
          >
            <Field label="Nombre completo">
              <input
                type="text"
                value={form.nombre}
                onChange={onChange("nombre")}
                style={inputStyle}
              />
            </Field>

            <Field label="Correo electrónico">
              <input
                type="email"
                value={form.correo}
                onChange={onChange("correo")}
                style={inputStyle}
              />
            </Field>

            <div className="grid grid-cols-2 gap-6">
              <Field label="Fecha de nacimiento">
                <input
                  type="text"
                  value={form.fecha}
                  onChange={onChange("fecha")}
                  style={inputStyle}
                />
              </Field>
              <Field label="N. Telefónico">
                <input
                  type="text"
                  value={form.telefono}
                  onChange={onChange("telefono")}
                  style={inputStyle}
                />
              </Field>
            </div>

            <div className="mt-2 flex justify-end">
              <button
                type="submit"
                style={{
                  backgroundColor: "#5c4a3a",
                  color: "#ffffff",
                  borderRadius: "0.5rem",
                  padding: "1rem 2rem",
                  fontSize: "1rem",
                  fontWeight: "600",
                  border: "none",
                  cursor: "pointer",
                  transition: "opacity 0.2s",
                }}
                onMouseOver={(e) => (e.currentTarget.style.opacity = "0.85")}
                onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
              >
                Guardar cambios
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

const inputStyle = {
  backgroundColor: "#f5f0e8",
  border: "none",
  borderRadius: "999px",
  padding: "0.65rem 1.25rem",
  fontSize: "0.95rem",
  color: "#3b2f2f",
  width: "100%",
  outline: "none",
};

function Field({ label, children }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm" style={{ color: "#7a6e66" }}>
        {label}
      </span>
      {children}
    </label>
  );
}

export default Profile;
