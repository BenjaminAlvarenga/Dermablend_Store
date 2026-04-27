import React, { useState } from 'react';

const CONTACT_INFO = [
  { title: "Soporte Técnico", detail: "soporte@dermablend.com" },
  { title: "Consultas Dermatológicas", detail: "+1 (800) DERMA-BL" },
  { title: "Sede Central", detail: "New York, NY 10001" },
  { title: "Horario", detail: "Lunes a Viernes: 9am - 6pm" }
];

const Contacto = () => {
  const initialFormState = {
    nombre: "",
    email: "",
    asunto: "Consulta de producto",
    mensaje: ""
  };

  const [formData, setFormData] = useState(initialFormState);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mostramos el modal de Tailwind
    setShowModal(true);
    
    // Limpiamos el formulario
    setFormData(initialFormState);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="relative w-full min-h-screen bg-white text-[#1a1a1a] antialiased flex flex-col">
      
      {/* MODAL PERSONALIZADO (ALERTA CHIVA) */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-opacity">
          <div className="bg-white p-8 md:p-12 max-w-sm w-full border border-gray-100 shadow-2xl transform transition-all scale-100 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-[#1a1a1a] flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-serif text-2xl mb-2 italic">Mensaje Enviado</h3>
            <p className="text-xs text-gray-500 uppercase tracking-widest leading-relaxed mb-8">
              Tu consulta ha sido registrada. Nuestro equipo de expertos te contactará en breve.
            </p>
            <button 
              onClick={() => setShowModal(false)}
              className="w-full py-3 bg-[#1a1a1a] text-white text-[10px] uppercase tracking-[0.2em] hover:bg-black transition-colors"
            >
              Entendido
            </button>
          </div>
        </div>
      )}

      <main className="flex-grow">
        <div className="w-full bg-[#1a1a1a]">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 py-8">
            {CONTACT_INFO.map((info, i) => (
              <div key={i} className="text-center p-4 border-r border-white/10 last:border-0">
                <div className="text-[10px] uppercase tracking-widest text-white/50 mb-2">{info.title}</div>
                <div className="text-sm text-white font-serif italic">{info.detail}</div>
              </div>
            ))}
          </div>
        </div>

        <section className="max-w-4xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <span className="text-[10px] uppercase tracking-[0.3em] text-gray-400">Atención Personalizada</span>
            <h2 className="text-4xl font-serif mt-3 italic">Contacta con Expertos</h2>
            <div className="w-12 h-[1px] bg-[#1a1a1a] mx-auto mt-8"></div>
          </div>

          <div className="bg-gray-50 p-8 md:p-12 border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label className="text-[10px] uppercase tracking-widest mb-2 text-gray-500">Nombre Completo</label>
                  <input 
                    type="text" name="nombre" required
                    value={formData.nombre}
                    className="bg-transparent border-b border-gray-300 py-2 focus:border-[#1a1a1a] outline-none transition-colors"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-[10px] uppercase tracking-widest mb-2 text-gray-500">Correo Electrónico</label>
                  <input 
                    type="email" name="email" required
                    value={formData.email}
                    className="bg-transparent border-b border-gray-300 py-2 focus:border-[#1a1a1a] outline-none transition-colors"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-[10px] uppercase tracking-widest mb-2 text-gray-500">Motivo de Consulta</label>
                <select 
                  name="asunto" value={formData.asunto}
                  className="bg-transparent border-b border-gray-300 py-2 focus:border-[#1a1a1a] outline-none transition-colors"
                  onChange={handleChange}
                >
                  <option>Consulta de producto</option>
                  <option>Seguimiento de pedido</option>
                  <option>Asesoría de tono</option>
                  <option>Reportar reacción alérgica</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-[10px] uppercase tracking-widest mb-2 text-gray-500">Mensaje</label>
                <textarea 
                  name="mensaje" rows="4" required
                  value={formData.mensaje}
                  className="bg-transparent border-b border-gray-300 py-2 focus:border-[#1a1a1a] outline-none transition-colors resize-none"
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="pt-4">
                <button 
                  type="submit"
                  className="w-full md:w-auto px-12 bg-[#1a1a1a] text-white py-4 text-[10px] uppercase tracking-[0.2em] hover:bg-black transition-all active:scale-95"
                >
                  Enviar Mensaje
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Contacto;