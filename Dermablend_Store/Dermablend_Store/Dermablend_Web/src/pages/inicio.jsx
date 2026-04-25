import React from 'react';
import { Link } from "react-router-dom";

// Datos de Métricas
const METRICS = [
  { value: "10K+", label: "Clientes felices" },
  { value: "4.9", label: "Calificación" },
  { value: "100%", label: "Vegano" },
  { value: "24h", label: "Envío rápido" }
];

const CATS = [
  { name: 'Rostro', link: '/rostro' },
  { name: 'Labios', link: '/labios' },
  { name: 'Solar', link: '/solar' },
  { name: 'Combos', link: '/combos' },
];

const PRODUCTS = [
  { id: 1, name: "Cover Fluid Foundation", desc: "Base de alta cobertura 24h", price: "$38.00", tag: "Best Seller" },
  { id: 2, name: "Setting Powder Ultra", desc: "Polvo fijador invisible", price: "$29.00", tag: "Indispensable" },
  { id: 3, name: "Leg and Body Cover", desc: "Corrector corporal total", price: "$42.00", tag: "Profesional" },
  { id: 4, name: "SOS Cover Stick", desc: "Corrector de imperfecciones", price: "$26.00", tag: "Nuevo" }
];

const DermablendLanding = () => {
  return (
    <div className="w-full min-h-screen bg-[#111111] text-white antialiased flex flex-col">
      
      {/* ESPACIADOR PARA EL NAV FIJO (Ajusta el h-[80px] según el alto de tu componente Nav) */}
      <div className="h-[80px]"></div>

      <main>
        {/* 1. BANNER ENVÍO */}
        <div className="w-full border-b border-white/10 py-3 text-center">
            <p className="text-[9px] tracking-[3px] uppercase opacity-80">
                Envío gratis en órdenes superiores a $75
            </p>
        </div>

        {/* 2. CATEGORÍAS */}
        <section className="w-full py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap justify-center gap-4">
              {CATS.map((c) => (
                <Link
                  key={c.name}
                  to={c.link}
                  className="bg-[#1A1A1A] px-12 py-8 min-w-[160px] text-center border border-white/5 hover:border-[#8B5E3C]/50 hover:bg-[#222222] transition-all group"
                >
                  <div className="text-[12px] tracking-[4px] uppercase font-bold text-white group-hover:text-[#8B5E3C]">
                    {c.name}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 3. SECCIÓN DE MÉTRICAS (Fondo Marrón Oscuro / Premium) */}
        <div className="w-full bg-[#2C1810]">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 py-10 px-4">
            {METRICS.map((m, i) => (
              <div key={i} className="text-center p-4">
                <div className="text-3xl text-white font-serif mb-1 italic">
                  {m.value}
                </div>
                <div className="text-[10px] uppercase tracking-[2px] text-white/40">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. PRODUCTOS DESTACADOS */}
        <section className="w-full py-20 px-6 bg-white text-[#1A1A1A]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <span className="text-[10px] tracking-[4px] uppercase text-[#8B5E3C] font-bold">Nuestra Selección</span>
                <h2 className="text-4xl font-serif mt-2">Los más <span className="italic">Buscados</span></h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {PRODUCTS.map((p) => (
                <div key={p.id} className="group flex flex-col">
                  <div className="aspect-[3/4] bg-[#F4F4F4] mb-4 relative overflow-hidden">
                    <div className="absolute top-4 left-4 bg-black text-white px-2 py-1 text-[8px] uppercase tracking-widest z-10">
                      {p.tag}
                    </div>
                    <div className="w-full h-full bg-neutral-200 group-hover:scale-105 transition-transform duration-700"></div>
                  </div>
                  
                  <div className="space-y-1">
                    <h3 className="font-serif text-lg text-[#111111]">{p.name}</h3>
                    <p className="text-gray-500 text-[10px] uppercase tracking-widest">{p.desc}</p>
                    <div className="flex justify-between items-center pt-2">
                        <span className="font-bold text-[#111111]">{p.price}</span>
                        <button className="text-[10px] uppercase tracking-widest border-b border-black pb-0.5 hover:text-[#8B5E3C] hover:border-[#8B5E3C] transition-colors">
                            Añadir
                        </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DermablendLanding;