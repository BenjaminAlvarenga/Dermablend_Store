import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Profile from "../components/Profile";

function ProfilePage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "Benjamin Alvarenga",
    correo: "benja@gmail.com",
    fecha: "12-09-2009",
    telefono: "1212-2121",
  });

  const handleChange = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSave = () => {
    // TODO: call your API / service here
    console.log("Saving profile:", form);
  };

  const handleLogout = () => {
    // TODO: clear auth tokens / context here
    navigate("/");
  };

  return (
    <Profile
      form={form}
      onChange={handleChange}
      onSave={handleSave}
      onLogout={handleLogout}
    />
  );
}

export default ProfilePage;
