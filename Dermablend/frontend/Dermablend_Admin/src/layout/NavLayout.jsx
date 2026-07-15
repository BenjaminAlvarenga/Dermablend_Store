import { useState } from "react";
import Navbar from "../components/UI/Nav.jsx";
import Sidebar from "../components/UI/Sidebar.jsx";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen">
      <Navbar onMenuClick={() => setSidebarOpen((prev) => !prev)} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="min-w-0 flex-1 overflow-y-auto overflow-x-hidden bg-[#faf6f0] p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;