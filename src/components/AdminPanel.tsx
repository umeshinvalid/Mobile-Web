import { useState } from 'react';
import { motion } from 'motion/react';
import { Sliders, RefreshCw, Star, Sparkles, Save, ShieldCheck, ToggleLeft, ToggleRight, Hammer } from 'lucide-react';
import { Product, AdminSettings } from '../types';

interface AdminPanelProps {
  products: Product[];
  onUpdateProducts: (updated: Product[]) => void;
  adminSettings: AdminSettings;
  onUpdateAdminSettings: (updated: AdminSettings) => void;
  onClose: () => void;
  onRestoreDefaults: () => void;
  onTriggerVoiceToast: (text: string) => void;
}

export default function AdminPanel({
  products,
  onUpdateProducts,
  adminSettings,
  onUpdateAdminSettings,
  onClose,
  onRestoreDefaults,
  onTriggerVoiceToast
}: AdminPanelProps) {
  const [editedSettings, setEditedSettings] = useState<AdminSettings>({ ...adminSettings });
  const [localProducts, setLocalProducts] = useState<Product[]>([...products]);

  const handleSaveSettings = () => {
    onUpdateAdminSettings(editedSettings);
    onUpdateProducts(localProducts);
    onTriggerVoiceToast('Matrix Overridden: Global firmware updates synchronized successfully.');
    onClose();
  };

  const handleProductPriceChange = (id: string, newPrice: number) => {
    setLocalProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, price: newPrice } : p))
    );
  };

  const handleProductNameChange = (id: string, newName: string) => {
    setLocalProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, name: newName } : p))
    );
  };

  const handleProductAvailabilityChange = (id: string, value: any) => {
    setLocalProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, availability: value } : p))
    );
  };

  const handleProductPrototypeToggle = (id: string) => {
    setLocalProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isPrototype: !p.isPrototype } : p))
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      className="fixed inset-y-0 right-0 z-50 w-full max-w-xl bg-black/95 border-l border-white/5 shadow-2xl overflow-y-auto p-6 font-mono select-none"
    >
      {/* Title bar heading */}
      <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-6">
        <div className="flex items-center gap-2 text-amber-400">
          <Hammer size={18} className="animate-spin" style={{ animationDuration: '8s' }} />
          <h2 className="text-sm font-bold tracking-widest uppercase">CORE FIRMWARE OVERRIDE (ADMIN)</h2>
        </div>
        <button
          onClick={onClose}
          className="p-1 px-3 border border-white/5 hover:border-white/10 text-xs text-slate-400 hover:text-white rounded bg-zinc-900"
        >
          CLOSE
        </button>
      </div>

      <div className="space-y-6">
        
        {/* Visual system parameters card */}
        <div className="glass-panel border-white/5 rounded-xl p-4 space-y-4">
          <div className="flex items-center gap-1.5 text-xs text-violet-400 uppercase">
            <Sparkles size={13} />
            <span>GLOBAL ATMOSPHERIC LIGHTING</span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            {/* Color Accent selection list */}
            <div>
              <label className="text-[9px] text-slate-500 block mb-1">ACCENT THEME GRAPHICS</label>
              <select
                value={editedSettings.accentTheme}
                onChange={(e: any) => setEditedSettings({ ...editedSettings, accentTheme: e.target.value })}
                className="w-full bg-zinc-900 border border-white/10 rounded p-1.5 py-2 text-[10px] text-white focus:outline-none"
              >
                <option value="purple-blue">PURPLE-BLUE CYBERPUNK</option>
                <option value="monochrome-silver">MONOCHROME SILVER APPLE</option>
                <option value="neon-green">NEON GREEN MATRIX</option>
              </select>
            </div>

            {/* Micro glows select controller */}
            <div>
              <label className="text-[9px] text-slate-500 block mb-1">GLOW SHOT INTENSITY</label>
              <select
                value={editedSettings.cyberpunkGlowIntensity}
                onChange={(e: any) => setEditedSettings({ ...editedSettings, cyberpunkGlowIntensity: e.target.value })}
                className="w-full bg-zinc-900 border border-white/10 rounded p-1.5 py-2 text-[10px] text-slate-300 focus:outline-none"
              >
                <option value="subtle">SUBTLE (APPLE MINIMALISM)</option>
                <option value="vibrant">VIBRANT COSMIC</option>
                <option value="hyper">HYPER NEON FLARES</option>
              </select>
            </div>
          </div>
        </div>

        {/* Hero Marquee overrides */}
        <div className="glass-panel border-white/5 rounded-xl p-4 space-y-4">
          <span className="text-xs text-violet-400 uppercase flex items-center gap-1.5">
            <Sliders size={13} />
            MASTHEAD BANNER CONTROL
          </span>

          <div className="space-y-3 text-xs col-span-2">
            <div>
              <label className="text-[9px] text-slate-500 block mb-1">FIRMWARE ANNOUNCEMENT STRIP TEXT</label>
              <input
                type="text"
                value={editedSettings.activePromoText}
                onChange={(e) => setEditedSettings({ ...editedSettings, activePromoText: e.target.value })}
                className="w-full bg-zinc-900 border border-white/10 rounded p-2 text-[10px] text-white focus:outline-none"
              />
            </div>

            {/* Flash Sale features toggle */}
            <div className="grid grid-cols-2 gap-4 items-center">
              <div>
                <label className="text-[9px] text-slate-500 block mb-1">VOICE DECRYPT ENGINE</label>
                <button
                  type="button"
                  onClick={() => setEditedSettings({ ...editedSettings, voiceSearchEnabled: !editedSettings.voiceSearchEnabled })}
                  className="flex items-center gap-2 text-slate-300 py-1"
                >
                  {editedSettings.voiceSearchEnabled ? (
                    <ToggleRight size={24} className="text-emerald-400" />
                  ) : (
                    <ToggleLeft size={24} className="text-slate-600" />
                  )}
                  <span className="text-[10px]">{editedSettings.voiceSearchEnabled ? "ENABLED" : "RESTRICTED"}</span>
                </button>
              </div>

              <div>
                <label className="text-[9px] text-slate-500 block mb-1">CYBER OVERALL DISCOUNT BANNER</label>
                <button
                  type="button"
                  onClick={() => setEditedSettings({ ...editedSettings, enableFlashSale: !editedSettings.enableFlashSale })}
                  className="flex items-center gap-2 text-slate-300 py-1"
                >
                  {editedSettings.enableFlashSale ? (
                    <ToggleRight size={24} className="text-cyan-400" />
                  ) : (
                    <ToggleLeft size={24} className="text-slate-600" />
                  )}
                  <span className="text-[10px]">{editedSettings.enableFlashSale ? "ACTIVE DISPLAY" : "OFFLINE"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Database individual product specifications modifier list */}
        <div className="glass-panel border-white/5 rounded-xl p-4 space-y-4">
          <span className="text-xs text-violet-400 uppercase flex items-center gap-1.5">
            <Sliders size={13} />
            INDIVIDUAL HARDWARE PRICING & CLASSIFIER
          </span>

          <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
            {localProducts.map((p) => (
              <div key={p.id} className="p-3 bg-zinc-950/60 rounded border border-white/5 text-xs space-y-2.0">
                <div className="flex justify-between items-center pb-1 border-b border-white/5">
                  <span className="text-[8.5px] text-slate-500 uppercase">MODEL: {p.id.toUpperCase()}</span>
                  <button
                    onClick={() => handleProductPrototypeToggle(p.id)}
                    className={`px-1 rounded text-[7.5px] border ${
                      p.isPrototype
                        ? 'border-cyan-500 text-cyan-400 bg-cyan-950/20'
                        : 'border-white/5 text-slate-600'
                    }`}
                  >
                    PROTOTYPE STATE
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 text-[10px]">
                  <div>
                    <label className="text-[8px] text-slate-500 block mb-0.5">EDIT NAME</label>
                    <input
                      type="text"
                      value={p.name}
                      onChange={(e) => handleProductNameChange(p.id, e.target.value)}
                      className="w-full bg-zinc-900 border border-white/10 rounded py-1 px-1.5 text-[9.5px] text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[8px] text-slate-500 block mb-0.5">BASE CREDITS</label>
                    <input
                      type="number"
                      value={p.price}
                      onChange={(e) => handleProductPriceChange(p.id, parseInt(e.target.value) || 0)}
                      className="w-full bg-zinc-900 border border-white/10 rounded py-1 px-1.5 text-[9.5px] text-white focus:outline-none"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="text-[8px] text-slate-500 block mb-0.5">PRODUCTION AVAILABILITY</label>
                    <select
                      value={p.availability}
                      onChange={(e) => handleProductAvailabilityChange(p.id, e.target.value as any)}
                      className="w-full bg-zinc-900 border border-white/10 rounded py-1.5 px-1 text-[9px] text-white focus:outline-none"
                    >
                      <option value="In Stock">IN STOCK</option>
                      <option value="Limited Drop">LIMITED DROP</option>
                      <option value="Pre-Order">PRE-ORDER</option>
                      <option value="Sold Out">SOLD OUT</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Global actions row */}
        <div className="space-y-3 pt-4 border-t border-white/5">
          <button
            onClick={handleSaveSettings}
            className="w-full py-4.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-black text-xs font-extrabold tracking-widest rounded-xl flex items-center justify-center gap-2 transition-all shadow-xl shadow-indigo-950/25"
          >
            <Save size={14} />
            TRANSMIT OVERRIDES TO TELEMETRY
          </button>

          <button
            onClick={() => {
              onRestoreDefaults();
              onTriggerVoiceToast("Default configurations calibrated. Override flags reset.");
              onClose();
            }}
            className="w-full py-3.5 border border-white/5 hover:border-white/20 text-slate-500 hover:text-white text-[10px] tracking-widest rounded-xl transition-all"
          >
            RESTORE DEFAULT FACTORY VALUES
          </button>
        </div>

      </div>
    </motion.div>
  );
}
