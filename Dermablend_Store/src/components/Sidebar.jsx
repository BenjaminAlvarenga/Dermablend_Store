import React, { useState } from "react";

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  // Estos son tus links del menú
  const menuItems = [
    { name: "Inicio", path: "/" },
    { name: "Productos", path: "/productos" },
    { name: "Proveedores", path: "/proveedores" },
    { name: "Ajustes", path: "/settings" },
  ];

  return (
    <div 
      className={`fixed left-0 bg-[#E2BA7C] transition-all duration-300 z-40 
      ${isCollapsed ? "w-16" : "w-64"}`}
      style={{ top: '80px', height: 'calc(180vh - 100px)' }} 
    >
      {/* Botón para colapsar usando un símbolo simple */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-9 bg-white text-black rounded-full w-6 h-6 flex items-center justify-center shadow-md text-xs font-bold"
      >
        {isCollapsed ? ">" : "<"}
      </button>

      <nav className="mt-14 flex flex-col space-y-2 px-2">
        {menuItems.map((item) => (
          <a
            key={item.name}
            href={item.path}
            className="flex items-center p-3 rounded-lg text-gray-600 hover:bg-[#F5E6D3] hover:text-[#333] transition-colors overflow-hidden whitespace-nowrap"
          >
            {/* Un cuadrado pequeño como icono temporal */}
            <div className="min-w-[24px] h-6 bg-white rounded-sm flex-shrink-0" />
            
            {/* El texto desaparece si está colapsado */}
            {!isCollapsed && <span className="ml-4 font-medium">{item.name}</span>}
          </a>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;