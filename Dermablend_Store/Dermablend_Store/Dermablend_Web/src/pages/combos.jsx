import React, { useState } from 'react';

const METRICS = [
  { value: "30%", label: "Ahorro promedio" },
  { value: "Rutina", label: "Paso a paso" },
  { value: "Full", label: "Cobertura total" },
  { value: "Gift", label: "Regalo incluido" }
];

const PRODUCTS = [
  {
    id: 1,
    name: "Starter Cover Kit",
    description: "El dúo esencial: incluye base fluida y polvos fijadores para una piel perfecta durante 16 horas.",
    price: 58.00,
    image: "https://via.placeholder.com/300x300?text=Starter+Kit" 
  },
  {
    id: 2,
    name: "Total Correction Bundle",
    description: "Kit de alta cobertura con corrector mineral, base líquida y esponja aplicadora profesional.",
    price: 65.00,
    image: "https://via.placeholder.com/300x300?text=Correction+Bundle"
  },
  {
    id: 3,
    name: "Sun & Care Set",
    description: "Protección y recuperación: incluye protector solar fluido y gel hidratante post-solar reparador.",
    price: 45.00,
    image: "https://via.placeholder.com/300x300?text=Sun+Care+Set"
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

      <div className="flex items-center justify-between border border-[#1a1a1a] mb-3">
        <button onClick={decrement} className="px-4 py-2 hover:bg-[#1a1a1a] hover:text-white transition-colors">
          -
        </button>
        <span className="font-medium">{quantity}</span>
        <button onClick={increment} className="px-4 py-2 hover:bg-[#1a1a1a] hover:text-white transition-colors">
          +
        </button>
      </div>

      <button 
        className="w-full bg-[#1a1a1a] text-white py-3 text-[10px] uppercase tracking-[0.2em] hover:bg-[#333333] transition-colors"
        onClick={() => alert(`Agregado: ${quantity} unidad(es) de ${product.name}`)}
      >
        Agregar al carrito
      </button>
    </div>
  );
};

const Combos = () => {
  return (
    <div className="w-full min-h-screen bg-white text-[#1a1a1a] antialiased flex flex-col">
      <main className="flex-grow">
        <div className="w-full bg-[#1a1a1a]">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 py-8">
            {METRICS.map((m, i) => (
              <div key={i} className="text-center p-4">
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
            <span className="text-[10px] uppercase tracking-[0.3em] text-gray-400">Ediciones Limitadas</span>
            <h2 className="text-4xl font-serif mt-3">Dermablend Professional: Combos</h2>
            <div className="w-12 h-[1px] bg-[#1a1a1a] mx-auto mt-6"></div>
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

export default Combos;