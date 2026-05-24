import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Heart, ShieldAlert, Search, Mic, MicOff, Star, Sparkles, X, Menu } from 'lucide-react';
import { AdminSettings } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartItemsCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  adminSettings: AdminSettings;
  onOpenAdmin: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onTriggerVoiceToast: (text: string) => void;
}

export default function Navbar({
  activeTab,
  setActiveTab,
  cartItemsCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  adminSettings,
  onOpenAdmin,
  searchQuery,
  setSearchQuery,
  onTriggerVoiceToast
}: NavbarProps) {
  const [showSearch, setShowSearch] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [syncedStatus, setSyncedStatus] = useState('ONLINE');

  // Multi-color glow maps from admin configuration
  const glowColors: Record<string, string> = {
    violet: 'shadow-[0_0_15px_rgba(139,92,246,0.35)] border-violet-500/30',
    cyan: 'shadow-[0_0_15px_rgba(6,182,212,0.35)] border-cyan-500/30',
    emerald: 'shadow-[0_0_15px_rgba(16,185,129,0.35)] border-emerald-500/30',
    amber: 'shadow-[0_0_15px_rgba(245,158,11,0.35)] border-amber-500/30'
  };

  const textAccentColors: Record<string, string> = {
    violet: 'text-violet-400 group-hover:text-violet-300',
    cyan: 'text-cyan-400 group-hover:text-cyan-300',
    emerald: 'text-emerald-400 group-hover:text-emerald-300',
    amber: 'text-amber-400 group-hover:text-amber-300'
  };

  // Simulate network status variation
  useEffect(() => {
    const statuses = ['ONLINE', 'SYNCED', 'SECURE', 'CORE LNK'];
    const interval = setInterval(() => {
      const nextStatus = statuses[Math.floor(Math.random() * statuses.length)];
      setSyncedStatus(nextStatus);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleVoiceSearch = () => {
    if (!adminSettings.voiceSearchEnabled) {
      onTriggerVoiceToast("Voice AI Interface is restricted in local settings.");
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      onTriggerVoiceToast("Your browser does not support Neural Voice Synthesis. Simulating 'Phantom X1' sweep...");
      setIsListening(true);
      setTimeout(() => {
        setSearchQuery("Phantom");
        setIsListening(false);
        onTriggerVoiceToast("Voice Match Complete: Recalibrated filter for 'Phantom X1' devices.");
      }, 2500);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      onTriggerVoiceToast("Nexora Neural Voice is active. Speak device parameters...");
    };

    recognition.onspeechend = () => {
      setIsListening(false);
      recognition.stop();
    };

    recognition.onerror = (e: any) => {
      setIsListening(false);
      onTriggerVoiceToast("Neural signal interrupted. Fallback search activated.");
    };

    recognition.onresult = (event: any) => {
      const speechToText = event.results[0][0].transcript;
      setSearchQuery(speechToText);
      onTriggerVoiceToast(`Speech Decrypted: "${speechToText}"`);
    };

    recognition.start();
  };

  const navItems = [
    { id: 'store', label: 'PREMIUM STORE', icon: Sparkles },
    { id: 'diagnostics', label: 'AI CORE RECS', icon: Sparkles },
    { id: 'compare', label: 'COMPARER', icon: Star }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-black/60 backdrop-blur-md">
      {/* Admin promo header flashing light */}
      {adminSettings.activePromoText && (
        <div className="relative py-1 bg-gradient-to-r from-violet-950 via-slate-900 to-cyan-950 px-4 text-center text-xs tracking-widest text-slate-300 border-b border-violet-500/20 font-mono flex items-center justify-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
          {adminSettings.activePromoText.toUpperCase()}
          {adminSettings.enableFlashSale && (
            <span className="text-violet-300 font-bold ml-1">| PROTO_ACTIVE_SALE ENABLED</span>
          )}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo design */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('store')}
            className="flex items-center gap-2 group text-left"
            id="brand-logo-btn"
          >
            <div className="relative w-10 h-10 rounded-lg flex items-center justify-center bg-zinc-900 border border-white/10 group-hover:border-violet-500/40 transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 to-cyan-500/20 opacity-50 group-hover:opacity-100 transition-opacity" />
              <span className="font-mono font-bold text-lg text-white tracking-widest relative z-10">N</span>
              <div className="absolute -bottom-1 left-2 right-2 h-[2px] bg-cyan-500 rounded-full shadow-[0_0_8px_#06b6d4] group-hover:bg-violet-400" />
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-[0.25em] text-white block">
                NEXORA
              </span>
              <span className="text-[9px] font-mono tracking-[0.4em] text-slate-400 hover:text-cyan-400 transition-colors">
                MOBILES
              </span>
            </div>
          </button>

          {/* Secure Quantum Network Active Node Indicator */}
          <div className="hidden lg:flex items-center gap-1.5 px-2 py-0.5 rounded bg-zinc-900/80 border border-white/5 text-[9px] font-mono text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>{syncedStatus}</span>
          </div>
        </div>

        {/* Desktop Navigation Items */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`relative px-4 py-2 font-mono text-[11px] tracking-[0.2em] font-medium transition-all duration-300 rounded ${
                  isActive
                    ? 'text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
                id={`nav-${item.id}`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 rounded-md bg-white/5 border border-white/10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  >
                    <div className="absolute bottom-0 left-1/4 right-1/4 h-[1.5px] bg-gradient-to-r from-violet-500 to-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
                  </motion.div>
                )}
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Controls Side (Search, Wishlist, Cart, Admin Toggle) */}
        <div className="flex items-center gap-2 sm:gap-4">
          
          {/* Animated Holographic Search Input */}
          <div className="relative flex items-center">
            {showSearch && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 180, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                className="absolute right-10 mr-2 flex items-center"
              >
                <input
                  type="text"
                  placeholder="Scan model spec..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-zinc-900/90 border border-white/10 rounded-md py-1.5 pl-3 pr-8 text-xs font-mono text-white focus:outline-none focus:border-violet-500/50"
                  autoFocus
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="absolute right-8 text-slate-400 hover:text-white">
                    <X size={12} />
                  </button>
                )}
                <button
                  onClick={handleVoiceSearch}
                  className={`absolute right-2 transition-colors ${
                    isListening ? 'text-cyan-400 animate-pulse' : 'text-slate-400 hover:text-violet-300'
                  }`}
                  title="Neural voice search sync"
                >
                  {isListening ? <Mic size={14} className="radar-pulse shrink-0 text-cyan-400" /> : <Mic size={14} />}
                </button>
              </motion.div>
            )}
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 text-slate-400 hover:text-white transition-colors"
              title="Search store models"
            >
              <Search size={18} />
            </button>
          </div>

          {/* Wishlist Trigger */}
          <button
            onClick={onOpenWishlist}
            className="p-2 text-slate-400 hover:text-white transition-colors relative"
            id="wishlist-btn"
            title="Sovereign Wishlist"
          >
            <Heart size={18} className={wishlistCount > 0 ? 'fill-pink-500/20 text-pink-500' : ''} />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-gradient-to-r from-pink-500 to-rose-500 text-[9px] font-mono font-bold text-white rounded-full flex items-center justify-center border border-black animate-pulse">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cyberpunk Cart Trigger */}
          <button
            onClick={onOpenCart}
            className={`p-2.5 rounded-lg border flex items-center lg:gap-2 transition-all duration-300 ${
              cartItemsCount > 0
                ? 'bg-zinc-900 border-violet-500/40 text-violet-300 hover:bg-violet-950/20'
                : 'text-slate-400 hover:text-white border-white/5 bg-transparent'
            }`}
            id="cart-btn"
            title="Cart storage modules"
          >
            <ShoppingBag size={18} className={cartItemsCount > 0 ? 'text-violet-400' : ''} />
            <span className="hidden lg:inline font-mono text-xs tracking-wider font-semibold">STORAGE</span>
            {cartItemsCount > 0 && (
              <span className="w-5 h-5 bg-gradient-to-r from-violet-500 to-cyan-500 text-[10px] font-mono font-bold text-white rounded-full flex items-center justify-center shadow-[0_0_8px_rgba(139,92,246,0.6)]">
                {cartItemsCount}
              </span>
            )}
          </button>

          {/* Admin Bypass Toggle Panel Button */}
          <button
            onClick={onOpenAdmin}
            className="p-2 text-slate-500 hover:text-amber-400 transition-colors relative"
            id="admin-trigger-btn"
            title="Matrix Core Override (Admin Settings)"
          >
            <ShieldAlert size={18} className="animate-pulse" />
            <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-amber-500 border border-black" />
          </button>

          {/* Mobile hamburger menu */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-slate-400 hover:text-white transition-colors block md:hidden"
            title="Display System Panels"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden border-t border-white/5 bg-black/95 px-4 pt-4 pb-6 space-y-3"
        >
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 font-mono text-[11px] tracking-[0.2em] font-medium rounded-lg transition-all ${
                  isActive
                    ? 'bg-white/5 border border-white/10 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </motion.div>
      )}
    </header>
  );
}
