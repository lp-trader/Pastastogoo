import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, Check, Sparkles, ChefHat, MessageSquare } from 'lucide-react';
import { ExtraOption, MenuItem, PastaOption } from '../types/restaurant';
import { DEFAULT_EXTRAS, DEFAULT_PASTA_TYPES } from '../data/menuData';
import { useCart } from '../context/CartContext';

interface ProductDetailModalProps {
  item: MenuItem | null;
  onClose: () => void;
}

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80';

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  item,
  onClose,
}) => {
  const { addItem, setIsCartOpen } = useCart();

  const [selectedPasta, setSelectedPasta] = useState<PastaOption>(DEFAULT_PASTA_TYPES[0]);
  const [selectedExtras, setSelectedExtras] = useState<ExtraOption[]>([]);
  const [quantity, setQuantity] = useState<number>(1);
  const [notes, setNotes] = useState<string>('');
  const [modalImg, setModalImg] = useState<string>('');

  useEffect(() => {
    if (item) {
      setSelectedPasta(DEFAULT_PASTA_TYPES[0]);
      setSelectedExtras([]);
      setQuantity(1);
      setNotes('');
      setModalImg(item.image);
    }
  }, [item]);

  if (!item) return null;

  const isPastaDish = item.category !== 'bebidas' && item.category !== 'postres';
  const availablePastas = item.availablePastas || DEFAULT_PASTA_TYPES;
  const availableExtras = item.availableExtras || DEFAULT_EXTRAS;

  const toggleExtra = (extra: ExtraOption) => {
    setSelectedExtras((prev) => {
      const exists = prev.some((e) => e.id === extra.id);
      if (exists) {
        return prev.filter((e) => e.id !== extra.id);
      } else {
        return [...prev, extra];
      }
    });
  };

  const extrasTotal = selectedExtras.reduce((sum, extra) => sum + extra.price, 0);
  const pastaExtra = isPastaDish ? selectedPasta.extraPrice : 0;
  const unitPrice = item.price + pastaExtra + extrasTotal;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    addItem(item, selectedPasta, selectedExtras, notes, quantity);
    onClose();
    setIsCartOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-md bg-[#F6F0E4] rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] z-10 border border-[#E8DFC8] animate-in slide-in-from-bottom duration-250">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/40 text-white hover:bg-black/60 flex items-center justify-center backdrop-blur-sm transition-transform active:scale-95 cursor-pointer"
          aria-label="Cerrar personalizador"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Image */}
        <div className="relative w-full h-52 sm:h-56 bg-[#EFE6D2] shrink-0">
          <img
            src={modalImg}
            alt={item.name}
            onError={() => setModalImg(FALLBACK_IMAGE)}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-3 left-4 right-4 text-white">
            {item.badge && (
              <span className="inline-block bg-[#FAB81E] text-[#5C4200] font-black text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider mb-1">
                {item.badge}
              </span>
            )}
            <div className="flex items-baseline justify-between">
              <h2 className="text-xl sm:text-2xl font-black drop-shadow-sm leading-tight">
                {item.name}
              </h2>
              <span className="text-xl sm:text-2xl font-black text-[#FAB81E]">
                ${item.price.toFixed(0)}
              </span>
            </div>
          </div>
        </div>

        {/* Scrollable Customization Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5">
          {/* Description & Included highlights */}
          <div>
            <p className="text-xs sm:text-sm text-[#3E4741] leading-relaxed">
              {item.description}
            </p>
            {item.includesBreadAndCheese && (
              <div className="mt-2 flex items-center gap-2 p-2 rounded-xl bg-[#EBF5EF] border border-[#CDE5D7] text-xs text-[#1F4532]">
                <Sparkles className="w-4 h-4 text-[#2E6B48] shrink-0" />
                <span className="font-semibold">
                  Todas las pastas tradicionales incluyen pan de la casa y queso rallado.
                </span>
              </div>
            )}
          </div>

          {/* STEP 1: Pasta Type Selection (if pasta) */}
          {isPastaDish && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black uppercase tracking-wider text-[#143527] flex items-center gap-1.5">
                  <ChefHat className="w-4 h-4 text-[#2E6B48]" />
                  1. Elige tu tipo de pasta
                </label>
                <span className="text-[11px] text-[#2E6B48] font-bold">Requerido</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {availablePastas.map((pasta) => {
                  const isSelected = selectedPasta.id === pasta.id;
                  return (
                    <button
                      key={pasta.id}
                      type="button"
                      onClick={() => setSelectedPasta(pasta)}
                      className={`p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                        isSelected
                          ? 'border-[#2E6B48] bg-[#EBF5EF] shadow-2xs ring-1 ring-[#2E6B48]'
                          : 'border-[#E8DFC8] bg-white hover:bg-[#FAF8F5]'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className={`text-xs font-bold ${isSelected ? 'text-[#143527]' : 'text-gray-800'}`}>
                          {pasta.name}
                        </span>
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center ${
                            isSelected ? 'bg-[#2E6B48] text-white' : 'border border-gray-300'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </div>
                      {pasta.extraPrice > 0 ? (
                        <span className="text-[11px] font-bold text-[#E6392F] mt-1">
                          +${pasta.extraPrice.toFixed(2)}
                        </span>
                      ) : (
                        <span className="text-[10px] text-gray-500 mt-1">Incluido</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: Extras / Toppings Selection */}
          {isPastaDish && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black uppercase tracking-wider text-[#143527]">
                  2. ¿Deseas agregar extras?
                </label>
                <span className="text-[11px] text-gray-500">Opcional</span>
              </div>

              <div className="space-y-1.5">
                {availableExtras.map((extra) => {
                  const isSelected = selectedExtras.some((e) => e.id === extra.id);
                  return (
                    <button
                      key={extra.id}
                      type="button"
                      onClick={() => toggleExtra(extra)}
                      className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#FAB81E] bg-[#FFF9E6] ring-1 ring-[#FAB81E]'
                          : 'border-[#E8DFC8] bg-white hover:bg-[#FAF8F5]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-4 h-4 rounded-md flex items-center justify-center ${
                            isSelected
                              ? 'bg-[#FAB81E] text-white'
                              : 'border border-gray-300 bg-white'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 stroke-[3] text-[#5C4200]" />}
                        </div>
                        <span className={`text-xs font-semibold ${isSelected ? 'text-[#5C4200]' : 'text-gray-800'}`}>
                          {extra.name}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-[#E6392F]">
                        +${extra.price.toFixed(2)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: Kitchen notes */}
          <div className="space-y-1.5">
            <label className="text-xs font-black uppercase tracking-wider text-[#143527] flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-gray-500" />
              Observaciones para la cocina
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ej: salsa bien caliente, queso aparte..."
              className="w-full text-xs p-2.5 bg-white border border-[#E8DFC8] rounded-xl focus:outline-none focus:border-[#2E6B48] placeholder-gray-400"
              maxLength={120}
            />
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center justify-between p-3 bg-white rounded-2xl border border-[#E8DFC8]">
            <span className="text-xs font-bold text-[#143527]">Cantidad de bowls</span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-8 h-8 rounded-full bg-[#EFE6D2] text-[#143527] flex items-center justify-center hover:bg-[#E5DCCB] active:scale-95 transition-all font-bold cursor-pointer"
                disabled={quantity <= 1}
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-6 text-center font-extrabold text-sm text-[#143527]">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="w-8 h-8 rounded-full bg-[#EFE6D2] text-[#143527] flex items-center justify-center hover:bg-[#E5DCCB] active:scale-95 transition-all font-bold cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Sticky Bottom Actions Bar */}
        <div className="p-4 bg-white border-t border-[#E8DFC8] flex items-center gap-3">
          <div className="min-w-[80px]">
            <div className="text-[10px] text-gray-500 uppercase font-bold">Total</div>
            <div className="text-lg font-black text-[#143527]">
              ${totalPrice.toFixed(2)}
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            className="flex-1 py-3 px-4 bg-[#E6392F] hover:bg-[#D42B21] text-white font-extrabold text-sm rounded-full flex items-center justify-center gap-2 shadow-md active:scale-95 transition-transform cursor-pointer"
          >
            <span>Añadir al carrito</span>
            <span className="bg-black/20 px-2 py-0.5 rounded-full text-xs font-bold">
              ${totalPrice.toFixed(2)}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
