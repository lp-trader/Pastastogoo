export type CategoryId = 'favoritos' | 'mas_vendidos' | 'clasicas' | 'especiales' | 'combos' | 'bebidas' | 'postres';

export interface PastaOption {
  id: string;
  name: string;
  description?: string;
  extraPrice: number;
}

export interface ExtraOption {
  id: string;
  name: string;
  price: number;
  category?: 'proteina' | 'queso' | 'complemento' | 'salsa';
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: CategoryId;
  isFavorite?: boolean;
  isBestSeller?: boolean;
  badge?: string;
  tagline?: string;
  includesBreadAndCheese?: boolean;
  availablePastas?: PastaOption[];
  availableExtras?: ExtraOption[];
  rating?: number;
  reviewCount?: number;
}

export interface CartItem {
  cartItemId: string;
  item: MenuItem;
  pastaType: PastaOption;
  selectedExtras: ExtraOption[];
  notes: string;
  quantity: number;
  unitPrice: number; // base price + extras price
  totalPrice: number; // unitPrice * quantity
}

export type DeliveryModality = 'delivery' | 'pickup' | 'dine_in';

export type PaymentMethod = 'pago_movil' | 'zelle' | 'cash_usd' | 'pos';

export interface OrderSimulation {
  orderNumber: string;
  createdAt: string;
  customerName: string;
  customerPhone: string;
  modality: DeliveryModality;
  deliveryAddress?: string;
  deliveryZone?: string;
  tableNumber?: string;
  paymentMethod: PaymentMethod;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  notes?: string;
  estimatedMinutes: string;
}
