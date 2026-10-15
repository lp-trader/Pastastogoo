import React from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, ChefHat } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeItem,
    clearCart,
    subtotal,
    deliveryFee,
    grandTotal,
    setIsCheckoutOpen,
    selectedModality,
    setSelectedModality,
  } = useCart();

  if (!isCartOpen) return null;

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-[#F6F0E4] h-full shadow-2xl flex flex-col z-10 border-l border-[#E8DFC8] animate-in slide-in-from-right duration-250">
        {/* Header */}
        <div className="p-4 bg-white border-b border-[#E8DFC8] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#EBF5EF] flex items-center justify-center text-[#2E6B48]">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-[#143527] text-base leading-tight">
                Tu Pedido
              </h3>
              <p className="text-[11px] text-[#5C665F]">
                {items.length} {items.length === 1 ? 'artículo' : 'artículos'} seleccionados
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <button
                onClick={clearCart}
                className="text-[11px] font-semibold text-gray-400 hover:text-[#E6392F] transition-colors px-2 py-1 cursor-pointer"
              >
                Vaciar
              </button>
            )}
            <button
              onClick={() => setIsCartOpen(false)}
              className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modality Selector quick pill bar */}
        <div className="p-3 bg-[#EDE5D3] border-b border-[#DDD2BE]">
          <div className="text-[11px] font-bold text-[#143527] mb-1.5 flex items-center gap-1">
            <span>Modalidad de entrega:</span>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { id: 'delivery', label: '🛵 Delivery' },
              { id: 'pickup', label: '🛍️ Retiro' },
              { id: 'dine_in', label: '🍽️ En Local' },
            ].map((m) => {
              const isSelected = selectedModality === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setSelectedModality(m.id as any)}
                  className={`py-1.5 px-2 rounded-xl text-xs font-bold transition-all text-center cursor-pointer ${
                    isSelected
                      ? 'bg-[#2E6B48] text-white shadow-xs'
                      : 'bg-white text-gray-700 border border-[#E8DFC8] hover:bg-white/80'
                  }`}
                >
                  {m.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-gray-400">
              <div className="w-16 h-16 rounded-full bg-[#EFE6D2] flex items-center justify-center mb-3 text-gray-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-[#143527] text-base mb-1">
                Tu bowl está vacío
              </h4>
              <p className="text-xs text-[#5C665F] max-w-xs mb-4">
                Explora nuestros favoritos tradicionales y personaliza tu pasta a tu gusto.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="py-2.5 px-5 bg-[#2E6B48] text-white font-bold text-xs rounded-full shadow-xs active:scale-95 transition-transform cursor-pointer"
              >
                Ver Menú
              </button>
            </div>
          ) : (
            items.map((cartItem) => (
              <div
                key={cartItem.cartItemId}
                className="bg-white rounded-2xl p-3 border border-[#E8DFC8] shadow-2xs space-y-2"
              >
                <div className="flex gap-3">
                  <img
                    src={cartItem.item.image}
                    alt={cartItem.item.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0 bg-[#EFE6D2]"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="font-extrabold text-[#143527] text-sm leading-tight truncate">
                        {cartItem.item.name}
                      </h4>
                      <span className="font-black text-[#143527] text-sm">
                        ${cartItem.totalPrice.toFixed(2)}
                      </span>
                    </div>

                    {cartItem.pastaType && (
                      <div className="text-[11px] text-[#2E6B48] font-semibold flex items-center gap-1 mt-0.5">
                        <ChefHat className="w-3 h-3" />
                        {cartItem.pastaType.name}
                        {cartItem.pastaType.extraPrice > 0 && ` (+$${cartItem.pastaType.extraPrice})`}
                      </div>
                    )}

                    <div className="text-[10px] text-gray-500">
                      Base: ${cartItem.item.price.toFixed(2)}
                    </div>
                  </div>
                </div>

                {cartItem.selectedExtras.length > 0 && (
                  <div className="pl-2 border-l-2 border-[#FAB81E] space-y-0.5 text-[11px] bg-[#FFFBF2] p-1.5 rounded-r-lg">
                    <div className="font-bold text-[#8C6500] text-[10px] uppercase">
                      Extras:
                    </div>
                    {cartItem.selectedExtras.map((extra) => (
                      <div key={extra.id} className="flex justify-between text-gray-700">
                        <span>+ {extra.name}</span>
                        <span className="font-semibold">+${extra.price.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                )}

                {cartItem.notes && (
                  <div className="text-[11px] text-gray-600 italic bg-gray-50 p-1.5 rounded-lg border border-gray-100">
                    "{cartItem.notes}"
                  </div>
                )}

                <div className="flex items-center justify-between pt-1 border-t border-gray-100">
                  <button
                    onClick={() => removeItem(cartItem.cartItemId)}
                    className="text-gray-400 hover:text-[#E6392F] p-1 rounded-lg transition-colors cursor-pointer"
                    aria-label="Eliminar plato"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-2 bg-[#EFE6D2] rounded-full px-2 py-0.5">
                    <button
                      onClick={() => updateQuantity(cartItem.cartItemId, cartItem.quantity - 1)}
                      className="w-6 h-6 rounded-full flex items-center justify-center text-[#143527] hover:bg-[#E2D6C0] font-bold cursor-pointer"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-5 text-center text-xs font-bold text-[#143527]">
                      {cartItem.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(cartItem.cartItemId, cartItem.quantity + 1)}
                      className="w-6 h-6 rounded-full flex items-center justify-center text-[#143527] hover:bg-[#E2D6C0] font-bold cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Checkout CTA */}
        {items.length > 0 && (
          <div className="p-4 bg-white border-t border-[#E8DFC8] space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-[#5C665F]">
                <span>Subtotal platos & extras:</span>
                <span className="font-bold text-[#143527]">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#5C665F]">
                <span>
                  {selectedModality === 'delivery'
                    ? 'Tarifa estimada delivery:'
                    : selectedModality === 'pickup'
                    ? 'Retiro en restaurante:'
                    : 'Consumo en restaurante:'}
                </span>
                <span className="font-bold text-[#143527]">
                  {deliveryFee > 0 ? `$${deliveryFee.toFixed(2)}` : 'Gratis'}
                </span>
              </div>
              <div className="flex justify-between text-[#5C665F]">
                <span>Empaque térmico to-go:</span>
                <span className="font-bold text-[#2E6B48]">Incluido</span>
              </div>
              <div className="pt-2 border-t border-gray-100 flex justify-between items-baseline">
                <span className="font-extrabold text-sm text-[#143527]">Total a Pagar:</span>
                <span className="text-xl font-black text-[#143527]">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleProceedToCheckout}
              className="w-full py-3 px-4 bg-[#E6392F] hover:bg-[#D42B21] text-white font-extrabold text-sm rounded-full flex items-center justify-center gap-2 shadow-md active:scale-95 transition-transform cursor-pointer"
            >
              <span>Continuar con el Pedido</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
