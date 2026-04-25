import React, { useState } from 'react';

const METRICS = [
  { value: "SPF 50+", label: "Protección Muy Alta" },
  { value: "UVA/UVB", label: "Amplio Espectro" },
  { value: "80 min", label: "Resistente al agua" },
  { value: "Oxy-Free", label: "Respetuoso con el mar" }
];

const PRODUCTS = [
  {
    id: 1,
    name: "Sun Defense Fluid",
    description: "Protector facial ultra ligero con acabado invisible. Ideal para uso diario bajo el maquillaje.",
    price: 34.00,
    image: "https://via.placeholder.com/300x300?text=Sun+Fluid" 
  },
  {
    id: 2,
    name: "Mineral Sunscreen Stick",
    description: "Barra protectora 100% mineral para zonas sensibles y retoques rápidos durante el día.",
    price: 26.00,
    image: "https://via.placeholder.com/300x300?text=Mineral+Stick"
  },
  {
    id: 3,
    name: "Post-Solar Hydrating Gel",
    description: "Gel refrescante con aloe vera y vitamina E que calma y repara la barrera cutánea tras la exposición.",
    price: 22.00,
    image: "https://via.placeholder.com/300x300?text=After+Sun"
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

const Solar = () => {
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
            <span className="text-[10px] uppercase tracking-[0.3em] text-gray-400">Protección Avanzada</span>
            <h2 className="text-4xl font-serif mt-3">Dermablend Professional: Solar</h2>
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

export default Solar;