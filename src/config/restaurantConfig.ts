/**
 * Configuración centralizada de Pastas To Go
 */
export const RESTAURANT_CONFIG = {
  name: 'Pastas to go',
  slogan: 'Tradición en un Bowl',
  subtitle: 'Pasta que va contigo, sabor que se queda',
  city: 'Barquisimeto & Cabudare, Edo. Lara',
  locations: [
    {
      name: 'Sede Este Barquisimeto',
      address: 'Av. Los Leones c/c Av. Lara, Barquisimeto',
      hours: 'Mar - Dom: 11:30 AM - 10:00 PM',
      phone: '+58 414-555-1234',
    },
    {
      name: 'Sede Cabudare',
      address: 'Av. Intercomunal Barquisimeto-Cabudare, Sector La Mora',
      hours: 'Mar - Dom: 12:00 PM - 10:00 PM',
      phone: '+58 424-555-5678',
    },
  ],
  contact: {
    whatsappNumber: '584145551234', // Formato internacional sin '+'
    whatsappDisplay: '+58 414-555-1234',
    instagram: '@pastastogo.ve',
    email: 'pedidos@pastastogo.com',
  },
  colors: {
    creamBackground: '#F6F0E4',
    creamCard: '#FFFFFF',
    greenInstitutional: '#2E6B48',
    greenDark: '#143527',
    redCoral: '#E6392F',
    pastaGold: '#FAB81E',
    textDark: '#1F2A23',
    textMuted: '#5C665F',
  },
  currencies: {
    symbol: '$',
    code: 'USD',
  },
};

/**
 * Genera el enlace de WhatsApp con mensaje estructurado
 */
export function buildWhatsAppLink(message: string, customPhone?: string): string {
  const phone = customPhone || RESTAURANT_CONFIG.contact.whatsappNumber;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
