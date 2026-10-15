import React from 'react';
import { CheckCircle2, MessageCircle, RotateCcw, Clock, MapPin, ChefHat } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_CONFIG, buildWhatsAppLink } from '../config/restaurantConfig';

export const OrderConfirmationModal: React.FC = () => {
  const { confirmedOrder, setConfirmedOrder } = useCart();

  if (!confirmedOrder) return null;

  const handleClose = () => {
    setConfirmedOrder(null);
  };

  const whatsappMessage = `¡Hola Pastas To Go! Acabo de realizar el pedido ${confirmedOrder.orderNumber} por un total de $${confirmedOrder.total.toFixed(2)}. Quisiera confirmar recepción.`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={handleClose}
      />

      {/* Confirmation Card */}
      <div className="relative w-full max-w-md bg-[#F6F0E4] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] z-10 border border-[#E8DFC8] animate-in zoom-in-95 duration-200">
        {/* Top green celebration header */}
        <div className="p-6 bg-gradient-to-b from-[#1E4D34] to-[#143527] text-white text-center relative overflow-hidden">
          <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2 backdrop-blur-xs">
            <CheckCircle2 className="w-9 h-9 text-[#FAB81E]" />
          </div>

          <span className="inline-block bg-[#FAB81E] text-[#5C4200] font-black text-[11px] px-3 py-1 rounded-full uppercase tracking-wider mb-1.5 shadow-xs">
            Pedido Confirmado
          </span>

          <h2 className="text-2xl font-black tracking-tight">
            ¡Tu pasta está en marcha!
          </h2>

          <div className="mt-1 font-mono text-sm font-bold text-white/90 bg-white/10 px-3 py-1 rounded-lg inline-block">
            {confirmedOrder.orderNumber}
          </div>
        </div>

        {/* Scrollable Order Details */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Status info */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 bg-white rounded-xl border border-[#E8DFC8]">
              <div className="text-gray-500 text-[10px] uppercase font-bold flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#2E6B48]" />
                Tiempo Estimado
              </div>
              <div className="font-extrabold text-[#143527] mt-0.5">
                {confirmedOrder.estimatedMinutes}
              </div>
            </div>

            <div className="p-2.5 bg-white rounded-xl border border-[#E8DFC8]">
              <div className="text-gray-500 text-[10px] uppercase font-bold flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#E6392F]" />
                Modalidad
              </div>
              <div className="font-extrabold text-[#143527] capitalize mt-0.5">
                {confirmedOrder.modality === 'delivery'
                  ? 'Delivery'
                  : confirmedOrder.modality === 'pickup'
                  ? 'Retiro en Sede'
                  : 'Consumo en Local'}
              </div>
            </div>
          </div>

          {/* Customer info */}
          <div className="bg-white p-3 rounded-2xl border border-[#E8DFC8] text-xs space-y-1">
            <div className="font-bold text-[#143527] text-xs mb-1">
              Datos de Entrega
            </div>
            <div className="text-gray-600">
              <span className="font-semibold text-gray-800">Cliente:</span> {confirmedOrder.customerName}
            </div>
            <div className="text-gray-600">
              <span className="font-semibold text-gray-800">Teléfono:</span> {confirmedOrder.customerPhone}
            </div>
            {confirmedOrder.deliveryAddress && (
              <div className="text-gray-600">
                <span className="font-semibold text-gray-800">Dirección:</span> {confirmedOrder.deliveryAddress}
              </div>
            )}
            {confirmedOrder.tableNumber && (
              <div className="text-gray-600">
                <span className="font-semibold text-gray-800">Mesa:</span> {confirmedOrder.tableNumber}
              </div>
            )}
          </div>

          {/* Items Breakdown */}
          <div className="bg-white p-3 rounded-2xl border border-[#E8DFC8] text-xs space-y-2">
            <div className="font-bold text-[#143527] text-xs border-b border-gray-100 pb-1.5 flex justify-between">
              <span>Platos Solicitados</span>
              <span>Subtotal</span>
            </div>

            {confirmedOrder.items.map((item) => (
              <div key={item.cartItemId} className="space-y-0.5 pb-1 border-b border-gray-50 last:border-none">
                <div className="flex justify-between font-semibold text-gray-800">
                  <span>{item.quantity}x {item.item.name}</span>
                  <span>${item.totalPrice.toFixed(2)}</span>
                </div>
                <div className="text-[11px] text-[#2E6B48] flex items-center gap-1">
                  <ChefHat className="w-3 h-3" />
                  {item.pastaType.name}
                </div>
                {item.selectedExtras.length > 0 && (
                  <div className="text-[10px] text-gray-500 pl-4">
                    Extras: {item.selectedExtras.map(e => e.name).join(', ')}
                  </div>
                )}
                {item.notes && (
                  <div className="text-[10px] text-gray-400 italic pl-4">
                    Nota: "{item.notes}"
                  </div>
                )}
              </div>
            ))}

            <div className="pt-2 border-t border-gray-100 space-y-1">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal:</span>
                <span>${confirmedOrder.subtotal.toFixed(2)}</span>
              </div>
              {confirmedOrder.deliveryFee > 0 && (
                <div className="flex justify-between text-gray-500">
                  <span>Delivery:</span>
                  <span>${confirmedOrder.deliveryFee.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-extrabold text-[#143527] pt-1 border-t border-gray-100">
                <span>Total:</span>
                <span className="text-base text-[#E6392F]">${confirmedOrder.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-white border-t border-[#E8DFC8] space-y-2">
          <a
            href={buildWhatsAppLink(whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs rounded-full flex items-center justify-center gap-2 shadow-2xs active:scale-95 transition-transform"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            Notificar pedido por WhatsApp
          </a>

          <button
            onClick={handleClose}
            className="w-full py-2.5 px-4 bg-[#EFE6D2] hover:bg-[#E5DCCB] text-[#143527] font-bold text-xs rounded-full flex items-center justify-center gap-2 active:scale-95 transition-transform cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Realizar otro pedido
          </button>
        </div>
      </div>
    </div>
  );
};
