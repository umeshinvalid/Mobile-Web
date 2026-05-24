import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Grid3X3, Filter, SlidersHorizontal, ArrowUpDown, Flame, BadgeAlert } from 'lucide-react';
import { Product, PhoneColor, PhoneStorage, AdminSettings } from '../types';
import ProductCard from './ProductCard';

interface ShowcaseProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, color: PhoneColor, storage: PhoneStorage) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
  searchQuery: string;
  adminSettings: AdminSettings;
}

export default function Showcase({
  products,
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  searchQuery,
  adminSettings
}: ShowcaseProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('neural'); // neural | price-asc | price-desc | rating
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { id: 'all', label: 'ALL MODULES' },
    { id: 'flagship', label: 'FLAGSHIP PHONES' },
    { id: 'gaming', label: 'GAMING PHONES' },
    { id: 'camera', label: 'CAMERA PHONES' },
    { id: 'foldable', label: 'FOLDABLE PHONES' },
    { id: 'luxury', label: 'SOVEREIGN LUXURY' },
    { id: 'accessory', label: 'ACCESSORIES' }
  ];

  // Accent glow configuration from settings
  const shadowAccentClass = {
    'purple-blue': 'border-violet-500/20 shadow-[0_0_15px_rgba(139,92,246,0.15)] bg-violet-950/5',
    'monochrome-silver': 'border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)] bg-zinc-900/40',
    'neon-green': 'border-emerald-500/25 shadow-[0_0_15px_rgba(16,185,129,0.15)] bg-emerald-950/5'
  }[adminSettings.accentTheme] || 'border-violet-500/20';

  const textHeadingHoverAccent = {
    'purple-blue': 'hover:text-violet-400',
    'monochrome-silver': 'hover:text-slate-300',
    'neon-green': 'hover:text-emerald-400'
  }[adminSettings.accentTheme] || 'hover:text-violet-400';

  // Smart Filtering logic
  const filteredSortedProducts = useMemo(() => {
    let result = products;

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.specs.processor.toLowerCase().includes(q)
      );
    }

    // Sort by selection
    return [...result].sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      // Default: Neural alignment index descending
      return b.specs.neuralScore - a.specs.neuralScore;
    });
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative" id="storefront-showcase">
      
      {/* Background radial soft light for the store section */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-violet-950/5 blur-[120px] pointer-events-none" />

      {/* Showcase header title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span className="text-[10px] font-mono tracking-[0.3em] text-cyan-400">NEXORA HUD STOREFRONT</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-sans uppercase">
            HOLOGRAPHIC SHOWROOM
          </h2>
          <p className="text-xs font-mono text-slate-500 tracking-wide mt-1">
            Displaying {filteredSortedProducts.length} authenticated micro-assembly models.
          </p>
        </div>

        {/* Display interactive toggle filters */}
        <div className="flex items-center gap-2 self-start md:self-end">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-4 py-2 rounded-lg font-mono text-[10px] tracking-wider font-semibold border flex items-center gap-2 transition-all ${
              showFilters
                ? 'border-violet-500 bg-violet-950/20 text-white'
                : 'border-white/5 bg-zinc-950/50 text-slate-400 hover:text-white hover:border-white/15'
            }`}
          >
            <SlidersHorizontal size={12} />
            <span>SORT & ANALYZE</span>
          </button>
        </div>
      </div>

      {/* Sorting panel expandable bar */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mb-6"
          >
            <div className="glass-panel rounded-xl p-4 border border-white/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Sort by Metric selector */}
              <div>
                <span className="text-[9px] font-mono text-slate-500 block mb-2 tracking-widest">SORT MECHANIC</span>
                <div className="flex flex-col gap-1">
                  {[
                    { id: 'neural', label: 'Neural Alignment Index (Max First)' },
                    { id: 'price-asc', label: 'Credits Flow (Lowest First)' },
                    { id: 'price-desc', label: 'Credits Flow (Highest First)' },
                    { id: 'rating', label: 'Telescopic Core Rating Score' }
                  ].map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setSortBy(option.id)}
                      className={`text-left px-2.5 py-1.5 rounded font-mono text-[9.5px] transition-all border ${
                        sortBy === option.id
                          ? 'border-violet-500/25 bg-violet-950/30 text-violet-300'
                          : 'border-transparent text-slate-400 hover:text-white hover:bg-zinc-900'
                      }`}
                    >
                      {option.label.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status information panel block */}
              <div className="sm:col-span-1 lg:col-span-3 glass-panel border-white/5 rounded-lg p-3 bg-zinc-950/30 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 mb-1 text-[9px] font-mono text-violet-400">
                    <Sparkles size={11} />
                    <span>SYNAPSE ALGORITHM SYSTEM ACTIVE</span>
                  </div>
                  <p className="text-[10px] text-slate-400 tracking-wide font-light leading-relaxed">
                    Our AI recommendation engine constantly balances core frequencies, image matrices, and solid graphene battery lifespan telemetry data. Select "Neural Alignment Index" for optimal hardware calibration.
                  </p>
                </div>
                <div className="text-[8px] font-mono text-slate-500 border-t border-white/5 pt-2 flex items-center justify-between">
                  <span>SYNC NODE: NEX_US_WEST_4</span>
                  <span className="text-emerald-400">SYSTEM SECURE // ZERO BOTTLENECK</span>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Horizontal pill tabs for categories */}
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-4 mb-8 border-b border-white/5 select-none no-scrollbar">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2.5 font-mono text-[10px] tracking-widest font-bold rounded-lg border transition-all shrink-0 ${
                isActive
                  ? 'bg-white border-white text-black shadow-[0_4px_15px_rgba(255,255,255,0.15)] scale-[1.02]'
                  : 'bg-zinc-950/50 border-white/5 text-slate-400 hover:text-white hover:border-white/15'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Promo banner alerting flash sale */}
      {adminSettings.enableFlashSale && (
        <div className={`mb-10 rounded-2xl border p-4 sm:p-6 relative overflow-hidden flex flex-col sm:flex-row justify-between items-center gap-4 ${shadowAccentClass}`}>
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl" />
          
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-xl bg-violet-950/60 border border-violet-500/25 flex items-center justify-center text-violet-400 shrink-0">
              <Flame size={22} className="animate-pulse" />
            </div>
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">CYBERPUNK CONFIGURE ACTIVE</span>
                <span className="px-1.5 py-0.5 rounded bg-pink-950 text-pink-400 text-[8px] font-mono uppercase font-bold animate-pulse">FLASH CODE SAVINGS</span>
              </div>
              <h4 className="text-base font-bold tracking-widest text-white uppercase text-left">
                LAUNCH OVERRIDE PROMOTION: - $150 OFF
              </h4>
              <p className="text-xs text-slate-400 text-left font-light">
                Use quantum cipher <code className="text-cyan-400 bg-black/60 px-1 py-0.5 rounded border border-white/5 font-mono">NEXORA2026</code> during checkout checkout simulation to unlock instant rebates.
              </p>
            </div>
          </div>
          
          <div className="px-4 py-2 border border-white/10 rounded-lg bg-zinc-950/60 font-mono text-center">
            <span className="text-[8px] text-slate-500 block uppercase">FIRMWARE BATCH STATS</span>
            <span className="text-xs text-emerald-400 font-extrabold tracking-widest uppercase">STREET PREMIERE</span>
          </div>
        </div>
      )}

      {/* Grid of Products list */}
      <AnimatePresence mode="popLayout">
        {filteredSortedProducts.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredSortedProducts.map((p) => {
              const isWishlisted = wishlistIds.includes(p.id);
              return (
                <ProductCard
                  key={p.id}
                  product={p}
                  onSelectProduct={onSelectProduct}
                  onAddToCart={onAddToCart}
                  onToggleWishlist={onToggleWishlist}
                  isWishlisted={isWishlisted}
                />
              );
            })}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 glass-panel rounded-2xl border border-white/5 flex flex-col items-center justify-center gap-4"
          >
            <BadgeAlert size={36} className="text-slate-600 animate-bounce" />
            <div>
              <p className="font-mono text-xs tracking-wider text-slate-400 uppercase">NO HARDWARE CONFIGURATIONS MATCHED</p>
              <p className="text-[11px] text-slate-500 font-light mt-1">Try resetting search filters or checking alternative specification bands.</p>
            </div>
            {searchQuery && (
              <button
                onClick={() => setSelectedCategory('all')}
                className="px-4 py-2 border border-white/5 hover:border-white/20 bg-zinc-900 rounded font-mono text-[9px] tracking-widest text-white mt-1"
              >
                RESTORE FULL SPECTRUM
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
