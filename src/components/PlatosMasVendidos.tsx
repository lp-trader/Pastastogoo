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
  const [activeIndex, setActiveIndex] = React.useState(0);
  const bestSellers = items.filter((item) => item.isBestSeller || item.category === 'mas_vendidos');

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      const cardStep = 162; // approximate card width (152px) + gap (10px)
      const newIndex = Math.round(scrollLeft / cardStep);
      setActiveIndex(Math.min(Math.max(newIndex, 0), bestSellers.length - 1));
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -165 : 165;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      const cardStep = 162;
      scrollRef.current.scrollTo({ left: index * cardStep, behavior: 'smooth' });
      setActiveIndex(index);
    }
  };

  return (
    <section id="mas-vendidos" className="px-4 py-4 max-w-md mx-auto">
      {/* Section Header with Carousel Navigation */}
      <div className="flex items-end justify-between mb-2.5">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#E6392F] uppercase tracking-wider mb-0.5">
            <Flame className="w-3.5 h-3.5 fill-[#E6392F]" />
            Los preferidos de la casa
          </div>
          <h2 className="text-xl font-extrabold text-[#143527] tracking-tight">
            Platos más vendidos
          </h2>
          <div className="w-24 h-1 bg-[#E6392F] rounded-full mt-1 opacity-90" />
        </div>

        {/* Carousel Arrow Controls & Indicator */}
        <div className="flex items-center gap-1.5 pb-0.5">
          <button
            onClick={() => scroll('left')}
            className="w-7 h-7 rounded-full bg-white border border-[#E8DFC8] flex items-center justify-center text-[#143527] hover:bg-[#EFE6D2] active:scale-95 transition-all shadow-2xs cursor-pointer disabled:opacity-40"
            aria-label="Desplazar a la izquierda"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-7 h-7 rounded-full bg-white border border-[#E8DFC8] flex items-center justify-center text-[#143527] hover:bg-[#EFE6D2] active:scale-95 transition-all shadow-2xs cursor-pointer disabled:opacity-40"
            aria-label="Desplazar a la derecha"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Carousel Container */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-2.5 overflow-x-auto scrollbar-none snap-x snap-mandatory pt-1 pb-2.5 -mx-4 px-4 scroll-smooth"
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

      {/* Carousel Pagination Dots & Peek Indicator */}
      <div className="flex items-center justify-between px-1 mt-1">
        <span className="text-[10px] font-medium text-[#5C665F] tracking-tight">
          Desliza para ver más ({bestSellers.length} platos)
        </span>
        <div className="flex items-center gap-1">
          {bestSellers.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                activeIndex === idx
                  ? 'w-4 bg-[#E6392F]'
                  : 'w-1.5 bg-[#E8DFC8] hover:bg-[#C8BA9F]'
              }`}
              aria-label={`Ver plato ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
