import React from 'react';
import { Home, Utensils, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface BottomNavigationProps {
  currentTab: 'inicio' | 'menu' | 'pedido';
  onSelectTab: (tab: 'inicio' | 'menu' | 'pedido') => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  currentTab,
  onSelectTab,
}) => {
  const { totalItemCount, setIsCartOpen } = useCart();

  const handleTabClick = (tab: 'inicio' | 'menu' | 'pedido') => {
    onSelectTab(tab);
    if (tab === 'pedido') {
      setIsCartOpen(true);
    } else if (tab === 'inicio') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (tab === 'menu') {
      const el = document.getElementById('menu');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#F6F0E4]/95 backdrop-blur-md border-t border-[#E8DFC8] py-2 px-6">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {/* Inicio */}
        <button
          onClick={() => handleTabClick('inicio')}
          className="flex flex-col items-center justify-center py-1 px-3 text-[#143527] relative transition-transform active:scale-95 cursor-pointer"
        >
          <Home
            className={`w-6 h-6 stroke-[2.2] transition-colors ${
              currentTab === 'inicio' ? 'text-[#143527]' : 'text-gray-400'
            }`}
          />
          <span
            className={`text-[11px] font-bold mt-1 transition-colors ${
              currentTab === 'inicio' ? 'text-[#143527]' : 'text-gray-400'
            }`}
          >
            Inicio
          </span>
          {currentTab === 'inicio' && (
            <span className="w-8 h-1 bg-[#143527] rounded-full mt-0.5" />
          )}
        </button>

        {/* Menú */}
        <button
          onClick={() => handleTabClick('menu')}
          className="flex flex-col items-center justify-center py-1 px-3 text-[#143527] relative transition-transform active:scale-95 cursor-pointer"
        >
          <Utensils
            className={`w-6 h-6 stroke-[2.2] transition-colors ${
              currentTab === 'menu' ? 'text-[#143527]' : 'text-gray-400'
            }`}
          />
          <span
            className={`text-[11px] font-bold mt-1 transition-colors ${
              currentTab === 'menu' ? 'text-[#143527]' : 'text-gray-400'
            }`}
          >
            Menú
          </span>
          {currentTab === 'menu' && (
            <span className="w-8 h-1 bg-[#143527] rounded-full mt-0.5" />
          )}
        </button>

        {/* Pedido */}
        <button
          onClick={() => handleTabClick('pedido')}
          className="flex flex-col items-center justify-center py-1 px-3 text-[#143527] relative transition-transform active:scale-95 cursor-pointer"
        >
          <div className="relative">
            <ShoppingBag
              className={`w-6 h-6 stroke-[2.2] transition-colors ${
                currentTab === 'pedido' ? 'text-[#143527]' : 'text-gray-400'
              }`}
            />
            {totalItemCount > 0 && (
              <span className="absolute -top-1 -right-2 min-w-[17px] h-[17px] bg-[#E6392F] text-white text-[10px] font-bold rounded-full flex items-center justify-center px-0.5">
                {totalItemCount}
              </span>
            )}
          </div>
          <span
            className={`text-[11px] font-bold mt-1 transition-colors ${
              currentTab === 'pedido' ? 'text-[#143527]' : 'text-gray-400'
            }`}
          >
            Pedido
          </span>
          {currentTab === 'pedido' && (
            <span className="w-8 h-1 bg-[#143527] rounded-full mt-0.5" />
          )}
        </button>
      </div>
    </nav>
  );
};
