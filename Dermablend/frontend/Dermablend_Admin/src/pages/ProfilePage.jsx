import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Profile from "../components/Profile";
import AuthService from "../services/Auth";
import EmployeesService from "../services/Employees";

function ProfilePage() {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", image: "", public_id: "" });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const { user } = await AuthService.getProfile();
        setEmployee(user);
        setForm({
          name: user?.name || "",
          email: user?.email || "",
          image: user?.image || "",
          public_id: user?.public_id || "",
        });
      } catch (error) {
        console.log("Error al obtener el perfil:", error);
        toast.error("Error al cargar el perfil");
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  const handleChange = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleImageUploaded = ({ url, public_id }) =>
    setForm((prev) => ({ ...prev, image: url, public_id }));

  const handleSave = async () => {
    if (!employee?._id) return;
    try {
      await EmployeesService.put(employee._id, form);
      toast.success("Perfil actualizado correctamente");
    } catch (error) {
      console.log("Error al actualizar el perfil:", error);
      toast.error("Error al actualizar el perfil");
    }
  };

  const handleLogout = async () => {
    try {
      await AuthService.logout();
    } catch (error) {
      console.log("Error al cerrar sesión:", error);
    }
    localStorage.removeItem("fakestore_token");
    localStorage.removeItem("fakestore_user");
    localStorage.removeItem("fakestore_email");
    sessionStorage.removeItem("fakestore_token");
    sessionStorage.removeItem("fakestore_user");
    sessionStorage.removeItem("fakestore_email");
    navigate("/");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center" style={{ backgroundColor: "#faf9f7", color: "#7a6e66" }}>
        Cargando perfil...
      </div>
    );
  }

  return (
    <Profile
      form={form}
      employee={employee}
      onChange={handleChange}
      onImageUploaded={handleImageUploaded}
      onSave={handleSave}
      onLogout={handleLogout}
    />
  );
}

export default ProfilePage;
