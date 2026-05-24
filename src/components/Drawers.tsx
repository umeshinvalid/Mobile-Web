import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Heart, ShoppingCart, ArrowRight, ShieldCheck, ShoppingBag, Plus, Minus } from 'lucide-react';
import { CartItem, Product } from '../types';

interface DrawersProps {
  isOpen: boolean;
  type: 'cart' | 'wishlist';
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveFromCart: (itemId: string) => void;
  onUpdateCount: (itemId: string, increment: number) => void;
  wishlistProducts: Product[];
  onRemoveFromWishlist: (p: Product) => void;
  onMoveToCart: (p: Product) => void;
  onCheckout: () => void;
}

export default function Drawers({
  isOpen,
  type,
  onClose,
  cartItems,
  onRemoveFromCart,
  onUpdateCount,
  wishlistProducts,
  onRemoveFromWishlist,
  onMoveToCart,
  onCheckout
}: DrawersProps) {
  if (!isOpen) return null;

  const getSubtotal = () => {
    return cartItems.reduce((acc, item) => {
      const p = item.product.price + item.selectedStorage.priceModifier;
      return acc + (p * item.quantity);
    }, 0);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden select-none">
        
        {/* Transparent dark background backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 350, damping: 35 }}
            className="w-screen max-w-md bg-zinc-950/95 border-l border-white/5 shadow-2 flex flex-col justify-between"
          >
            
            {/* Header section titles */}
            <div className="p-5 border-b border-white/5 flex justify-between items-center bg-black/40">
              <div className="flex items-center gap-2">
                {type === 'cart' ? (
                  <>
                    <ShoppingBag size={16} className="text-violet-400" />
                    <span className="font-mono text-xs tracking-widest text-white uppercase font-bold">CONFIGURED HARDWARE SECURE CART</span>
                  </>
                ) : (
                  <>
                    <Heart size={16} className="text-pink-500" />
                    <span className="font-mono text-xs tracking-widest text-white uppercase font-bold">SOVEREIGN Wishlist BUFFER</span>
                  </>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-1 px-3 border border-white/5 hover:border-white/10 text-slate-400 hover:text-white rounded text-xs font-mono bg-zinc-900"
              >
                CLOSE
              </button>
            </div>

            {/* Core scroll content products arrays */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              
              {type === 'cart' ? (
                /* CART LIST PRODUCTS RENDERING */
                cartItems.length > 0 ? (
                  cartItems.map((item) => {
                    const finalItemPrice = item.product.price + item.selectedStorage.priceModifier;
                    return (
                      <div key={item.id} className="p-3 bg-zinc-900/50 rounded-xl border border-white/5 flex gap-3 relative select-none">
                        
                        {/* CSS Icon representation of product selected */}
                        <div className="w-12 h-20 rounded bg-zinc-950 border border-white/10 flex items-center justify-center shrink-0">
                          <ShoppingBag size={16} className="text-violet-400" />
                        </div>

                        {/* Text descriptions */}
                        <div className="flex-1 text-left min-w-0 font-mono">
                          <h4 className="text-xs font-bold text-white uppercase truncate">{item.product.name}</h4>
                          <p className="text-[8.5px] text-slate-500 truncate mt-0.5 lowercase">HUE Accent: {item.selectedColor.name}</p>
                          <p className="text-[8.5px] text-cyan-400 font-semibold truncate mt-0.5 uppercase">STORAGE: {item.selectedStorage.size}</p>
                          
                          <div className="flex items-center justify-between mt-3 text-xs">
                            {/* Quantity controller buttons */}
                            <div className="flex items-center gap-2 border border-white/10 rounded bg-black px-1">
                              <button onClick={() => onUpdateCount(item.id, -1)} className="p-1 text-slate-400 hover:text-white transition-colors">
                                <Minus size={10} />
                              </button>
                              <span className="text-[10px] text-white font-bold px-1">{item.quantity}</span>
                              <button onClick={() => onUpdateCount(item.id, 1)} className="p-1 text-slate-400 hover:text-white transition-colors">
                                <Plus size={10} />
                              </button>
                            </div>

                            {/* Price */}
                            <span className="text-xs font-bold text-white">${finalItemPrice * item.quantity}</span>
                          </div>
                        </div>

                        {/* Delete button from Cart */}
                        <button
                          onClick={() => onRemoveFromCart(item.id)}
                          className="absolute top-2 right-2 p-1 text-slate-500 hover:text-rose-400 transition-colors"
                          title="Purge order line"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    );
                  })
                ) : (
                  <div className="py-16 text-center space-y-3 font-mono">
                    <ShoppingBag size={32} className="mx-auto text-slate-700 animate-pulse" />
                    <div>
                      <p className="text-xs text-slate-400 uppercase">PAYROLL STORAGE EMTPY</p>
                      <p className="text-[10px] text-zinc-650 font-light mt-1">Acquire state elements from the showroom catalog.</p>
                    </div>
                  </div>
                )
              ) : (
                /* WISHLIST PRODUCTS LIST RENDERING */
                wishlistProducts.length > 0 ? (
                  wishlistProducts.map((p) => (
                    <div key={p.id} className="p-3 bg-zinc-900/50 rounded-xl border border-white/5 flex gap-3 relative">
                      
                      <div className="w-12 h-20 rounded bg-zinc-950 border border-white/10 flex items-center justify-center shrink-0">
                        <Heart size={16} className="text-pink-500" />
                      </div>

                      <div className="flex-1 text-left min-w-0 font-mono flex flex-col justify-between">
                        <div>
                          <h4 className="text-xs font-bold text-white uppercase truncate">{p.name}</h4>
                          <p className="text-[8.5px] text-slate-500 text-left line-clamp-1 truncate leading-tight mt-0.5 italic">"{p.tagline}"</p>
                          <p className="text-xs font-bold text-white mt-1">${p.price}</p>
                        </div>
                        
                        {/* Direct action triggers to move to Cart */}
                        <button
                          onClick={() => onMoveToCart(p)}
                          className="w-full text-center py-1 mt-2 rounded border border-white/5 hover:border-violet-500 hover:bg-violet-950/20 text-[8.5px] font-bold text-violet-300 transition-all uppercase"
                        >
                          RELEASE TO SECURE CART
                        </button>
                      </div>

                      {/* Remove item from sovereign Wishlist */}
                      <button
                        onClick={() => onRemoveFromWishlist(p)}
                        className="absolute top-2 right-2 p-1 text-slate-500 hover:text-pink-400 transition-colors"
                        title="Remove wishlisted telemetry"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="py-16 text-center space-y-3 font-mono">
                    <Heart size={32} className="mx-auto text-slate-700 animate-pulse" />
                    <div>
                      <p className="text-xs text-slate-400 uppercase">NO CORES TRACKED</p>
                      <p className="text-[10px] text-zinc-650 font-light mt-1">Tap hearts on cards to buffer favorite items.</p>
                    </div>
                  </div>
                )
              )}

            </div>

            {/* Bottom calculation totals and secure Checkout button */}
            {type === 'cart' && cartItems.length > 0 && (
              <div className="p-5 border-t border-white/5 bg-black/40 font-mono space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500">ledger estimate subtotal:</span>
                  <span className="text-sm font-bold text-white">${getSubtotal()}</span>
                </div>

                <button
                  onClick={onCheckout}
                  className="w-full py-4.5 bg-white hover:bg-slate-200 text-black text-xs font-extrabold tracking-[0.2em] rounded-xl flex items-center justify-center gap-2 group transition-all shadow-xl shadow-white/5"
                >
                  ENGAGE SECURE CHECKOUT
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="flex items-center gap-1.5 p-2 bg-zinc-900 rounded border border-white/5 text-[8px] text-slate-500 justify-center">
                  <ShieldCheck size={12} className="text-green-500 shrink-0" />
                  <span>DECENTRALIZED CRYPTO PROTECTION ACTIVE</span>
                </div>
              </div>
            )}

          </motion.div>
        </div>

      </div>
    </AnimatePresence>
  );
}
