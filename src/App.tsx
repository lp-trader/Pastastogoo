import React, { useState } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PlatosMasVendidos } from './components/PlatosMasVendidos';
import { MenuSheet } from './components/MenuSheet';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { BottomNavigation } from './components/BottomNavigation';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { MENU_ITEMS } from './data/menuData';
import { MenuItem } from './types/restaurant';
import { RESTAURANT_CONFIG } from './config/restaurantConfig';
import { Smartphone, Monitor, MapPin, Instagram } from 'lucide-react';
import { PastasToGoLogo } from './components/PastasToGoLogo';

function MainAppContent() {
  const { activeItemModal, setActiveItemModal } = useCart();
  const [currentTab, setCurrentTab] = useState<'inicio' | 'menu' | 'pedido'>('inicio');
  const [isPhoneFrame, setIsPhoneFrame] = useState(false);

  const handleSelectItem = (item: MenuItem) => {
    setActiveItemModal(item);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className={`min-h-screen bg-[#ECE4D0] flex flex-col items-center justify-start ${isPhoneFrame ? 'py-4 sm:py-8' : ''}`}>
      {/* Top Bar for Desktop Previewer (Toggle Mobile Frame mode) */}
      <div className="w-full max-w-md mx-auto px-4 py-1.5 flex items-center justify-between text-xs text-[#5C665F] hidden sm:flex">
        <span className="font-semibold flex items-center gap-1.5 text-[#143527]">
          <span className="w-2 h-2 rounded-full bg-[#2E6B48]"></span>
          Pastas To Go • Pedidos en Línea
        </span>
        <button
          onClick={() => setIsPhoneFrame(!isPhoneFrame)}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-[#E8DFC8] shadow-2xs hover:bg-[#F6F0E4] text-[#143527] font-bold cursor-pointer transition-all text-[11px]"
        >
          {isPhoneFrame ? (
            <>
              <Monitor className="w-3.5 h-3.5" />
              <span>Expandir ancho</span>
            </>
          ) : (
            <>
              <Smartphone className="w-3.5 h-3.5" />
              <span>Marco iPhone</span>
            </>
          )}
        </button>
      </div>

      {/* Main App Container */}
      <div
        className={`w-full max-w-md bg-[#F6F0E4] text-[#1F2A23] min-h-screen relative flex flex-col pb-24 ${
          isPhoneFrame
            ? 'rounded-[44px] shadow-2xl border-[8px] border-[#2C332D] overflow-hidden my-auto ring-1 ring-black/10'
            : 'shadow-lg border-x border-[#E8DFC8]'
        }`}
      >
        {/* Dynamic Island in Phone Frame Mode */}
        {isPhoneFrame && (
          <div className="w-full pt-2 flex justify-center bg-[#F6F0E4]">
            <div className="w-24 h-4 bg-[#143527] rounded-full shadow-inner flex items-center justify-end px-2">
              <span className="w-2 h-2 rounded-full bg-[#1E4D34]" />
            </div>
          </div>
        )}

        {/* 1. Header with prominent larger brand logo & cart badge */}
        <Header
          onNavigateToMenu={() => scrollToSection('menu')}
          onNavigateToBestSellers={() => scrollToSection('mas-vendidos')}
        />

        {/* 2. Hero Section with basil, penne & slogan */}
        <Hero />

        {/* 3. Platos Más Vendidos (Carrusel Horizontal) */}
        <PlatosMasVendidos
          items={MENU_ITEMS}
          onSelectItem={handleSelectItem}
        />

        {/* 4. Menú Principal (Hoja de platos que sustituye a "Nuestros Favoritos") */}
        <MenuSheet
          items={MENU_ITEMS}
          onSelectItem={handleSelectItem}
        />

        {/* 5. Footer / Brand Information */}
        <footer className="mt-8 px-6 pt-6 pb-12 border-t border-[#E8DFC8] bg-[#EDE5D3]/60 text-center">
          <div className="flex flex-col items-center">
            <PastasToGoLogo size="sm" />
            <h4 className="font-extrabold text-[#143527] text-sm mt-1.5">
              {RESTAURANT_CONFIG.name}
            </h4>
            <p className="text-xs text-[#2E6B48] font-medium font-script text-base">
              "{RESTAURANT_CONFIG.slogan}"
            </p>
            <p className="text-[11px] text-gray-600 mt-2 max-w-xs leading-relaxed">
              Barquisimeto & Cabudare, Edo. Lara, Venezuela.
              <br />
              Servicio de Delivery directo & Take Out.
            </p>

            <div className="mt-3 flex items-center justify-center gap-3 text-xs text-[#2E6B48]">
              <span className="flex items-center gap-1 font-semibold">
                <MapPin className="w-3.5 h-3.5 text-[#E6392F]" />
                2 Sedes Activas
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 font-semibold">
                <Instagram className="w-3.5 h-3.5 text-[#E6392F]" />
                {RESTAURANT_CONFIG.contact.instagram}
              </span>
            </div>
          </div>
        </footer>

        {/* 6. Fixed Bottom Navigation Bar */}
        <BottomNavigation
          currentTab={currentTab}
          onSelectTab={setCurrentTab}
        />

        {/* 7. Floating WhatsApp Button */}
        <WhatsAppFloatingButton />

        {/* Modals & Drawers */}
        <ProductDetailModal
          item={activeItemModal}
          onClose={() => setActiveItemModal(null)}
        />

        <CartDrawer />

        <CheckoutModal />

        <OrderConfirmationModal />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <MainAppContent />
    </CartProvider>
  );
}
