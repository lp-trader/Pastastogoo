import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, DeliveryModality, ExtraOption, MenuItem, OrderSimulation, PastaOption } from '../types/restaurant';

interface CartContextType {
  items: CartItem[];
  addItem: (item: MenuItem, pastaType: PastaOption, extras: ExtraOption[], notes?: string, quantity?: number) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  removeItem: (cartItemId: string) => void;
  clearCart: () => void;
  totalItemCount: number;
  subtotal: number;
  deliveryFee: number;
  grandTotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  confirmedOrder: OrderSimulation | null;
  setConfirmedOrder: (order: OrderSimulation | null) => void;
  selectedModality: DeliveryModality;
  setSelectedModality: (modality: DeliveryModality) => void;
  activeItemModal: MenuItem | null;
  setActiveItemModal: (item: MenuItem | null) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    // Initial sample state with 2 items for demonstration as seen in the mockup (badge shows 2)
    return [
      {
        cartItemId: 'sample-1',
        item: {
          id: 'napolitana',
          name: 'Napolitana',
          description: 'Salsa de tomate natural, albahaca fresca y queso parmesano.',
          price: 5.0,
          image: 'https://images.unsplash.com/photo-1621996346565-e3d5d628169e?q=80&w=800&auto=format&fit=crop',
          category: 'favoritos',
          includesBreadAndCheese: true,
        },
        pastaType: { id: 'spaghetti', name: 'Spaghetti Tradicional', extraPrice: 0 },
        selectedExtras: [
          { id: 'extra_queso', name: 'Queso Parmesano Extra', price: 1.0, category: 'queso' },
        ],
        notes: 'Bien caliente, por favor',
        quantity: 1,
        unitPrice: 6.0,
        totalPrice: 6.0,
      },
      {
        cartItemId: 'sample-2',
        item: {
          id: 'pomodoro-polpette',
          name: 'Pomodoro con Polpette',
          description: 'Salsa de tomate, albóndigas de res y queso parmesano.',
          price: 6.0,
          image: 'https://images.unsplash.com/photo-1515516969-d4008cc6241a?q=80&w=800&auto=format&fit=crop',
          category: 'favoritos',
          includesBreadAndCheese: true,
        },
        pastaType: { id: 'penne', name: 'Penne Rigate', extraPrice: 0 },
        selectedExtras: [],
        notes: '',
        quantity: 1,
        unitPrice: 6.0,
        totalPrice: 6.0,
      },
    ];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<OrderSimulation | null>(null);
  const [selectedModality, setSelectedModality] = useState<DeliveryModality>('delivery');
  const [activeItemModal, setActiveItemModal] = useState<MenuItem | null>(null);

  const addItem = (
    item: MenuItem,
    pastaType: PastaOption,
    extras: ExtraOption[],
    notes: string = '',
    quantity: number = 1
  ) => {
    const extrasTotal = extras.reduce((sum, ext) => sum + ext.price, 0);
    const unitPrice = item.price + pastaType.extraPrice + extrasTotal;
    const totalPrice = unitPrice * quantity;

    // Unique ID based on combination of item + pasta + extras
    const extrasKey = extras.map((e) => e.id).sort().join('_');
    const existingIndex = items.findIndex(
      (ci) =>
        ci.item.id === item.id &&
        ci.pastaType.id === pastaType.id &&
        ci.selectedExtras.map((e) => e.id).sort().join('_') === extrasKey &&
        ci.notes.trim() === notes.trim()
    );

    if (existingIndex > -1) {
      // Update existing item quantity
      setItems((prev) =>
        prev.map((ci, idx) => {
          if (idx === existingIndex) {
            const newQty = ci.quantity + quantity;
            return {
              ...ci,
              quantity: newQty,
              totalPrice: ci.unitPrice * newQty,
            };
          }
          return ci;
        })
      );
    } else {
      const newItem: CartItem = {
        cartItemId: `item_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        item,
        pastaType,
        selectedExtras: [...extras],
        notes,
        quantity,
        unitPrice,
        totalPrice,
      };
      setItems((prev) => [...prev, newItem]);
    }
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(cartItemId);
      return;
    }
    setItems((prev) =>
      prev.map((ci) => {
        if (ci.cartItemId === cartItemId) {
          return {
            ...ci,
            quantity,
            totalPrice: ci.unitPrice * quantity,
          };
        }
        return ci;
      })
    );
  };

  const removeItem = (cartItemId: string) => {
    setItems((prev) => prev.filter((ci) => ci.cartItemId !== cartItemId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
  // Delivery fee is standard reference ($1.50 for delivery, $0 for pickup or dine-in)
  const deliveryFee = selectedModality === 'delivery' && subtotal > 0 ? 1.5 : 0;
  const grandTotal = subtotal + deliveryFee;

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        totalItemCount,
        subtotal,
        deliveryFee,
        grandTotal,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        confirmedOrder,
        setConfirmedOrder,
        selectedModality,
        setSelectedModality,
        activeItemModal,
        setActiveItemModal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
