export interface PhoneColor {
  name: string;
  hex: string;
  glowColor: string;
}

export interface PhoneStorage {
  size: string;
  priceModifier: number;
}

export interface FuturisticSpecs {
  processor: string;
  ram: string;
  storage: string;
  display: string;
  camera: string;
  battery: string;
  neuralScore: number; // Futuristic index out of 100
  holoCapable: boolean; // Holographic projections supported
  quantumSecure: boolean; // Quantum cryptography chip
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: 'flagship' | 'gaming' | 'camera' | 'foldable' | 'luxury' | 'accessory';
  price: number;
  originalPrice: number;
  description: string;
  longDescription: string;
  rating: number;
  reviewsCount: number;
  availability: 'In Stock' | 'Limited Drop' | 'Pre-Order' | 'Sold Out';
  colors: PhoneColor[];
  storageOptions: PhoneStorage[];
  specs: FuturisticSpecs;
  images: string[]; // Front, angled, back, holographic grid mockup URL styles
  trendingScore: number;
  isPrototype?: boolean;
}

export interface CartItem {
  id: string;
  product: Product;
  selectedColor: PhoneColor;
  selectedStorage: PhoneStorage;
  quantity: number;
}

export interface WishlistItem {
  productId: string;
  addedAt: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'nexora-core';
  text: string;
  timestamp: string;
  options?: string[]; // Quick response suggestions
  payload?: any; // To trigger UI changes
}

export interface AdminSettings {
  storeName: string;
  activeGlowColor: 'violet' | 'cyan' | 'emerald' | 'amber';
  enableFlashSale: boolean;
  flashSaleEnds: string; // ISO String
  activePromoText: string;
  cyberpunkGlowIntensity: 'subtle' | 'vibrant' | 'hyper';
  accentTheme: 'purple-blue' | 'monochrome-silver' | 'neon-green';
  heroVideoUrl: string;
  voiceSearchEnabled: boolean;
}
