import React, { useState } from 'react';

const METRICS = [
  { value: "10K+", label: "Clientes felices" },
  { value: "4.9", label: "Calificación" },
  { value: "100%", label: "Vegano" },
  { value: "24h", label: "Envío rápido" }
];

const PRODUCTS = [
  {
    id: 1,
    name: "Dermablend Lip Fix",
    description: "Sellador de color de alta resistencia, ideal para pieles sensibles.",
    price: 24.00,
    image: "https://via.placeholder.com/300x300?text=Lip+Fix" 
  },
  {
    id: 2,
    name: "Cover Creme Crimson",
    description: "Labial de cobertura total con pigmentos minerales puros.",
    price: 28.00,
    image: "https://via.placeholder.com/300x300?text=Cover+Creme"
  },
  {
    id: 3,
    name: "Hydro-Liquid Balm",
    description: "Hidratación profunda con un toque de color dermatológico.",
    price: 22.00,
    image: "https://via.placeholder.com/300x300?text=Liquid+Balm"
  }
];

const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  const increment = () => setQuantity(prev => prev + 1);
  const decrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="flex flex-col bg-white border border-gray-100 p-6 transition-all hover:shadow-lg">
      <div className="aspect-square bg-gray-50 mb-4 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover mix-blend-multiply"
        />
      </div>
      
      <h3 className="font-serif text-xl mb-2">{product.name}</h3>
      <p className="text-sm text-gray-500 mb-4 flex-grow">{product.description}</p>
      <div className="text-lg font-bold mb-6">${product.price.toFixed(2)}</div>

      <div className="flex items-center justify-between border border-[#2C1810] mb-3">
        <button onClick={decrement} className="px-4 py-2 hover:bg-[#2C1810] hover:text-white">
          -
        </button>
        <span>{quantity}</span>
        <button onClick={increment} className="px-4 py-2 hover:bg-[#2C1810] hover:text-white">
          +
        </button>
      </div>

      <button 
        className="w-full bg-[#2C1810] text-white py-3 text-[10px] uppercase tracking-widest hover:bg-[#3D2B1F]"
        onClick={() => alert(`Agregado: ${quantity} unidad(es) de ${product.name}`)}
      >
        Agregar al carrito
      </button>
    </div>
  );
};

const Labios = () => {
  return (
    <div className="w-full min-h-screen bg-white text-[#3D2B1F] antialiased flex flex-col">
      
      <main className="flex-grow">
        
        {/* MÉTRICAS */}
        <div className="w-full bg-[#2C1810]">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 py-8">
            {METRICS.map((m, i) => (
              <div key={i} className="text-center p-4">
                <div className="text-2xl text-white font-serif mb-1 italic">
                  {m.value}
                </div>
                <div className="text-[9px] uppercase text-white/40">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PRODUCTOS */}
        <section className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <span className="text-[10px] uppercase text-gray-400">Colección Profesional</span>
            <h2 className="text-4xl font-serif mt-2">Dermablend Lips</h2>
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

export default Labios;