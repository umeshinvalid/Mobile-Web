import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, ShieldCheck, Heart, ShoppingBag, Stars, Sparkles, MessageSquare, Flame } from 'lucide-react';
import { Product, CartItem, PhoneColor, PhoneStorage, AdminSettings } from './types';
import { initialProducts, mockTestimonials } from './data/mockProducts';

// Subcomponents
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Showcase from './components/Showcase';
import AICore from './components/AICore';
import ProductDetail from './components/ProductDetail';
import Checkout from './components/Checkout';
import AdminPanel from './components/AdminPanel';
import Drawers from './components/Drawers';

export default function App() {
  // 1. Core database states
  const [products, setProducts] = useState<Product[]>(() => {
    const cached = localStorage.getItem('nxr_products');
    return cached ? JSON.parse(cached) : initialProducts;
  });

  // 2. Global application states
  const [activeTab, setActiveTab] = useState<string>('store'); // store | diagnostics | compare
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // 3. Persisted cart and wishlist indices
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const cached = localStorage.getItem('nxr_cart');
    return cached ? JSON.parse(cached) : [];
  });

  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    const cached = localStorage.getItem('nxr_wishlist');
    return cached ? JSON.parse(cached) : [];
  });

  // 4. Overlays & Panel toggles
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerType, setDrawerType] = useState<'cart' | 'wishlist'>('cart');
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // 5. Admin Settings Configuration
  const [adminSettings, setAdminSettings] = useState<AdminSettings>(() => {
    const cached = localStorage.getItem('nxr_settings');
    if (cached) return JSON.parse(cached);
    return {
      storeName: 'NEXORA MOBILES',
      activeGlowColor: 'violet',
      enableFlashSale: true,
      flashSaleEnds: new Date(Date.now() + 15504000).toISOString(),
      activePromoText: 'NEURAL PROTO SYNC COMPLETE — LIMITED DISCOUNTS REGISTERED IN SECURE ENGINE',
      cyberpunkGlowIntensity: 'vibrant',
      accentTheme: 'purple-blue',
      heroVideoUrl: '',
      voiceSearchEnabled: true
    };
  });

  // 6. Marketing Offers/Checkout simulation state
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number } | null>(null);

  // 7. Voice and telemetry notification HUD state
  const [toastText, setToastText] = useState<string>('');
  const [showToast, setShowToast] = useState<boolean>(false);

  // Cache persistence
  useEffect(() => {
    localStorage.setItem('nxr_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('nxr_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('nxr_wishlist', JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  useEffect(() => {
    localStorage.setItem('nxr_settings', JSON.stringify(adminSettings));
  }, [adminSettings]);

  // Derived Values
  const totalCartCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  const wishlistProducts = useMemo(() => {
    return products.filter((p) => wishlistIds.includes(p.id));
  }, [products, wishlistIds]);

  // Telemetry voice/action overlay trigger
  const handleTriggerToast = (text: string) => {
    setToastText(text);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 4500);
  };

  // State manipulation handlers
  const handleAddToCart = (product: Product, color: PhoneColor, storage: PhoneStorage) => {
    const itemId = `${product.id}-${color.name.replace(/\s+/g, '')}-${storage.size.replace(/\s+/g, '')}`;
    
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { id: itemId, product, selectedColor: color, selectedStorage: storage, quantity: 1 }];
    });

    handleTriggerToast(`Acquisition module added: ${product.name} (${color.name} // ${storage.size})`);
  };

  const handleRemoveFromCart = (itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
    handleTriggerToast(`Acquisition module removed.`);
  };

  const handleUpdateCartQuantity = (itemId: string, increment: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === itemId) {
            const nextQty = item.quantity + increment;
            return { ...item, quantity: nextQty < 1 ? 1 : nextQty };
          }
          return item;
        })
    );
  };

  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(product.id);
      if (exists) {
        handleTriggerToast(`Removed ${product.name} from favorite telemetry database.`);
        return prev.filter((id) => id !== product.id);
      } else {
        handleTriggerToast(`Secured ${product.name} inside favorite telemetry database.`);
        return [...prev, product.id];
      }
    });
  };

  const handleMoveWishlistProductToCart = (p: Product) => {
    handleAddToCart(p, p.colors[0], p.storageOptions[0]);
    setWishlistIds((prev) => prev.filter((id) => id !== p.id));
    setIsDrawerOpen(false);
  };

  // Applied Promo configuration from AI or checkout
  const handleApplyPromoCode = (discount: number, rawCode: string) => {
    setAppliedPromo({ code: rawCode, discount });
  };

  const handleRestoreDefaults = () => {
    setProducts(initialProducts);
    setAdminSettings({
      storeName: 'NEXORA MOBILES',
      activeGlowColor: 'violet',
      enableFlashSale: true,
      flashSaleEnds: new Date(Date.now() + 15504000).toISOString(),
      activePromoText: 'NEURAL PROTO SYNC COMPLETE — LIMITED DISCOUNTS REGISTERED IN SECURE ENGINE',
      cyberpunkGlowIntensity: 'vibrant',
      accentTheme: 'purple-blue',
      heroVideoUrl: '',
      voiceSearchEnabled: true
    });
    setCartItems([]);
    setWishlistIds([]);
    setAppliedPromo(null);
  };

  // Color mapping variables based on admin gradients configuration
  const themeGlowContainer = {
    'purple-blue': 'from-violet-950/20 via-zinc-950 to-cyan-950/15',
    'monochrome-silver': 'from-zinc-900/10 via-black to-slate-900/10',
    'neon-green': 'from-emerald-950/20 via-zinc-950 to-zinc-950'
  }[adminSettings.accentTheme] || 'from-violet-950/20 via-zinc-950 to-cyan-950/15';

  return (
    <div className={`min-h-screen bg-black bg-gradient-to-b ${themeGlowContainer} relative overflow-x-hidden pb-16`}>
      
      {/* 1. STICKY GLASS NAVIGATION HEADER */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartItemsCount={totalCartCount}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => {
          setDrawerType('cart');
          setIsDrawerOpen(true);
        }}
        onOpenWishlist={() => {
          setDrawerType('wishlist');
          setIsDrawerOpen(true);
        }}
        adminSettings={adminSettings}
        onOpenAdmin={() => setIsAdminOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onTriggerVoiceToast={handleTriggerToast}
      />

      {/* 2. CONDITIONAL TAB ENGINE OR DETIAL PANEL */}
      <AnimatePresence mode="wait">
        
        {activeTab === 'store' && (
          <motion.div
            key="store-tab"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Custom Cinematic Hero banner */}
            <Hero
              onExploreClick={() => {
                const element = document.getElementById('storefront-showcase');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              adminSettings={adminSettings}
            />

            {/* Immersive Products Grid showroom catalog */}
            <Showcase
              products={products}
              onSelectProduct={setSelectedProduct}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
              wishlistIds={wishlistIds}
              searchQuery={searchQuery}
              adminSettings={adminSettings}
            />

            {/* HIGH-END TESTIMONIALS SLIDER SECTION */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/5 relative z-10">
              <div className="text-center mb-10">
                <span className="text-[10px] font-mono text-cyan-400 tracking-[0.3em] uppercase block mb-1">PROVENANCE REVERBERATION</span>
                <h3 className="text-xl font-extrabold text-white tracking-widest uppercase">TESTIFIED DIRECT PROTOCOLS</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs select-none">
                {mockTestimonials.map((item) => (
                  <div key={item.id} className="glass-panel rounded-xl p-5 border border-white/5 bg-zinc-950/20 text-left space-y-3">
                    <div className="flex justify-between items-center text-[10px] text-slate-500">
                      <span>{item.name.toUpperCase()} / {item.role.toUpperCase()}</span>
                      <span className="text-cyan-400">★★★★★</span>
                    </div>
                    <p className="text-slate-300 font-light leading-relaxed">"{item.quote}"</p>
                  </div>
                ))}
              </div>
            </section>
          </motion.div>
        )}

        {/* AI Recommendations Diagnostics tab */}
        {activeTab === 'diagnostics' && (
          <motion.div
            key="diagnostics-tab"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="py-8 text-center max-w-xl mx-auto px-4 mt-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-violet-500/10 bg-violet-950/15 text-[10px] text-violet-400 font-mono tracking-wider mb-2">
                <stars className="text-violet-400 shrink-0" />
                <span>NEXORA NEURAL LABS ACTIVE</span>
              </div>
              <h2 className="text-2xl font-extrabold tracking-widest text-white uppercase sm:text-3xl">AI SPECTRAL DIAGNOSTICS</h2>
              <p className="text-xs font-mono text-slate-500 tracking-wide mt-1">
                Calibrate specs matrices, run interactive diagnostics queries, or consult the local synthetic core bot.
              </p>
            </div>

            <AICore
              products={products.filter((p) => p.category !== 'accessory')}
              onSelectProduct={setSelectedProduct}
              onAddToCart={handleAddToCart}
              onApplySpecialOffer={handleApplyPromoCode}
              onTriggerVoiceToast={handleTriggerToast}
            />
          </motion.div>
        )}

        {/* Compare specifications matrix tab selection */}
        {activeTab === 'compare' && (
          <motion.div
            key="compare-tab"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
          >
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="text-[10px] font-mono text-cyan-400 tracking-[0.3em] uppercase block mb-1">GLOBAL LEDGER COMPARIONS</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-widest uppercase">COMPARATIVE MATRIX HUB</h2>
              <p className="text-xs font-mono text-slate-500 tracking-wide mt-1">
                Complete comparative matrix analyzing computing cores, active glass optics, and neural efficiency indicators.
              </p>
            </div>

            <div className="glass-panel border-white/5 rounded-2xl p-6 overflow-x-auto bg-zinc-950/40">
              
              {/* Complex Table of ALL smartphones currently in state */}
              <table className="w-full text-left font-mono text-xs border-collapse select-none min-w-[700px]">
                <thead>
                  <tr className="border-b border-white/5 text-slate-500 text-[10px] uppercase tracking-wider">
                    <th className="pb-4">DEVICE MODEL</th>
                    <th className="pb-4">COPROCESSOR</th>
                    <th className="pb-4">REFT SPEED (RAM)</th>
                    <th className="pb-4">NEURAL INDEX</th>
                    <th className="pb-4">HOLOGRAM EMIT</th>
                    <th className="pb-4 font-bold text-white text-right">CREDITS INVESTMENT</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-300">
                  {products.filter(p => p.category !== 'accessory').map((p) => (
                    <tr key={p.id} className="hover:bg-white/5 transition-all">
                      <td className="py-4 font-bold text-white uppercase">{p.name}</td>
                      <td className="py-4">{p.specs.processor}</td>
                      <td className="py-4">{p.specs.ram}</td>
                      <td className="py-4">
                        <span className="text-cyan-400 font-bold">{p.specs.neuralScore}%</span> Score
                      </td>
                      <td className="py-4">
                        <span className={p.specs.holoCapable ? 'text-[10px] text-green-400' : 'text-[10px] text-slate-500'}>
                          {p.specs.holoCapable ? '✓ SECURE DUAL-EMIT' : '✕ OFF'}
                        </span>
                      </td>
                      <td className="py-4 text-right font-extrabold text-white text-sm">${p.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

            </div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* 3. FLOATING COMPONENT DRAWER: CART & WISHLIST */}
      <Drawers
        isOpen={isDrawerOpen}
        type={drawerType}
        onClose={() => setIsDrawerOpen(false)}
        cartItems={cartItems}
        onRemoveFromCart={handleRemoveFromCart}
        onUpdateCount={handleUpdateCartQuantity}
        wishlistProducts={wishlistProducts}
        onRemoveFromWishlist={handleToggleWishlist}
        onMoveToCart={handleMoveWishlistProductToCart}
        onCheckout={() => {
          setIsDrawerOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* 4. DETAILS SPEC SHEET SHEET TRIGGER MODAL */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductDetail
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onAddToCart={handleAddToCart}
            allProducts={products}
            isWishlisted={wishlistIds.includes(selectedProduct.id)}
            onToggleWishlist={handleToggleWishlist}
            onTriggerVoiceToast={handleTriggerToast}
          />
        )}
      </AnimatePresence>

      {/* 5. MULTI-STEP CREDIT CHECKOUT SHEETS */}
      <AnimatePresence>
        {isCheckoutOpen && cartItems.length > 0 && (
          <Checkout
            cartItems={cartItems}
            onClose={() => setIsCheckoutOpen(false)}
            onClearCart={() => setCartItems([])}
            initialPromoApplied={appliedPromo}
            onTriggerVoiceToast={handleTriggerToast}
          />
        )}
      </AnimatePresence>

      {/* 6. ADMIN SYSTEM CONFIG MATRIX DRAWER */}
      <AnimatePresence>
        {isAdminOpen && (
          <AdminPanel
            products={products}
            onUpdateProducts={setProducts}
            adminSettings={adminSettings}
            onUpdateAdminSettings={setAdminSettings}
            onClose={() => setIsAdminOpen(false)}
            onRestoreDefaults={handleRestoreDefaults}
            onTriggerVoiceToast={handleTriggerToast}
          />
        )}
      </AnimatePresence>

      {/* 7. HIGH-FIDELITY SPEECH RECOGNITIONS SYSTEM TOASTS HUD METRIC */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 left-6 z-50 glass-panel border-cyan-500/30 bg-cyan-950/20 px-4 py-3 rounded-xl max-w-sm flex items-center gap-3 shadow-xl shadow-cyan-950/15"
          >
            <div className="w-5 h-5 rounded-full border border-cyan-500/30 bg-cyan-950 flex items-center justify-center shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            </div>
            <div className="text-left">
              <span className="text-[7px] font-mono text-slate-500 block uppercase font-bold tracking-widest leading-none">SYS_BROADCAST LOG_A</span>
              <p className="text-[10px] font-mono text-cyan-200 mt-1 uppercase tracking-wide leading-tight">{toastText}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
