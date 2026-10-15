import React, { useState } from 'react';
import { Plus, Star } from 'lucide-react';
import { MenuItem } from '../types/restaurant';

interface MenuItemCardProps {
  item: MenuItem;
  onSelect: (item: MenuItem) => void;
  layout?: 'grid' | 'horizontal' | 'carousel';
}

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80';

export const MenuItemCard: React.FC<MenuItemCardProps> = ({
  item,
  onSelect,
  layout = 'grid',
}) => {
  const [imgSrc, setImgSrc] = useState(item.image);

  const handleImageError = () => {
    if (imgSrc !== FALLBACK_IMAGE) {
      setImgSrc(FALLBACK_IMAGE);
    }
  };

  if (layout === 'carousel') {
    return (
      <div
        onClick={() => onSelect(item)}
        className="w-[220px] sm:w-[235px] shrink-0 snap-start bg-white rounded-2xl overflow-hidden border border-[#E8DFC8] shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col group active:scale-[0.985]"
      >
        {/* Image container */}
        <div className="relative w-full aspect-[4/3] bg-[#EFE6D2] overflow-hidden">
          <img
            src={imgSrc}
            alt={item.name}
            onError={handleImageError}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          {item.badge && (
            <span className="absolute top-2 left-2 bg-[#FAB81E] text-[#5C4200] font-black text-[10px] px-2 py-0.5 rounded-full shadow-xs tracking-tight flex items-center gap-0.5">
              {item.badge}
            </span>
          )}
        </div>

        {/* Card content */}
        <div className="p-3 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-baseline justify-between gap-1 mb-1">
              <h4 className="font-extrabold text-[#143527] text-sm leading-tight truncate">
                {item.name}
              </h4>
              <span className="font-extrabold text-[#143527] text-sm shrink-0">
                ${item.price.toFixed(0)}
              </span>
            </div>

            <p className="text-[11px] text-[#5C665F] leading-tight line-clamp-2 mb-2">
              {item.description}
            </p>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(item);
            }}
            className="w-full py-1.5 px-3 bg-[#E6392F] hover:bg-[#D42B21] text-white font-bold text-xs rounded-full flex items-center justify-center gap-1.5 shadow-2xs active:scale-95 transition-transform cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            Añadir
          </button>
        </div>
      </div>
    );
  }

  if (layout === 'horizontal') {
    return (
      <div
        onClick={() => onSelect(item)}
        className="bg-white rounded-2xl p-3 border border-[#E8DFC8] shadow-xs hover:shadow-md transition-all cursor-pointer flex gap-3 group active:scale-[0.99]"
      >
        <div className="relative w-24 h-24 shrink-0 rounded-xl overflow-hidden bg-[#EFE6D2]">
          <img
            src={imgSrc}
            alt={item.name}
            onError={handleImageError}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          {item.badge && (
            <span className="absolute top-1 left-1 bg-[#FAB81E] text-[#614702] font-black text-[9px] px-1.5 py-0.5 rounded shadow-xs uppercase tracking-tight">
              {item.badge}
            </span>
          )}
        </div>

        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div>
            <div className="flex items-start justify-between gap-1">
              <h4 className="font-extrabold text-[#143527] text-sm leading-tight truncate">
                {item.name}
              </h4>
              <span className="font-extrabold text-[#143527] text-sm shrink-0">
                ${item.price.toFixed(0)}
              </span>
            </div>
            <p className="text-[11px] text-[#5C665F] line-clamp-2 mt-1 leading-snug">
              {item.description}
            </p>
          </div>

          <div className="flex items-center justify-between mt-2 pt-1">
            <span className="text-[10px] text-[#2E6B48] font-semibold bg-[#EBF5EF] px-2 py-0.5 rounded-full">
              Incluye pan & queso
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelect(item);
              }}
              className="inline-flex items-center gap-1 bg-[#E6392F] hover:bg-[#D42B21] text-white font-bold text-xs py-1 px-3 rounded-full shadow-xs active:scale-95 transition-transform cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
              Añadir
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Grid style (Matching the mockup)
  return (
    <div
      onClick={() => onSelect(item)}
      className="bg-white rounded-2xl overflow-hidden border border-[#E8DFC8] shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col group active:scale-[0.985]"
    >
      <div className="relative w-full aspect-[4/3] bg-[#EFE6D2] overflow-hidden">
        <img
          src={imgSrc}
          alt={item.name}
          onError={handleImageError}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {item.badge && (
          <span className="absolute top-2 left-2 bg-[#FAB81E] text-[#5C4200] font-black text-[10px] px-2 py-0.5 rounded-full shadow-xs tracking-tight">
            {item.badge}
          </span>
        )}
      </div>

      <div className="p-3 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-baseline justify-between gap-1 mb-1">
            <h4 className="font-bold text-[#143527] text-sm leading-tight">
              {item.name}
            </h4>
            <span className="font-extrabold text-[#143527] text-sm shrink-0">
              ${item.price.toFixed(0)}
            </span>
          </div>

          <p className="text-[11px] text-[#5C665F] leading-tight line-clamp-3 mb-3">
            {item.description}
          </p>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(item);
          }}
          className="w-full py-2 px-3 bg-[#E6392F] hover:bg-[#D42B21] text-white font-bold text-xs rounded-full flex items-center justify-center gap-1.5 shadow-xs active:scale-95 transition-transform cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          Añadir
        </button>
      </div>
    </div>
  );
};
