import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, ShoppingCart, Check, BrainCircuit, ShieldCheck, Scale, Zap, Flame, Compass, RefreshCw } from 'lucide-react';
import { Product, PhoneColor, PhoneStorage } from '../types';

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (p: Product, c: PhoneColor, s: PhoneStorage) => void;
  allProducts: Product[];
  isWishlisted: boolean;
  onToggleWishlist: (p: Product) => void;
  onTriggerVoiceToast: (text: string) => void;
}

export default function ProductDetail({
  product,
  onClose,
  onAddToCart,
  allProducts,
  isWishlisted,
  onToggleWishlist,
  onTriggerVoiceToast
}: ProductDetailProps) {
  const [selectedColor, setSelectedColor] = useState<PhoneColor>(product.colors[0]);
  const [selectedStorage, setSelectedStorage] = useState<PhoneStorage>(product.storageOptions[0]);
  const [viewAngle, setViewAngle] = useState<'FRONT' | 'ANGLED' | 'DIAGNOSTIC'>('FRONT');
  const [scaleFactor, setScaleFactor] = useState(1.0);
  const [compareProductId, setCompareProductId] = useState<string>('');
  const [cartAdding, setCartAdding] = useState(false);

  // Derive target comparison model items
  const compareProduct = useMemo(() => {
    return allProducts.find(p => p.id === compareProductId) || null;
  }, [allProducts, compareProductId]);

  const finalPrice = product.price + selectedStorage.priceModifier;

  const handleCustomAddToCart = () => {
    setCartAdding(true);
    setTimeout(() => {
      onAddToCart(product, selectedColor, selectedStorage);
      setCartAdding(false);
      onTriggerVoiceToast(`Calibrated ${product.name} [${selectedColor.name} // ${selectedStorage.size}] added to orders.`);
    }, 800);
  };

  const toggleScale = () => {
    setScaleFactor((prev) => (prev === 1.0 ? 1.4 : 1.0));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/95 backdrop-blur-xl py-6 px-4 sm:px-6 lg:px-8 select-none"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Navigation title control bar */}
        <div className="flex justify-between items-center border-b border-white/5 pb-5 mb-8">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-3 py-1.5 border border-white/5 hover:border-white/20 bg-zinc-950 font-mono text-[10px] tracking-widest text-slate-400 hover:text-white rounded transition-all uppercase"
            >
              ← RETURN SHOWROOM
            </button>
            <span className="text-[10px] font-mono text-zinc-650 hidden sm:block">FIRMWARE VER: NXR_HUD_A52</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onToggleWishlist(product)}
              className="p-2 border border-white/5 hover:border-pink-500/30 rounded-lg text-slate-400 hover:text-pink-500 transition-colors"
              title="Toggle sovereign buffer storage"
            >
              <Heart size={16} className={isWishlisted ? 'fill-pink-500 text-pink-500' : ''} />
            </button>
            
            <button
              onClick={onClose}
              className="p-2 border border-white/5 hover:border-rose-500/30 bg-zinc-950 rounded-lg text-slate-400 hover:text-rose-500 transition-colors"
              title="Close core control sheet"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Major Grid splitting device viewport from specs & controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* L. LEFT COLUMN: VIRTUAL 3D DEVICE VIEWPORT (5 COLS) */}
          <div className="lg:col-span-5 flex flex-col justify-between items-center glass-panel rounded-2xl p-6 border border-white/5 min-h-[520px] relative overflow-hidden">
            
            {/* Ambient glowing radial spotlight matching selected hue */}
            <div
              className="absolute w-44 h-44 rounded-full blur-[80px] opacity-25 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-500"
              style={{ backgroundColor: selectedColor.hex }}
            />

            {/* Matrix technical indicators */}
            <div className="w-full flex justify-between items-center mb-4 text-[9px] font-mono text-slate-500">
              <span className="flex items-center gap-1">
                <Compass size={10} className="animate-spin" style={{ animationDuration: '6s' }} />
                PERSPECTIVE: {viewAngle}
              </span>
              <span>ZOOM_RATIO: x{scaleFactor.toFixed(1)}</span>
            </div>

            {/* Main zoomable visual device */}
            <div className="flex-1 flex items-center justify-center relative w-full h-80 overflow-hidden cursor-crosshair">
              
              <motion.div
                animate={{
                  scale: scaleFactor,
                  rotate: viewAngle === 'ANGLED' ? 15 : viewAngle === 'DIAGNOSTIC' ? -10 : 0
                }}
                transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                className="relative w-40 h-64 flex items-center justify-center select-none"
              >
                {/* Holographic matrix grids overlay on DIAGNOSTIC perspective */}
                {viewAngle === 'DIAGNOSTIC' && (
                  <div className="absolute inset-x-[-2vw] inset-y-[-1vh] border border-dashed border-cyan-400/30 rounded-3xl flex flex-col justify-between p-3 pointer-events-none">
                    <span className="text-[7px] font-mono text-cyan-400">ALIGN_SYSTEM</span>
                    <span className="text-[7px] font-mono text-cyan-400 text-right">SPECTRUM_STABLE</span>
                  </div>
                )}

                {/* Simulated Graphene Mobile casing */}
                <div 
                  className={`w-full h-full rounded-[38px] border-[4px] border-zinc-800 bg-zinc-950 p-2 flex flex-col justify-between overflow-hidden relative shadow-2xl transition-all duration-300 ${
                    viewAngle === 'DIAGNOSTIC' ? 'border-dashed border-cyan-400/40 shadow-[0_0_20px_rgba(6,182,212,0.15)] bg-slate-950/90' : ''
                  }`}
                >
                  
                  {/* Outer glow overlay on regular views */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-14 h-4 bg-black rounded-lg" />
                  
                  {/* Diagonal glare sweep line */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-150%] animate-[shimmer_6s_infinite]" />

                  {/* Body elements changes depending on perspective */}
                  <div className="flex-1 flex flex-col items-center justify-center py-4">
                    {viewAngle === 'DIAGNOSTIC' ? (
                      /* Fully customized blueprint logic nodes design */
                      <div className="w-full text-center space-y-2 select-none">
                        <BrainCircuit size={32} className="mx-auto text-cyan-400 animate-pulse" />
                        <div className="border border-white/5 rounded p-1.5 bg-zinc-900/60 font-mono text-[7px] text-left max-w-[120px] mx-auto space-y-1">
                          <span className="text-violet-400 font-bold block">SPEC CALIB:</span>
                          <span className="text-slate-400 block">✓ {product.specs.processor.split(' ')[0]}</span>
                          <span className="text-slate-400 block">✓ R: {product.specs.ram}</span>
                          <span className="text-slate-400 block">✓ N: {product.specs.neuralScore}% ALIGN</span>
                        </div>
                      </div>
                    ) : (
                      /* Regular screen style */
                      <div className="relative text-center w-full">
                        {/* Dynamic background circle matching coloring custom hex */}
                        <div
                          className="absolute w-20 h-20 rounded-full blur-2xl left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30"
                          style={{ backgroundColor: selectedColor.hex }}
                        />
                        {/* High-end decorative ring */}
                        <div className="relative w-24 h-24 rounded-full border-2 border-slate-900 flex flex-col items-center justify-center font-mono text-white">
                          <span className="text-[8px] text-zinc-500 font-light leading-none uppercase">NEURAL COMP</span>
                          <span className="text-xl font-bold tracking-tighter text-shiny-hologram select-none">{product.specs.neuralScore}%</span>
                          <span className="text-[6px] text-green-400 font-bold leading-none mt-1 animate-pulse">ACTIVE_LINK</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Hardware details details markup */}
                  <div className="relative z-10 font-mono text-[6.5px] text-slate-500 flex justify-between px-1">
                    <span>SECTOR_P5</span>
                    <span>NXR // SOVEREIGN</span>
                  </div>

                  {/* Glowing lower bezel border overlay */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-1.5 transition-colors duration-500"
                    style={{ backgroundColor: selectedColor.hex, boxShadow: `0 -1px 12px ${selectedColor.hex}` }}
                  />

                </div>
              </motion.div>

            </div>

            {/* Interaction Perspective & Zoom Controls Panel */}
            <div className="w-full grid grid-cols-4 gap-1.5 mt-4">
              
              {/* Perspective Angle Switchers */}
              {[
                { angle: 'FRONT', label: 'Flat View' },
                { angle: 'ANGLED', label: '3D Angle' },
                { angle: 'DIAGNOSTIC', label: 'Logical' }
              ].map((token) => (
                <button
                  key={token.angle}
                  onClick={() => setViewAngle(token.angle as any)}
                  className={`py-1.5 rounded font-mono text-[8.5px] tracking-wider transition-all border ${
                    viewAngle === token.angle
                      ? 'border-violet-500 bg-violet-950/20 text-white font-bold'
                      : 'border-white/5 hover:border-white/10 text-slate-500'
                  }`}
                >
                  {token.label.toUpperCase()}
                </button>
              ))}

              {/* Digital Zoom Toggle button */}
              <button
                onClick={toggleScale}
                className="py-1.5 rounded font-mono text-[8.5px] tracking-wider border border-white/5 hover:border-cyan-500/30 text-cyan-400 bg-zinc-950/30 font-bold hover:bg-cyan-950/10 transition-all"
              >
                {scaleFactor === 1.0 ? 'ZOOM IN' : 'ZOOM OUT'}
              </button>

            </div>

          </div>

          {/* R. RIGHT COLUMN: CUSTOMIZATION CONTROLS, COMPRESSION & DETAILS (7 COLS) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Brand Title specs sheets */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
                <span className="text-[10px] font-mono text-cyan-400 tracking-[0.25em] uppercase">{product.category} system module</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-widest uppercase">{product.name}</h1>
              <p className="text-sm font-mono text-slate-400 italic font-light">"{product.tagline}"</p>
            </div>

            {/* Core mechanical descriptions */}
            <div className="glass-panel rounded-xl p-4 sm:p-5 border-white/5 bg-zinc-950/35">
              <span className="text-[8px] font-mono text-slate-500 block uppercase tracking-widest mb-1.5">HARDWARE RETINAL MATRIX REPORT</span>
              <p className="text-xs text-slate-350 tracking-wide font-light leading-relaxed">
                {product.longDescription}
              </p>
            </div>

            {/* Custom Interactive Color and Memory Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Color configurations */}
              <div className="glass-panel border-white/5 p-4 rounded-xl flex flex-col justify-between">
                <div>
                  <span className="text-[9px] font-mono text-slate-500 tracking-wider block mb-2 uppercase">CHASSIS CORE GLow</span>
                  <div className="text-xs font-bold text-white tracking-wide uppercase font-mono">{selectedColor.name}</div>
                </div>
                <div className="flex gap-2.5 mt-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={`w-6 h-6 rounded-full border relative flex items-center justify-center transition-all ${
                        selectedColor.name === color.name ? 'scale-110 border-white ring-1 ring-violet-500/40' : 'border-transparent hover:scale-105'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    >
                      {selectedColor.name === color.name && (
                        <Check size={10} className="text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Memory block tier selectors */}
              <div className="glass-panel border-white/5 p-4 rounded-xl flex flex-col justify-between">
                <div>
                  <span className="text-[9px] font-mono text-slate-500 tracking-wider block mb-2 uppercase">STORAGE BUFFER ALLOCATION</span>
                  <div className="text-xs font-bold text-cyan-400 font-mono tracking-wide">
                    {selectedStorage.size}
                    {selectedStorage.priceModifier > 0 ? ` (+ $${selectedStorage.priceModifier})` : ' (Base Core)'}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-3 select-none">
                  {product.storageOptions.map((opt) => (
                    <button
                      key={opt.size}
                      onClick={() => setSelectedStorage(opt)}
                      className={`px-2 py-1 border rounded text-[9.5px] font-mono tracking-tight transition-all uppercase ${
                        selectedStorage.size === opt.size
                          ? 'border-violet-500 bg-violet-950/20 text-white'
                          : 'border-white/5 hover:border-white/10 text-slate-400 bg-transparent'
                      }`}
                    >
                      {opt.size.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Injected Hardware Specs details comparison block */}
            <div className="glass-panel rounded-xl border-white/5 p-4 sm:p-5">
              
              <div className="flex items-center gap-1.5 mb-4 border-b border-white/5 pb-2.5">
                <BrainCircuit size={15} className="text-violet-400" />
                <span className="text-[10px] font-mono tracking-widest text-slate-300 uppercase">SYSTEM SPECIFICATION TELEMETRY</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left font-mono">
                {[
                  { label: 'COPROCESSOR', val: product.specs.processor },
                  { label: 'RAM MATRIX', val: product.specs.ram },
                  { label: 'ACTIVE GLASS DISPLAY', val: product.specs.display },
                  { label: 'SOLID BATTERY LIFE', val: product.specs.battery },
                  { label: 'RETINAL OPTICS', val: product.specs.camera },
                  { label: 'HOLOGRAM CAPABLE', val: product.specs.holoCapable ? 'YES // DUAL-EMIT' : 'NO // FLAT-ONLY' },
                  { label: 'SECURE CIPHER', val: product.specs.quantumSecure ? 'QUANTUM V5 SOLID' : 'STANDARD CHIP_V4' },
                  { label: 'AI SYMMETRY INDEX', val: `${product.specs.neuralScore}% STABILITY` }
                ].map((spec) => (
                  <div key={spec.label} className="p-2 rounded bg-zinc-950/40 border border-white/5">
                    <div className="text-[7.5px] text-slate-500 uppercase tracking-widest">{spec.label}</div>
                    <div className="text-[10px] font-medium text-slate-300 mt-1 line-clamp-2 leading-tight uppercase">{spec.val}</div>
                  </div>
                ))}
              </div>

            </div>

            {/* AI SYSTEM SPEC COMPARISON SLOT */}
            <div className="glass-panel rounded-xl border-violet-500/10 p-4 bg-violet-950/5">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3 mb-3">
                <div className="flex items-center gap-1.5">
                  <Scale size={14} className="text-cyan-400 animate-pulse" />
                  <span className="text-[10px] font-mono tracking-widest text-white uppercase">AI MATRIX COMPARISON HARMONIZER</span>
                </div>
                
                {/* Product to compare selection */}
                <select
                  value={compareProductId}
                  onChange={(e) => setCompareProductId(e.target.value)}
                  className="bg-zinc-900 border border-white/10 rounded px-2.5 py-1 text-[10px] font-mono text-white focus:outline-none"
                >
                  <option value="">-- CONFIGURE COMPARE --</option>
                  {allProducts.filter(p => p.id !== product.id).map(p => (
                    <option key={p.id} value={p.id}>{p.name.toUpperCase()}</option>
                  ))}
                </select>
              </div>

              {/* Specifications comparison result matrix table render */}
              {compareProduct ? (
                <div className="space-y-2.5 font-mono text-[10px]">
                  
                  {/* Grid row header title */}
                  <div className="grid grid-cols-3 text-slate-500 border-b border-white/5 pb-1 uppercase tracking-widest text-[8px]">
                    <span>PARAMETER</span>
                    <span className="text-violet-400 text-left font-bold">{product.name.split(' ')[1] || product.name}</span>
                    <span className="text-cyan-400 text-left font-bold">{compareProduct.name.split(' ')[1] || compareProduct.name}</span>
                  </div>

                  {[
                    { label: 'Processor Core', key1: product.specs.processor, key2: compareProduct.specs.processor },
                    { label: 'RAM Limits', key1: product.specs.ram, key2: compareProduct.specs.ram },
                    { label: 'Display Optics', key1: product.specs.display, key2: compareProduct.specs.display },
                    { label: 'Battery Poly', key1: product.specs.battery, key2: compareProduct.specs.battery },
                    { label: 'Neural Index Score', key1: `${product.specs.neuralScore}%`, key2: `${compareProduct.specs.neuralScore}%` }
                  ].map((row) => (
                    <div key={row.label} className="grid grid-cols-3 border-b border-white/5 pb-1 text-slate-300">
                      <span className="text-slate-550 uppercase text-[9px]">{row.label}</span>
                      <span className="text-left font-bold text-violet-300">{row.key1}</span>
                      <span className="text-left font-bold text-cyan-300">{row.key2}</span>
                    </div>
                  ))}

                  <div className="flex justify-between items-center text-[8.5px] text-green-400 uppercase pt-1">
                    <span>ALIGNMENT COMPLETE</span>
                    <button onClick={() => setCompareProductId('')} className="text-slate-500 hover:text-white uppercase transition-colors">
                      CLEAR PREVIEW
                    </button>
                  </div>

                </div>
              ) : (
                <div className="text-center py-4 text-slate-500 font-mono text-[9px] uppercase tracking-widest">
                  Configure a target system in the dropdown module to start specs comparison
                </div>
              )}

            </div>

            {/* Bottom billing block & customized launcher buy CTA */}
            <div className="glass-panel border-white/5 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              
              <div className="text-left sm:border-r border-white/5 sm:pr-8">
                <span className="text-[9px] font-mono text-slate-550 block">FINAL CREDIT INVESTMENT</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-white tracking-widest">${finalPrice}</span>
                  {selectedStorage.priceModifier > 0 && (
                    <span className="text-[10px] font-mono text-cyan-400">Upgrade Active</span>
                  )}
                </div>
                <span className="text-[8px] font-mono text-slate-500 block">STANDARD EMI OR SECURE CARD PROTOCOLS ALLOWED</span>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={handleCustomAddToCart}
                  disabled={cartAdding || product.availability === 'Sold Out'}
                  className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-200 text-black font-semibold font-mono text-[11px] tracking-[0.2em] rounded-xl flex items-center justify-center gap-2 group transition-all"
                >
                  {cartAdding ? (
                    <>
                      <RefreshCw size={13} className="animate-spin" />
                      <span>SYNCHRONIZING MODULE...</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={13} />
                      <span>LAUNCH SECURE ACQUISITION</span>
                    </>
                  )}
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </motion.div>
  );
}
