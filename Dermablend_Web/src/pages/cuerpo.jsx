import React, { useState } from 'react';

const METRICS = [
  { value: "Varices", label: "Cobertura total" },
  { value: "Water", label: "Resistente al agua" },
  { value: "Tatoo", label: "Cubre tatuajes" },
  { value: "No-Transfer", label: "No mancha ropa" }
];

const PRODUCTS = [
  {
    id: 1,
    name: "Leg and Body Makeup",
    description: "Nuestra base corporal #1. Formulada para cubrir varices, estrías y hematomas con una textura ligera.",
    details: "Contiene pigmentos de alta densidad y ofrece hidratación por 24 horas. SPF 25 incluido.",
    price: 42.00,
    image: "https://via.placeholder.com/300x300?text=Body+Makeup" 
  },
  {
    id: 2,
    name: "Tattoo Cover Pack",
    description: "Kit especializado de alta opacidad diseñado específicamente para ocultar tinta de forma profesional.",
    details: "Incluye primer fijador y crema correctora de alto impacto. No se agrieta con el movimiento.",
    price: 54.00,
    image: "https://via.placeholder.com/300x300?text=Tattoo+Cover"
  },
  {
    id: 3,
    name: "Body Setting Powder",
    description: "Polvo fijador de gran formato para sellar el maquillaje corporal y evitar transferencias.",
    details: "Acabado mate transparente. Esencial para garantizar la resistencia al roce con la ropa.",
    price: 36.00,
    image: "https://via.placeholder.com/300x300?text=Body+Powder"
  }
];

const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [showInfo, setShowInfo] = useState(false);

  const increment = () => setQuantity(prev => prev + 1);
  const decrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="flex flex-col bg-white border border-gray-100 p-6 transition-all hover:shadow-lg group">
      <div className="relative aspect-square bg-gray-50 mb-4 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className={`w-full h-full object-cover mix-blend-multiply transition-transform duration-500 ${showInfo ? 'scale-110 blur-sm' : 'scale-100'}`}
        />
        {showInfo && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center p-6 transition-opacity">
            <p className="text-white text-xs text-center leading-relaxed font-light">
              {product.details}
            </p>
          </div>
        )}
        <button 
          onClick={() => setShowInfo(!showInfo)}
          className="absolute bottom-2 right-2 bg-white/80 text-[9px] px-2 py-1 uppercase tracking-tighter hover:bg-white"
        >
          {showInfo ? "[ Cerrar ]" : "[ + Info ]"}
        </button>
      </div>
      
      <h3 className="font-serif text-xl mb-2">{product.name}</h3>
      <p className="text-sm text-gray-500 mb-4 flex-grow">{product.description}</p>
      <div className="text-lg font-bold mb-6">${product.price.toFixed(2)}</div>

      <div className="flex items-center justify-between border border-[#1a1a1a] mb-3">
        <button onClick={decrement} className="px-4 py-2 hover:bg-[#1a1a1a] hover:text-white transition-colors">-</button>
        <span className="font-medium">{quantity}</span>
        <button onClick={increment} className="px-4 py-2 hover:bg-[#1a1a1a] hover:text-white transition-colors">+</button>
      </div>

      <button 
        className="w-full bg-[#1a1a1a] text-white py-3 text-[10px] uppercase tracking-[0.2em] hover:bg-black transition-all active:scale-95"
        onClick={() => alert(`Confirmado: ${quantity} unidad(es) de ${product.name} al carrito.`)}
      >
        Añadir Selección
      </button>
    </div>
  );
};

const Cuerpo = () => {
  return (
    <div className="w-full min-h-screen bg-white text-[#1a1a1a] antialiased flex flex-col">
      <main className="flex-grow">
        <div className="w-full bg-[#1a1a1a]">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 py-8">
            {METRICS.map((m, i) => (
              <div key={i} className="text-center p-4 border-r border-white/10 last:border-0">
                <div className="text-2xl text-white font-serif mb-1 italic">
                  {m.value}
                </div>
                <div className="text-[9px] uppercase tracking-widest text-white/50">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <section className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <span className="text-[10px] uppercase tracking-[0.3em] text-gray-400">Camuflaje de Alto Impacto</span>
            <h2 className="text-4xl font-serif mt-3 italic">Dermablend: Cuerpo</h2>
            <p className="text-xs text-gray-400 mt-4 max-w-md mx-auto leading-relaxed">
              Soluciones dermatológicas diseñadas para unificar el tono de la piel en áreas extensas con resistencia extrema.
            </p>
            <div className="w-12 h-[1px] bg-[#1a1a1a] mx-auto mt-8"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PRODUCTS.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Cuerpo;