import React from 'react';
import { Sparkles, MapPin } from 'lucide-react';
import { RESTAURANT_CONFIG } from '../config/restaurantConfig';

export const Hero: React.FC = () => {
  return (
    <section className="relative px-4 pt-3 pb-2 text-center overflow-hidden">
      {/* Decorative Basil Leaf (Left side, matching reference mockup) */}
      <div 
        className="absolute -left-2 top-0 w-16 h-16 pointer-events-none select-none opacity-90 transition-transform hover:scale-105"
        aria-hidden="true"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
          {/* Main basil leaf */}
          <path
            d="M 10 50 C 15 20, 50 15, 85 25 C 90 60, 60 85, 30 80 C 18 78, 12 65, 10 50 Z"
            fill="#3B7D23"
          />
          {/* Leaf vein */}
          <path
            d="M 12 52 Q 45 48 85 25"
            stroke="#265913"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 35 50 Q 48 36 60 30"
            stroke="#265913"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 45 52 Q 55 64 68 70"
            stroke="#265913"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Secondary smaller leaf */}
          <path
            d="M 5 65 C 10 45, 35 45, 55 55 C 55 75, 35 88, 18 85 Z"
            fill="#4F9D31"
            opacity="0.9"
          />
          {/* Dew drop */}
          <circle cx="55" cy="40" r="3" fill="#FFFFFF" opacity="0.6" />
        </svg>
      </div>

      {/* Decorative Penne Pasta (Right side, matching reference mockup) */}
      <div 
        className="absolute -right-1 top-1 w-16 h-16 pointer-events-none select-none opacity-90 transition-transform hover:scale-105"
        aria-hidden="true"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
          {/* Penne noodle 1 */}
          <g transform="translate(45, 10) rotate(35)">
            <path
              d="M 5 0 L 25 15 L 20 60 L 0 45 Z"
              fill="#E5A110"
            />
            <path
              d="M 5 0 L 25 15 L 20 22 L 0 7 Z"
              fill="#F7C442"
            />
            {/* Ridges */}
            <line x1="4" y1="12" x2="21" y2="25" stroke="#C78704" strokeWidth="1.5" />
            <line x1="4" y1="22" x2="21" y2="35" stroke="#C78704" strokeWidth="1.5" />
            <line x1="4" y1="32" x2="21" y2="45" stroke="#C78704" strokeWidth="1.5" />
          </g>
          {/* Penne noodle 2 (smaller angle) */}
          <g transform="translate(20, 40) rotate(55)">
            <path
              d="M 4 0 L 20 12 L 16 48 L 0 36 Z"
              fill="#E5A110"
            />
            <line x1="3" y1="10" x2="17" y2="20" stroke="#C78704" strokeWidth="1.2" />
            <line x1="3" y1="18" x2="17" y2="28" stroke="#C78704" strokeWidth="1.2" />
          </g>
        </svg>
      </div>

      <div className="max-w-md mx-auto">
        {/* Main Slogan with golden sun sparks */}
        <div className="flex items-center justify-center gap-2 mb-1">
          {/* Left rays */}
          <div className="flex items-center space-x-0.5 text-[#FAB81E]" aria-hidden="true">
            <span className="inline-block w-3.5 h-0.5 bg-[#FAB81E] rounded-full"></span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#FAB81E]"></span>
          </div>

          <h1 className="font-script text-3xl sm:text-4xl font-bold text-[#143527] tracking-wide drop-shadow-2xs">
            {RESTAURANT_CONFIG.slogan}
          </h1>

          {/* Right rays */}
          <div className="flex items-center space-x-0.5 text-[#FAB81E]" aria-hidden="true">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#FAB81E]"></span>
            <span className="inline-block w-3.5 h-0.5 bg-[#FAB81E] rounded-full"></span>
          </div>
        </div>

        {/* Subtitle */}
        <p className="text-sm font-semibold text-[#2E6B48] max-w-xs mx-auto leading-relaxed">
          {RESTAURANT_CONFIG.subtitle}
        </p>

        {/* Badges / Location Bar */}
        <div className="mt-3 flex items-center justify-center flex-wrap gap-2 text-xs">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F3EDE2] text-[#143527] font-medium border border-[#E5DCB]">
            <MapPin className="w-3.5 h-3.5 text-[#E6392F]" />
            Barquisimeto & Cabudare
          </span>

          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#EBF5EF] text-[#2E6B48] font-bold border border-[#D0EADB]">
            <Sparkles className="w-3.5 h-3.5 text-[#2E6B48]" />
            Pan & queso incluidos
          </span>
        </div>
      </div>
    </section>
  );
};
