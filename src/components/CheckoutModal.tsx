import React, { useState } from 'react';
import { X, MessageCircle, ArrowRight, MapPin, User, Phone, Check, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { DeliveryModality, OrderSimulation, PaymentMethod } from '../types/restaurant';
import { RESTAURANT_CONFIG, buildWhatsAppLink } from '../config/restaurantConfig';

export const CheckoutModal: React.FC = () => {
  const {
    items,
    isCheckoutOpen,
    setIsCheckoutOpen,
    subtotal,
    deliveryFee,
    grandTotal,
    selectedModality,
    setSelectedModality,
    setConfirmedOrder,
    clearCart,
  } = useCart();

  const [customerName, setCustomerName] = useState('Carlos Mendoza');
  const [customerPhone, setCustomerPhone] = useState('0414-555-8899');
  const [deliveryAddress, setDeliveryAddress] = useState('Urb. Nueva Segovia, Carrera 1 con Calle 2, Barquisimeto');
  const [tableNumber, setTableNumber] = useState('Mesa 4');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('pago_movil');
  const [notes, setNotes] = useState('Tocar el timbre al llegar, gracias.');

  if (!isCheckoutOpen) return null;

  // Format message for WhatsApp
  const generateWhatsAppOrderText = (): string => {
    const modalityLabels: Record<DeliveryModality, string> = {
      delivery: '🛵 Delivery a Domicilio',
      pickup: '🛍️ Para Retirar en Sede',
      dine_in: '🍽️ Consumo en Mesa',
    };

    const itemsSummary = items
      .map((item, idx) => {
        const extrasList = item.selectedExtras.length > 0 
          ? ` (${item.selectedExtras.map(e => e.name).join(', ')})`
          : '';
        return `${idx + 1}. *${item.quantity}x ${item.item.name}* [${item.pastaType.name}]${extrasList} - $${item.totalPrice.toFixed(2)}`;
      })
      .join('\n');

    return `🍝 *NUEVO PEDIDO - PASTAS TO GO*\n\n` +
      `👤 *Cliente:* ${customerName}\n` +
      `📞 *Teléfono:* ${customerPhone}\n` +
      `📍 *Modalidad:* ${modalityLabels[selectedModality]}\n` +
      (selectedModality === 'delivery' ? `🏠 *Dirección:* ${deliveryAddress}\n` : '') +
      (selectedModality === 'dine_in' ? `🪑 *Mesa:* ${tableNumber}\n` : '') +
      `💳 *Forma de Pago:* ${paymentMethod.toUpperCase().replace('_', ' ')}\n\n` +
      `📦 *DETALLE DE PLATOS:*\n${itemsSummary}\n\n` +
      `💵 *TOTAL: $${grandTotal.toFixed(2)}*`;
  };

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();

    const orderNumber = `#PTG-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: OrderSimulation = {
      orderNumber,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      customerName,
      customerPhone,
      modality: selectedModality,
      deliveryAddress: selectedModality === 'delivery' ? deliveryAddress : undefined,
      tableNumber: selectedModality === 'dine_in' ? tableNumber : undefined,
      paymentMethod,
      items: [...items],
      subtotal,
      deliveryFee,
      total: grandTotal,
      notes,
      estimatedMinutes: selectedModality === 'delivery' ? '25 - 35 min' : '15 - 20 min',
    };

    setConfirmedOrder(newOrder);
    clearCart();
    setIsCheckoutOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCheckoutOpen(false)}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-md bg-[#F6F0E4] rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[92vh] z-10 border border-[#E8DFC8] animate-in slide-in-from-bottom duration-250">
        {/* Header */}
        <div className="p-4 bg-white border-b border-[#E8DFC8] flex items-center justify-between">
          <div>
            <h3 className="text-base font-black text-[#143527]">
              Finalizar Pedido
            </h3>
            <p className="text-[11px] text-gray-500">
              Completa los datos para procesar tu orden
            </p>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleConfirmOrder} className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* 1. Modalidad Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-black uppercase tracking-wider text-[#143527]">
              1. Modalidad de entrega
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'delivery', label: 'Delivery', desc: 'Barquisimeto / Cabudare' },
                { id: 'pickup', label: 'Para Retirar', desc: 'En sede' },
                { id: 'dine_in', label: 'En el Local', desc: 'Consumo en mesa' },
              ].map((m) => {
                const isSelected = selectedModality === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setSelectedModality(m.id as any)}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#2E6B48] bg-[#EBF5EF] shadow-2xs ring-1 ring-[#2E6B48]'
                        : 'border-[#E8DFC8] bg-white hover:bg-[#FAF8F5]'
                    }`}
                  >
                    <div className="text-xs font-bold text-[#143527]">{m.label}</div>
                    <div className="text-[10px] text-gray-500 leading-tight mt-0.5">{m.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Customer Information */}
          <div className="space-y-3 bg-white p-3.5 rounded-2xl border border-[#E8DFC8]">
            <label className="text-xs font-black uppercase tracking-wider text-[#143527] flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#2E6B48]" />
              2. Datos del Cliente
            </label>

            <div>
              <label className="text-[11px] font-bold text-gray-700 block mb-1">
                Nombre y Apellido
              </label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Ej. Carlos Mendoza"
                className="w-full text-xs p-2.5 bg-[#FAF8F5] border border-[#E8DFC8] rounded-xl focus:outline-none focus:border-[#2E6B48]"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-gray-700 block mb-1">
                Teléfono de contacto / WhatsApp
              </label>
              <input
                type="tel"
                required
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="Ej. 0414-555-8899"
                className="w-full text-xs p-2.5 bg-[#FAF8F5] border border-[#E8DFC8] rounded-xl focus:outline-none focus:border-[#2E6B48]"
              />
            </div>

            {selectedModality === 'delivery' && (
              <div>
                <label className="text-[11px] font-bold text-gray-700 block mb-1">
                  Dirección de Entrega
                </label>
                <textarea
                  required
                  rows={2}
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="Urbanización, calle, edificio o casa y punto de referencia"
                  className="w-full text-xs p-2.5 bg-[#FAF8F5] border border-[#E8DFC8] rounded-xl focus:outline-none focus:border-[#2E6B48] resize-none"
                />
              </div>
            )}

            {selectedModality === 'dine_in' && (
              <div>
                <label className="text-[11px] font-bold text-gray-700 block mb-1">
                  Número de Mesa
                </label>
                <input
                  type="text"
                  required
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  placeholder="Ej. Mesa 4"
                  className="w-full text-xs p-2.5 bg-[#FAF8F5] border border-[#E8DFC8] rounded-xl focus:outline-none focus:border-[#2E6B48]"
                />
              </div>
            )}
          </div>

          {/* 3. Payment Method */}
          <div className="space-y-1.5">
            <label className="text-xs font-black uppercase tracking-wider text-[#143527]">
              3. Forma de Pago
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'pago_movil', label: 'Pago Móvil (Bs)', note: 'Tasa oficial BCV' },
                { id: 'zelle', label: 'Zelle (USD)', note: 'Confirmación rápida' },
                { id: 'cash_usd', label: 'Efectivo Divisas', note: 'Cambio disponible' },
                { id: 'pos', label: 'Punto de Venta', note: 'En sede o inalámbrico' },
              ].map((pm) => {
                const isSelected = paymentMethod === pm.id;
                return (
                  <button
                    key={pm.id}
                    type="button"
                    onClick={() => setPaymentMethod(pm.id as any)}
                    className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                      isSelected
                        ? 'border-[#2E6B48] bg-[#EBF5EF] ring-1 ring-[#2E6B48]'
                        : 'border-[#E8DFC8] bg-white hover:bg-[#FAF8F5]'
                    }`}
                  >
                    <div className="text-xs font-bold text-[#143527]">{pm.label}</div>
                    <div className="text-[10px] text-gray-500">{pm.note}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Order Summary box */}
          <div className="p-3 bg-white rounded-2xl border border-[#E8DFC8] text-xs space-y-1.5">
            <div className="flex justify-between text-gray-600">
              <span>{items.length} platos en el pedido:</span>
              <span className="font-bold text-[#143527]">${subtotal.toFixed(2)}</span>
            </div>
            {deliveryFee > 0 && (
              <div className="flex justify-between text-gray-600">
                <span>Delivery:</span>
                <span className="font-bold text-[#143527]">${deliveryFee.toFixed(2)}</span>
              </div>
            )}
            <div className="pt-1.5 border-t border-[#E8DFC8] flex justify-between items-baseline font-black text-sm text-[#143527]">
              <span>Total a Pagar:</span>
              <span className="text-base text-[#E6392F]">${grandTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Direct WhatsApp option */}
          <div className="p-3 bg-[#EBF7EE] border border-[#BCE4C8] rounded-2xl">
            <div className="flex items-center gap-2 mb-1 text-xs font-bold text-[#1F5430]">
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              Enviar pedido directamente por WhatsApp
            </div>
            <p className="text-[11px] text-gray-600 mb-2 leading-relaxed">
              Envía tu orden formateada directamente al equipo de atención ({RESTAURANT_CONFIG.contact.whatsappDisplay}).
            </p>
            <a
              href={buildWhatsAppLink(generateWhatsAppOrderText())}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 px-3 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-2xs active:scale-95 transition-transform"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              Enviar por WhatsApp
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3.5 px-4 bg-[#E6392F] hover:bg-[#D42B21] text-white font-extrabold text-sm rounded-full flex items-center justify-center gap-2 shadow-md active:scale-95 transition-transform cursor-pointer"
          >
            <span>Confirmar Pedido</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
