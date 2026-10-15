import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { RESTAURANT_CONFIG, buildWhatsAppLink } from '../config/restaurantConfig';

export const WhatsAppFloatingButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  const defaultMessage = '¡Hola Pastas To Go! Estoy explorando la aplicación demo y quisiera más información.';

  return (
    <div className="fixed bottom-20 right-4 z-30 flex flex-col items-end">
      {/* Optional dismissible tooltip */}
      {showTooltip && (
        <div className="mb-2 bg-white text-[#143527] border border-[#EDE6D8] rounded-2xl shadow-lg p-2.5 max-w-[200px] text-xs relative animate-in fade-in slide-in-from-bottom-2 duration-300">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute top-1.5 right-1.5 text-gray-400 hover:text-gray-700 p-0.5 cursor-pointer"
          >
            <X className="w-3 h-3" />
          </button>
          <div className="font-bold text-[11px] text-[#25D366] flex items-center gap-1 mb-0.5">
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse"></span>
            ¿Deseas consultar?
          </div>
          <p className="text-[10.5px] text-[#5C665F] leading-tight">
            Escríbenos directo a nuestro WhatsApp de atención.
          </p>
        </div>
      )}

      {/* Floating button */}
      <a
        href={buildWhatsAppLink(defaultMessage)}
        target="_blank"
        rel="noopener noreferrer"
        className="w-13 h-13 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-lg hover:shadow-xl active:scale-95 transition-all group"
        aria-label="Contactar al restaurante por WhatsApp"
      >
        <MessageCircle className="w-7 h-7 fill-white group-hover:scale-110 transition-transform" />
      </a>
    </div>
  );
};
