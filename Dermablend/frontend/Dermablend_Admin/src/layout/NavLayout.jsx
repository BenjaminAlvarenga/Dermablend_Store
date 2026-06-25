import Navbar from "../components/UI/Nav.jsx";
import Sidebar from "../components/UI/Sidebar.jsx";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-[#faf6f0] p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;