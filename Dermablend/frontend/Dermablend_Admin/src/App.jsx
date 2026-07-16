import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Clients from "./pages/Clients";
import Employees from "./pages/Employees";
import Orders from "./pages/Orders";
import Reviews from "./pages/Reviews";
import Products from "./pages/Products";
import RecoveryPassword from "./pages/PasswordRecovery";
import VerifyCode from "./pages/VerifyCode";
import ProfilePage from "./pages/ProfilePage";
import Layout from "../src/layout/NavLayout";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Sin layout (login, recuperación) */}
          <Route path="/" element={<Login />} />
          <Route path="/recovery-password" element={<RecoveryPassword />} />
          <Route path="/verify-code" element={<VerifyCode />} />

          {/* Con navbar + sidebar */}
          <Route element={<Layout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/products" element={<Products />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
