import React, { useRef } from 'react';
import { Flame, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { MenuItem } from '../types/restaurant';
import { MenuItemCard } from './MenuItemCard';

interface PlatosMasVendidosProps {
  items: MenuItem[];
  onSelectItem: (item: MenuItem) => void;
}

export const PlatosMasVendidos: React.FC<PlatosMasVendidosProps> = ({
  items,
  onSelectItem,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const bestSellers = items.filter((item) => item.isBestSeller || item.category === 'mas_vendidos');

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -240 : 240;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="mas-vendidos" className="px-4 py-4 max-w-md mx-auto">
      {/* Section Header with Carousel Navigation */}
      <div className="flex items-end justify-between mb-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#E6392F] uppercase tracking-wider mb-0.5">
            <Flame className="w-3.5 h-3.5 fill-[#E6392F]" />
            Los preferidos de la casa
          </div>
          <h2 className="text-xl font-extrabold text-[#143527] tracking-tight">
            Platos más vendidos
          </h2>
          <div className="w-28 h-1 bg-[#E6392F] rounded-full mt-1.5 opacity-90" />
        </div>

        {/* Carousel Arrow Controls */}
        <div className="flex items-center gap-1.5 pb-0.5">
          <button
            onClick={() => scroll('left')}
            className="w-7 h-7 rounded-full bg-white border border-[#E8DFC8] flex items-center justify-center text-[#143527] hover:bg-[#EFE6D2] active:scale-95 transition-all shadow-2xs cursor-pointer"
            aria-label="Desplazar a la izquierda"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-7 h-7 rounded-full bg-white border border-[#E8DFC8] flex items-center justify-center text-[#143527] hover:bg-[#EFE6D2] active:scale-95 transition-all shadow-2xs cursor-pointer"
            aria-label="Desplazar a la derecha"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Carousel Container */}
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scrollbar-none snap-x snap-mandatory pb-2 -mx-4 px-4 scroll-smooth"
      >
        {bestSellers.map((item) => (
          <MenuItemCard
            key={`bestseller_${item.id}`}
            item={item}
            onSelect={onSelectItem}
            layout="carousel"
          />
        ))}
      </div>
    </section>
  );
};
