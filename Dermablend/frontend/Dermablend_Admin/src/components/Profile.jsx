import { Camera } from "lucide-react";
import { useRef, useState } from "react";
import UploadService from "../services/Upload";

function Profile({ form, employee, onChange, onImageUploaded, onSave }) {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError("");

    try {
      const result = await UploadService.uploadImage(file);
      onImageUploaded?.({ url: result.url, public_id: result.public_id });
    } catch (error) {
      console.error("Error subiendo la imagen:", error);
      setUploadError(error.message || "Error al subir la imagen");
    } finally {
      setUploading(false);
    }
  };

  return (
    <main className="min-h-screen px-6 py-16 md:px-16" style={{ backgroundColor: "#faf9f7" }}>
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-semibold" style={{ color: "#3b2f2f" }}>
          Mi perfil
        </h1>

        <div className="mt-16 grid gap-16 md:grid-cols-2 md:items-center">
          {/* Avatar */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <div
                className="flex h-72 w-72 items-center justify-center rounded-full overflow-hidden"
                style={{ border: "1px solid #d6cfc7", backgroundColor: "#f0ece6" }}
              >
                {form.image ? (
                  <img
                    src={form.image}
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
                disabled={uploading}
                className="absolute bottom-2 right-6 transition-opacity hover:opacity-70"
                style={{ color: "#3b2f2f" }}
              >
                <Camera className="h-7 w-7" strokeWidth={1.75} />
              </button>
            </div>

            {uploading ? (
              <p className="mt-3 text-sm" style={{ color: "#7a6e66" }}>Subiendo imagen...</p>
            ) : null}
            {uploadError ? (
              <p className="mt-3 text-sm text-red-600">{uploadError}</p>
            ) : null}
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
                value={form.name}
                onChange={onChange("name")}
                style={inputStyle}
              />
            </Field>

            <Field label="Correo electrónico">
              <input
                type="email"
                value={form.email}
                onChange={onChange("email")}
                style={inputStyle}
              />
            </Field>

            <div className="grid grid-cols-2 gap-6">
              <Field label="Rol">
                <input
                  type="text"
                  value={employee?.role || ""}
                  readOnly
                  style={{ ...inputStyle, opacity: 0.7, cursor: "not-allowed" }}
                />
              </Field>
              <Field label="Estatus">
                <input
                  type="text"
                  value={employee?.status === "active" ? "Activo" : "Inactivo"}
                  readOnly
                  style={{ ...inputStyle, opacity: 0.7, cursor: "not-allowed" }}
                />
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <Field label="Fecha de contratación">
                <input
                  type="text"
                  value={
                    employee?.hire_date
                      ? new Date(employee.hire_date).toLocaleDateString()
                      : ""
                  }
                  readOnly
                  style={{ ...inputStyle, opacity: 0.7, cursor: "not-allowed" }}
                />
              </Field>
              <Field label="Salario">
                <input
                  type="text"
                  value={employee?.salary ?? ""}
                  readOnly
                  style={{ ...inputStyle, opacity: 0.7, cursor: "not-allowed" }}
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
