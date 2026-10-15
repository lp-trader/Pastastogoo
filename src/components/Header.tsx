import React, { useState } from 'react';
import { Menu, ShoppingCart, X, Phone, MapPin, Clock, Award, Sparkles, Utensils } from 'lucide-react';
import { PastasToGoLogo } from './PastasToGoLogo';
import { useCart } from '../context/CartContext';
import { RESTAURANT_CONFIG, buildWhatsAppLink } from '../config/restaurantConfig';

interface HeaderProps {
  onNavigateToMenu?: () => void;
  onNavigateToBestSellers?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onNavigateToMenu,
  onNavigateToBestSellers,
}) => {
  const { totalItemCount, setIsCartOpen } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 bg-[#F6F0E4]/95 backdrop-blur-md border-b border-[#E8DFC8] px-4 py-2 transition-all shadow-2xs">
        <div className="max-w-md mx-auto flex items-center justify-between">
          {/* Hamburger Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="w-11 h-11 flex items-center justify-center rounded-full text-[#143527] hover:bg-[#EFE6D2] transition-colors active:scale-95 cursor-pointer shrink-0"
            aria-label="Abrir menú de navegación"
          >
            <Menu className="w-6 h-6 stroke-[2.2]" />
          </button>

          {/* Centered Bigger Logo with #F6F0E4 matching background */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center justify-center py-0.5 cursor-pointer focus:outline-none"
            aria-label="Ir al inicio"
          >
            <PastasToGoLogo size="lg" />
          </button>

          {/* Cart Icon with badge */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative w-11 h-11 flex items-center justify-center rounded-full text-[#143527] hover:bg-[#EFE6D2] transition-colors active:scale-95 cursor-pointer shrink-0"
            aria-label="Ver carrito de compras"
          >
            <ShoppingCart className="w-6 h-6 stroke-[2.2]" />
            {totalItemCount > 0 && (
              <span className="absolute top-1 right-1 min-w-[20px] h-[20px] px-1 bg-[#E6392F] text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-sm animate-pulse">
                {totalItemCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Slide-out Navigation Drawer */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/45 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="relative w-4/5 max-w-xs bg-[#F6F0E4] h-full shadow-2xl flex flex-col z-10 border-r border-[#E8DFC8] animate-in slide-in-from-left duration-200">
            {/* Drawer Header */}
            <div className="p-4 bg-[#EDE5D3] border-b border-[#DDD2BE] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <PastasToGoLogo size="sm" />
                <div>
                  <h3 className="font-extrabold text-[#143527] text-base leading-tight">
                    {RESTAURANT_CONFIG.name}
                  </h3>
                  <p className="text-[11px] text-[#2E6B48] font-medium">
                    {RESTAURANT_CONFIG.slogan}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-[#DFD4BF] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-1">
              <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider px-2 py-1">
                Navegación
              </div>

              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-sm font-semibold text-[#143527] hover:bg-[#EFE6D2] transition-colors cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#FAB81E]" />
                Inicio
              </button>

              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  if (onNavigateToMenu) onNavigateToMenu();
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-sm font-semibold text-[#143527] hover:bg-[#EFE6D2] transition-colors cursor-pointer"
              >
                <Utensils className="w-4 h-4 text-[#2E6B48]" />
                Menú de Platos
              </button>

              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  if (onNavigateToBestSellers) onNavigateToBestSellers();
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-sm font-semibold text-[#143527] hover:bg-[#EFE6D2] transition-colors cursor-pointer"
              >
                <Award className="w-4 h-4 text-[#E6392F]" />
                Los Más Vendidos
              </button>

              <div className="pt-3 border-t border-[#E8DFC8] mt-3">
                <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider px-2 py-1">
                  Sedes & Horarios
                </div>
                {RESTAURANT_CONFIG.locations.map((loc, i) => (
                  <div key={i} className="px-3 py-2 text-xs">
                    <div className="font-bold text-[#143527] flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#2E6B48]" />
                      {loc.name}
                    </div>
                    <div className="text-gray-600 pl-5 text-[11px]">{loc.address}</div>
                    <div className="text-gray-500 pl-5 text-[10px] flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3" />
                      {loc.hours}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Drawer Footer with WhatsApp button */}
            <div className="p-4 border-t border-[#E8DFC8] bg-[#F6F0E4]">
              <a
                href={buildWhatsAppLink('¡Hola Pastas To Go! Quisiera consultar sobre el menú y hacer un pedido.')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold rounded-xl shadow-sm transition-transform active:scale-95"
              >
                <Phone className="w-4 h-4 fill-white" />
                Contactar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
