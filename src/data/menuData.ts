import { ExtraOption, MenuItem, PastaOption } from '../types/restaurant';

/**
 * Tipos de pasta base para el armado del Bowl
 */
export const DEFAULT_PASTA_TYPES: PastaOption[] = [
  { id: 'spaghetti', name: 'Spaghetti Tradicional', description: 'Pasta larga clásica al dente', extraPrice: 0 },
  { id: 'penne', name: 'Penne Rigate', description: 'Pasta corta estriada perfecta para atrapar la salsa', extraPrice: 0 },
  { id: 'fettuccine', name: 'Fettuccine al Huevo', description: 'Cintas anchas y suaves', extraPrice: 0 },
  { id: 'fusilli', name: 'Fusilli Artesanal', description: 'Espirales ideales para salsas ligeras y pestos', extraPrice: 0 },
];

/**
 * Extras y adiciones para personalizar el plato
 */
export const DEFAULT_EXTRAS: ExtraOption[] = [
  { id: 'extra_queso', name: 'Queso Parmesano Reggiano Extra', price: 1.0, category: 'queso' },
  { id: 'extra_bacon', name: 'Tocineta Crocante Ahumada', price: 1.5, category: 'proteina' },
  { id: 'extra_meatball', name: 'Albóndiga Artesanal Adicional', price: 1.5, category: 'proteina' },
  { id: 'extra_chicken', name: 'Pollo Salteado a las Hierbas', price: 2.0, category: 'proteina' },
  { id: 'extra_mushrooms', name: 'Champiñones Frescos Salteados', price: 1.2, category: 'complemento' },
  { id: 'extra_bread', name: 'Ración de Pan de la Casa Extra', price: 0.8, category: 'complemento' },
  { id: 'extra_sauce', name: 'Porción Extra de Salsa Caliente', price: 1.5, category: 'salsa' },
];

/**
 * Catálogo centralizado de productos con imágenes apetitosas de alta disponibilidad
 */
export const MENU_ITEMS: MenuItem[] = [
  // --- NUESTROS FAVORITOS (Mockup de referencia) ---
  {
    id: 'napolitana',
    name: 'Napolitana',
    tagline: 'La receta clásica del sur de Italia',
    description: 'Salsa de tomate natural, albahaca fresca y queso parmesano.',
    price: 5.0,
    // Imagen garantizada y apetitosa de pasta pomodoro / napolitana tradicional
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80',
    category: 'favoritos',
    isFavorite: true,
    badge: 'Popular',
    includesBreadAndCheese: true,
    rating: 4.8,
    reviewCount: 142,
  },
  {
    id: 'pomodoro-polpette',
    name: 'Pomodoro con Polpette',
    tagline: 'Con tiernas albóndigas artesanales',
    description: 'Salsa de tomate, albóndigas de res y queso parmesano.',
    price: 6.0,
    image: 'https://images.unsplash.com/photo-1515516969-d4008cc6241a?auto=format&fit=crop&w=800&q=80',
    category: 'favoritos',
    isFavorite: true,
    badge: 'Recomendado',
    includesBreadAndCheese: true,
    rating: 4.9,
    reviewCount: 198,
  },
  {
    id: 'ragu-carne',
    name: 'Ragù di carne',
    tagline: 'Boloñesa lenta y aromática',
    description: 'Salsa de carne tradicional con un toque de vino tinto y queso parmesano.',
    price: 6.0,
    image: 'https://images.unsplash.com/photo-1622973536968-3ead9e780960?auto=format&fit=crop&w=800&q=80',
    category: 'favoritos',
    isFavorite: true,
    badge: 'Tradición',
    includesBreadAndCheese: true,
    rating: 4.9,
    reviewCount: 220,
  },
  {
    id: 'pesto-basilico',
    name: 'Pesto di basilico',
    tagline: 'Aroma fresco de Génova',
    description: 'Salsa de albahaca fresca, piñones y queso parmesano.',
    price: 7.0,
    image: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?auto=format&fit=crop&w=800&q=80',
    category: 'favoritos',
    isFavorite: true,
    badge: 'Gourmet',
    includesBreadAndCheese: true,
    rating: 4.7,
    reviewCount: 115,
  },

  // --- PLATOS MÁS VENDIDOS (Carrusel de Best Sellers) ---
  {
    id: 'alfredo-pollo-crispy',
    name: 'Fettuccine Alfredo con Pollo Crispy',
    tagline: 'Cremosa, crocante y reconfortante',
    description: 'Cremosa salsa Alfredo con mantequilla y parmesano, acompañada de pechuga de pollo crispy y pan tostado.',
    price: 7.5,
    image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=800&q=80',
    category: 'mas_vendidos',
    isBestSeller: true,
    badge: '⭐ #1 Más Vendido',
    includesBreadAndCheese: true,
    rating: 5.0,
    reviewCount: 310,
  },
  {
    id: 'lasagna-bolognese',
    name: 'Lasagna Tradicional al Forno',
    tagline: 'Receta de la Nonna gratinada',
    description: 'Capas de pasta fresca con rico ragù boloñesa, suave bechamel, mozzarella derretida y queso parmesano dorado.',
    price: 7.0,
    image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&w=800&q=80',
    category: 'mas_vendidos',
    isBestSeller: true,
    badge: '⭐ Top Ventas',
    includesBreadAndCheese: true,
    rating: 4.9,
    reviewCount: 275,
  },
  {
    id: 'combo-duo-amici',
    name: 'Combo Dúo Italiano (Para 2)',
    tagline: 'El favorito para compartir en casa',
    description: '2 Bowls de pasta tradicional a elección + 2 Bebidas frías + 2 Raciones de pan con mantequilla de ajo y queso.',
    price: 12.0,
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80',
    category: 'combos',
    isBestSeller: true,
    badge: '🔥 Combo Ahorro',
    includesBreadAndCheese: true,
    rating: 4.9,
    reviewCount: 184,
  },
  {
    id: 'carbonara-to-go',
    name: 'Pasta Carbonara To Go',
    tagline: 'Tocineta ahumada y pimienta recién molida',
    description: 'Tiras de tocineta crocante salteada, suave crema de yemas, pimienta negra recién molida y abundante parmesano.',
    price: 6.5,
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=800&q=80',
    category: 'mas_vendidos',
    isBestSeller: true,
    badge: '⭐ Favorito',
    includesBreadAndCheese: true,
    rating: 4.8,
    reviewCount: 160,
  },

  // --- BEBIDAS & POSTRES ---
  {
    id: 'te-frio-casa',
    name: 'Té Frío de la Casa (Limón & Menta)',
    tagline: 'Refrescante y natural (500ml)',
    description: 'Infusión de té negro con jugo de limón natural y hojas frescas de menta maceradas.',
    price: 1.5,
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80',
    category: 'bebidas',
    rating: 4.8,
    reviewCount: 88,
  },
  {
    id: 'tiramisu-bowl',
    name: 'Tiramisú Artesanal en Bowl',
    tagline: 'El postre italiano por excelencia',
    description: 'Bizcochos Savoiardi humedecidos en café espresso, crema sedosa de mascarpone y cacao amargo.',
    price: 3.5,
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=80',
    category: 'postres',
    rating: 4.9,
    reviewCount: 94,
  },
];
