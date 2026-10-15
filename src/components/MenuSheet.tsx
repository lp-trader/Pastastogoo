import React, { useState } from 'react';
import { Utensils, Sparkles, Box, Coffee } from 'lucide-react';
import { MenuItem } from '../types/restaurant';
import { MenuItemCard } from './MenuItemCard';

interface MenuSheetProps {
  items: MenuItem[];
  onSelectItem: (item: MenuItem) => void;
}

type MenuCategoryFilter = 'todos' | 'clasicas' | 'especiales' | 'combos' | 'bebidas_postres';

export const MenuSheet: React.FC<MenuSheetProps> = ({
  items,
  onSelectItem,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<MenuCategoryFilter>('todos');

  const filterTabs: { id: MenuCategoryFilter; label: string; icon?: React.ReactNode }[] = [
    { id: 'todos', label: 'Todo el Menú' },
    { id: 'clasicas', label: 'Pastas Clásicas' },
    { id: 'especiales', label: 'Especialidades' },
    { id: 'combos', label: 'Combos' },
    { id: 'bebidas_postres', label: 'Bebidas & Postres' },
  ];

  const filteredItems = items.filter((item) => {
    if (selectedFilter === 'todos') return true;
    if (selectedFilter === 'clasicas') return item.category === 'favoritos';
    if (selectedFilter === 'especiales') return item.category === 'mas_vendidos';
    if (selectedFilter === 'combos') return item.category === 'combos';
    if (selectedFilter === 'bebidas_postres') return item.category === 'bebidas' || item.category === 'postres';
    return true;
  });

  return (
    <section id="menu" className="px-4 py-4 max-w-md mx-auto">
      {/* Menu Header (replacing "Nuestros favoritos") */}
      <div className="mb-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-[#143527] tracking-tight flex items-center gap-2">
              <Utensils className="w-5 h-5 text-[#2E6B48]" />
              Menú
            </h2>
            <div className="w-20 h-1 bg-[#FAB81E] rounded-full mt-1 opacity-90" />
          </div>
          <span className="text-[11px] font-bold text-[#2E6B48] bg-[#EBF5EF] px-2.5 py-1 rounded-full border border-[#D0EADB]">
            {filteredItems.length} platos disponibles
          </span>
        </div>

        <p className="text-xs text-[#5C665F] mt-1.5 leading-relaxed">
          Sabor tradicional italiano servido al momento. Todas las pastas incluyen queso y pan de la casa.
        </p>
      </div>

      {/* Filter Chips Bar */}
      <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-none -mx-1 px-1 mb-3">
        {filterTabs.map((tab) => {
          const isActive = selectedFilter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedFilter(tab.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#143527] text-white shadow-xs'
                  : 'bg-white text-[#5C665F] border border-[#E8DFC8] hover:bg-[#EFE6D2]'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 2-Column Menu Sheet Grid displaying multiple dishes in one view */}
      <div className="grid grid-cols-2 gap-3">
        {filteredItems.map((item) => (
          <MenuItemCard
            key={item.id}
            item={item}
            onSelect={onSelectItem}
            layout="grid"
          />
        ))}
      </div>
    </section>
  );
};
