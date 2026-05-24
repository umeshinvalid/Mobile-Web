import React, { useState, MouseEvent } from 'react';
import { motion } from 'motion/react';
import { Heart, Stars, ShoppingCart, Info, Activity, ShieldAlert } from 'lucide-react';
import { Product, PhoneColor, PhoneStorage } from '../types';

interface ProductCardProps {
  key?: React.Key | null | undefined;
  product: Product;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, color: PhoneColor, storage: PhoneStorage) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
}

export default function ProductCard({
  product,
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  isWishlisted
}: ProductCardProps) {
  const [selectedColor, setSelectedColor] = useState<PhoneColor>(product.colors[0]);
  const [selectedStorage, setSelectedStorage] = useState<PhoneStorage>(product.storageOptions[0]);
  const [isHovered, setIsHovered] = useState(false);
  const [cartAdding, setCartAdding] = useState(false);

  // Derive final price with storage upgrade mods
  const currentPrice = product.price + selectedStorage.priceModifier;

  const handleAddToCartClick = (e: MouseEvent) => {
    e.stopPropagation();
    setCartAdding(true);
    setTimeout(() => {
      onAddToCart(product, selectedColor, selectedStorage);
      setCartAdding(false);
    }, 800);
  };

  const selectColorHandler = (e: MouseEvent, color: PhoneColor) => {
    e.stopPropagation();
    setSelectedColor(color);
  };

  const selectStorageHandler = (e: MouseEvent, storage: PhoneStorage) => {
    e.stopPropagation();
    setSelectedStorage(storage);
  };

  const toggleWishlistHandler = (e: MouseEvent) => {
    e.stopPropagation();
    onToggleWishlist(product);
  };

  const getAvailabilityClass = (status: string) => {
    switch (status) {
      case 'In Stock': return 'text-emerald-400 border-emerald-500/20 bg-emerald-950/20';
      case 'Limited Drop': return 'text-amber-400 border-amber-500/20 bg-amber-950/20';
      case 'Pre-Order': return 'text-cyan-400 border-cyan-500/20 bg-cyan-950/20';
      default: return 'text-rose-400 border-rose-500/20 bg-rose-950/20';
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -6 }}
      onClick={() => onSelectProduct(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative product-card group cursor-pointer glass-panel rounded-2xl p-5 overflow-hidden border border-white/5 hover:border-white/10 transition-all duration-300 flex flex-col justify-between select-none"
    >
      {/* Background active glow linked to color selection */}
      <div
        className="absolute -top-12 -right-12 w-36 h-36 rounded-full blur-[60px] opacity-20 group-hover:opacity-45 transition-opacity duration-500 pointer-events-none"
        style={{ backgroundColor: selectedColor.hex }}
      />

      {/* Futuristic technical background grid blueprint on hover */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:16px_16px] -z-10 transition-opacity duration-300 opacity-0 group-hover:opacity-100 pointer-events-none" 
      />

      {/* Top badges bar */}
      <div className="flex justify-between items-center mb-4 relative z-10">
        <span className={`px-2.5 py-0.5 rounded-full border text-[9px] font-mono tracking-widest ${getAvailabilityClass(product.availability)}`}>
          {product.availability.toUpperCase()}
        </span>
        
        <div className="flex items-center gap-1">
          {product.isPrototype && (
            <span className="text-[9px] font-mono border border-cyan-500/20 bg-cyan-950/20 px-1.5 py-0.5 text-cyan-400 rounded-md shadow-[0_0_8px_rgba(6,182,212,0.3)] animate-pulse">
              PROTOTYPE
            </span>
          )}
          <button
            onClick={toggleWishlistHandler}
            className="p-1.5 rounded-lg bg-zinc-900 border border-white/5 hover:border-pink-500/30 text-slate-400 hover:text-pink-500 transition-colors"
            title="Add to neural wishlist buffer"
          >
            <Heart size={14} className={isWishlisted ? 'fill-pink-500 text-pink-500' : ''} />
          </button>
        </div>
      </div>

      {/* Futuristic CSS Vector Device Mockup viewport */}
      <div className="relative h-48 flex items-center justify-center my-2 select-none">
        
        {/* Holographic glowing lines surrounding active selection */}
        {isHovered && (
          <div className="absolute inset-x-8 inset-y-2 border border-dashed border-cyan-500/20 rounded-2xl flex items-center justify-between px-2 pointer-events-none">
            <span className="text-[7px] font-mono text-cyan-400/50">HOLO-EMIT</span>
            <span className="text-[7px] font-mono text-cyan-400/50">Q_ALIGN</span>
          </div>
        )}

        <div className="relative w-28 h-44 rounded-[28px] border-[3px] border-zinc-800 bg-zinc-950 shadow-lg px-1 py-4 flex flex-col justify-between overflow-hidden">
          
          {/* Dynamic glare lines sweeping device */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out" />

          {/* Notch display */}
          <div className="h-1.5 w-10 bg-black rounded-full mx-auto" />

          {/* Core wallpaper elements (changes opacity on hover for the futuristic schematic layout!) */}
          <div className="flex-1 flex flex-col items-center justify-center transition-all duration-300">
            {isHovered ? (
              // Wireframe schematic view on hover!
              <div className="text-center font-mono space-y-1 text-cyan-400/80">
                <Activity size={18} className="mx-auto text-cyan-400 animate-pulse" />
                <div className="text-[7px] tracking-wider font-extrabold uppercase">{product.specs.processor.split(' ')[0]}</div>
                <div className="text-[6px] tracking-widest text-slate-500">NEURAL: {product.specs.neuralScore}%</div>
              </div>
            ) : (
              // Normal stylish viewport view
              <div className="text-center relative">
                {/* Visual accent background sphere */}
                <div
                  className="absolute w-12 h-12 rounded-full blur-xl left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all opacity-40"
                  style={{ backgroundColor: selectedColor.hex }}
                />
                
                {/* Cyberpunk circular widget */}
                <div className="relative w-14 h-14 rounded-full border border-white/5 flex flex-col items-center justify-center font-mono text-white">
                  <span className="text-[7px] text-slate-500 leading-none">NEURAL</span>
                  <span className="text-xs font-bold text-shiny-hologram">{product.specs.neuralScore}</span>
                  <span className="text-[5px] text-emerald-400 leading-none">STABLE</span>
                </div>
              </div>
            )}
          </div>

          {/* Bottom hardware edge */}
          <div className="flex justify-between px-1.5 text-[5px] font-mono text-zinc-600">
            <span>CRYP_V5</span>
            <span>NEXORA_NXR</span>
          </div>

          {/* Color accent highlight frame on bottom */}
          <div
            className="absolute bottom-0 left-0 right-0 h-1 transition-all pointer-events-none duration-300"
            style={{ backgroundColor: selectedColor.hex, boxShadow: `0 -1px 8px ${selectedColor.hex}` }}
          />
        </div>

        {/* Small detail telemetry details floating next to phone */}
        <div className="absolute left-1/2 -translate-x-20 top-1/2 -translate-y-1/2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="glass-panel border-white/10 rounded px-1.5 py-0.5 text-[7px] font-mono text-white">
            {product.specs.ram}
          </div>
          <div className="glass-panel border-white/10 rounded px-1.5 py-0.5 text-[7px] font-mono text-slate-400">
            {selectedStorage.size.split(' ')[0]} GIG
          </div>
        </div>

      </div>

      {/* Brand & Name specs block */}
      <div className="mt-2 space-y-1 relative z-10">
        <h3 className="font-extrabold text-sm tracking-widest text-white group-hover:text-violet-300 transition-colors">
          {product.name}
        </h3>
        <p className="text-[10px] font-mono text-slate-400 tracking-wide line-clamp-1">
          {product.tagline}
        </p>

        {/* Neural score capability indicator bar */}
        <div className="flex items-center gap-1 pt-1">
          <span className="text-[7.5px] font-mono text-slate-500">NEURAL SCORE:</span>
          <div className="flex-1 bg-zinc-900 h-[3px] rounded-full overflow-hidden border border-white/5">
            <div
              className="bg-gradient-to-r from-violet-500 to-cyan-400 h-full"
              style={{ width: `${product.specs.neuralScore}%` }}
            />
          </div>
          <span className="text-[7.5px] font-mono font-bold text-cyan-400">{product.specs.neuralScore}</span>
        </div>
      </div>

      {/* Custom configuration details (Color Bubbles & Storage Chips) */}
      <div className="my-4 space-y-2.5 relative z-10 border-t border-b border-white/5 py-3">
        {/* Color variants bubbles */}
        <div className="flex items-center justify-between">
          <span className="text-[9px] font-mono text-slate-500">HUE MODES</span>
          <div className="flex gap-1.5">
            {product.colors.map((color) => (
              <button
                key={color.name}
                onClick={(e) => selectColorHandler(e, color)}
                className={`w-3.5 h-3.5 rounded-full border relative flex items-center justify-center transition-all ${
                  selectedColor.name === color.name ? 'scale-125 border-white ring-1 ring-violet-500/40' : 'border-transparent hover:scale-110'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>
        </div>

        {/* Storage tiers selection */}
        <div className="flex items-center justify-between">
          <span className="text-[9px] font-mono text-slate-500 font-medium">CAPACITY</span>
          <div className="flex gap-1 max-w-[150px] overflow-x-auto select-none">
            {product.storageOptions.map((storage) => (
              <button
                key={storage.size}
                onClick={(e) => selectStorageHandler(e, storage)}
                className={`px-1.5 py-0.5 rounded text-[8px] font-mono tracking-tighter border transition-all shrink-0 ${
                  selectedStorage.size === storage.size
                    ? 'border-violet-500 text-white bg-violet-950/35 shadow-[0_0_8px_rgba(139,92,246,0.2)]'
                    : 'border-white/5 hover:border-white/10 text-slate-400 bg-transparent'
                }`}
              >
                {storage.size.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Price block and quick launcher button */}
      <div className="flex items-center justify-between pt-1 relative z-10">
        <div>
          {product.originalPrice > product.price && (
            <span className="text-[10px] font-mono line-through text-slate-500 block">
              ${product.originalPrice + selectedStorage.priceModifier}
            </span>
          )}
          <span className="text-sm font-black tracking-widest text-white leading-none">
            ${currentPrice}
          </span>
        </div>

        <button
          onClick={handleAddToCartClick}
          disabled={cartAdding || product.availability === 'Sold Out'}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-mono text-[9px] font-bold tracking-widest transition-all ${
            product.availability === 'Sold Out'
              ? 'bg-zinc-850 text-slate-500 border border-transparent cursor-not-allowed'
              : 'bg-zinc-900 hover:bg-white text-slate-300 hover:text-black border border-white/10 hover:border-transparent active:scale-95'
          }`}
          id={`add-cart-btn-${product.id}`}
        >
          {cartAdding ? (
            <>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping inline-block" />
              <span>SYNCING...</span>
            </>
          ) : (
            <>
              <ShoppingCart size={11} />
              <span>LAUNCH ORDER</span>
            </>
          )}
        </button>
      </div>

    </motion.div>
  );
}
