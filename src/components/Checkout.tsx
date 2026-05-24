import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Truck, CreditCard, Sparkles, X, Check, ArrowRight, Wallet, QrCode, ClipboardList } from 'lucide-react';
import { CartItem, PhoneColor, PhoneStorage } from '../types';

interface CheckoutProps {
  cartItems: CartItem[];
  onClose: () => void;
  onClearCart: () => void;
  initialPromoApplied: { code: string; discount: number } | null;
  onTriggerVoiceToast: (text: string) => void;
}

export default function Checkout({
  cartItems,
  onClose,
  onClearCart,
  initialPromoApplied,
  onTriggerVoiceToast
}: CheckoutProps) {
  const [step, setStep] = useState<number>(0);
  const [selectedMethod, setSelectedMethod] = useState<string>('STRIPE_SHIELD');
  const [promoCode, setPromoCode] = useState<string>(initialPromoApplied?.code || '');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number } | null>(initialPromoApplied);

  // Address coordinate details
  const [addressDetails, setAddressDetails] = useState({
    name: 'Cosmic Traveler',
    email: 'traveler@nexora.io',
    addressLine: 'Laser Sector 4B, Dome Alpha',
    city: 'Amsterdam Cyberzone',
    postCode: '90210-NX'
  });

  // Interactive Payment layout details
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '5399 2844 1944 8821',
    cardName: 'COSMIC TRAVELER',
    cardExpiry: '08/30',
    cardCvv: '***'
  });

  const getSubtotal = () => {
    return cartItems.reduce((acc, item) => {
      const p = item.product.price + item.selectedStorage.priceModifier;
      return acc + (p * item.quantity);
    }, 0);
  };

  const getDiscount = () => {
    return appliedPromo ? appliedPromo.discount : 0;
  };

  const currentTotal = getSubtotal() - getDiscount();

  const handleApplyPromo = () => {
    const codeClean = promoCode.trim().toUpperCase();
    if (codeClean === 'NEXORA2026') {
      setAppliedPromo({ code: 'NEXORA2026', discount: 150 });
      onTriggerVoiceToast("Promo Verified: Instant $150 reduction loaded.");
    } else if (codeClean === 'NEURALCORE') {
      setAppliedPromo({ code: 'NEURALCORE', discount: 300 });
      onTriggerVoiceToast("Director VIP Promo Verified: $300 discount active.");
    } else {
      onTriggerVoiceToast("Neural Decryptor Failed: Promo code is corrupted or invalid.");
    }
  };

  const triggerNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      onClearCart();
      onClose();
    }
  };

  const triggerPrevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl overflow-y-auto py-10 px-4 select-none"
    >
      <div className="max-w-4xl mx-auto">
        
        {/* Navigation title control bar */}
        <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-8">
          <div>
            <h2 className="text-xl font-mono font-bold tracking-widest text-white">NEXORA DIRECT SECURE CHECKOUT</h2>
            <p className="text-[10px] font-mono text-slate-500 uppercase">Step {step + 1} of 4: Progressive pipeline checkout</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 border border-white/5 hover:border-white/10 text-slate-400 hover:text-white rounded"
            title="Return to showroom floor"
          >
            <X size={16} />
          </button>
        </div>

        {/* Multi-step progress node bubbles */}
        <div className="relative mb-10 flex justify-between items-center max-w-lg mx-auto">
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-zinc-900 border-t border-white/5" />
          
          {['SHIPPING_COORDS', 'PAYMENT_CORE', 'DIAGNOSTIC_SUMMARY', 'PREMIERE_RECEIPT'].map((label, idx) => {
            const isActive = step === idx;
            const isCompleted = step > idx;
            return (
              <div key={label} className="relative z-10 flex flex-col items-center">
                <div
                  className={`w-7 h-7 rounded-full border flex items-center justify-center font-mono text-[10px] font-semibold transition-all duration-300 ${
                    isActive
                      ? 'border-violet-500 bg-violet-950/40 text-violet-300 shadow-[0_0_8px_rgba(139,92,246,0.6)]'
                      : isCompleted
                      ? 'border-emerald-500 bg-emerald-950/20 text-emerald-400'
                      : 'border-white/5 bg-zinc-950 text-slate-500'
                  }`}
                >
                  {isCompleted ? <Check size={11} /> : idx + 1}
                </div>
                <span className="text-[7.5px] font-mono tracking-widest text-slate-500 mt-2 uppercase">{label.split('_')[0]}</span>
              </div>
            );
          })}
        </div>

        {/* Central columns splits content from billing recap */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* L. LEFT COLUMN: CURRENT STEPS MAIN FORM (7 COLS) */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              
              {/* STEP 1: DELIVERY DATA */}
              {step === 0 && (
                <motion.div
                  key="step-shipping"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-5"
                >
                  <div className="glass-panel border-white/5 rounded-xl p-5 space-y-4">
                    <div className="flex items-center gap-2 border-b border-white/5 pb-2.5">
                      <Truck size={14} className="text-violet-400" />
                      <span className="text-[10px] font-mono tracking-widest text-white uppercase">SHIPPING TRANSMISSION DEPLOYMENT</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-mono text-slate-500 block mb-1">CLIENT RECIPIENT NAME</label>
                        <input
                          type="text"
                          value={addressDetails.name}
                          onChange={(e) => setAddressDetails({ ...addressDetails, name: e.target.value })}
                          className="w-full bg-zinc-900 border border-white/10 rounded py-2 px-3 text-xs text-white focus:outline-none focus:border-violet-500/50"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-slate-500 block mb-1">CLIENT DIGITAL EMAIL</label>
                        <input
                          type="email"
                          value={addressDetails.email}
                          onChange={(e) => setAddressDetails({ ...addressDetails, email: e.target.value })}
                          className="w-full bg-zinc-900 border border-white/10 rounded py-2 px-3 text-xs text-white focus:outline-none focus:border-violet-500/50"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="text-[10px] font-mono text-slate-500 block mb-1">COORDINATE STREET ADDRESS</label>
                        <input
                          type="text"
                          value={addressDetails.addressLine}
                          onChange={(e) => setAddressDetails({ ...addressDetails, addressLine: e.target.value })}
                          className="w-full bg-zinc-900 border border-white/10 rounded py-2 px-3 text-xs text-white focus:outline-none focus:border-violet-500/50"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-slate-500 block mb-1">SECTOR URBAN ZONE</label>
                        <input
                          type="text"
                          value={addressDetails.city}
                          onChange={(e) => setAddressDetails({ ...addressDetails, city: e.target.value })}
                          className="w-full bg-zinc-900 border border-white/10 rounded py-2 px-3 text-xs text-white focus:outline-none focus:border-violet-500/50"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-slate-500 block mb-1">QUANTUM CODE POSTAL</label>
                        <input
                          type="text"
                          value={addressDetails.postCode}
                          onChange={(e) => setAddressDetails({ ...addressDetails, postCode: e.target.value })}
                          className="w-full bg-zinc-900 border border-white/10 rounded py-2 px-3 text-xs text-white focus:outline-none focus:border-violet-500/50"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Delivery method type selection */}
                  <div className="glass-panel border-white/5 rounded-xl p-5">
                    <span className="text-[10px] font-mono text-slate-500 tracking-wider block mb-3 uppercase">SUPER-CONDUCTIVE DEPLOIMENT SPEED</span>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button className="text-left p-3.5 border border-violet-500 bg-violet-950/15 rounded-lg flex items-center justify-between">
                        <div>
                          <div className="text-xs font-mono font-bold text-white uppercase">Atmospheric AI Drone (Active)</div>
                          <div className="text-[10px] font-mono text-slate-400 mt-1">Supersonic air propulsion to door step</div>
                        </div>
                        <span className="text-xs text-emerald-400 font-bold font-mono">PROMPT FREE</span>
                      </button>

                      <button className="text-left p-3.5 border border-white/5 bg-zinc-900/40 rounded-lg flex items-center justify-between opacity-50 cursor-not-allowed">
                        <div>
                          <div className="text-xs font-mono font-bold text-slate-300 uppercase">Suborbital Drop Teleport</div>
                          <div className="text-[10px] font-mono text-slate-500 mt-1">Instant molecular deployment grid</div>
                        </div>
                        <span className="text-xs text-slate-500 font-mono">MAINTENANCE</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: PAYMENT CHOICES */}
              {step === 1 && (
                <motion.div
                  key="step-payment"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Method List side */}
                    <div className="glass-panel border-white/5 rounded-xl p-5 space-y-3">
                      <div className="flex items-center gap-2 border-b border-white/5 pb-2.5">
                        <Wallet size={14} className="text-violet-400" />
                        <span className="text-[10px] font-mono tracking-widest text-white uppercase">GATEWAY MODULE TYPE</span>
                      </div>

                      {[
                        { id: 'STRIPE_SHIELD', label: 'STRIPE SHIELD GATEWAY', d: 'Secure multi-currency verification' },
                        { id: 'RAZORPAY_MATRIX', label: 'RAZORPAY SPECTRAL LINK', d: 'Fast localized UPI processing' },
                        { id: 'CRYPTO_CHAIN', label: 'DIRECT COIN CRYPTO VAULT', d: 'Binds transaction directly on ledger' },
                        { id: 'EMI_REFLEX', label: 'NEXORA EMI INSTANT DEEP', d: 'Split credits flow via interest-free tiers' }
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setSelectedMethod(item.id)}
                          className={`w-full text-left p-3.5 border rounded-lg transition-all ${
                            selectedMethod === item.id
                              ? 'border-violet-500 bg-violet-950/15'
                              : 'border-white/5 bg-zinc-950/40 hover:bg-zinc-900'
                          }`}
                        >
                          <div className="text-xs font-mono font-bold text-white">{item.label}</div>
                          <div className="text-[9.5px] font-mono text-slate-500 mt-1">{item.d}</div>
                        </button>
                      ))}
                    </div>

                    {/* Interactive visual credit card layer */}
                    <div className="space-y-4">
                      
                      {selectedMethod === 'STRIPE_SHIELD' || selectedMethod === 'EMI_REFLEX' ? (
                        <div className="glass-panel border-white/5 rounded-xl p-5 space-y-4">
                          
                          {/* Beautiful Interactive Credit card mockup */}
                          <div className="relative w-full h-40 rounded-xl bg-gradient-to-tr from-violet-950 via-slate-900 to-indigo-950 border border-violet-500/20 p-4 flex flex-col justify-between overflow-hidden shadow-xl shadow-violet-950/20">
                            {/* Card Chip vector design */}
                            <div className="flex justify-between items-start">
                              <div className="w-9 h-7 rounded bg-amber-400/30 border border-amber-400/20" />
                              <ShieldCheck size={18} className="text-violet-400" />
                            </div>

                            {/* Card Number */}
                            <div className="text-sm font-mono tracking-[0.15em] text-white my-3 select-text pr-2 py-0.5">{cardDetails.cardNumber}</div>

                            {/* Details footer bar */}
                            <div className="flex justify-between items-end font-mono">
                              <div>
                                <span className="text-[7px] text-slate-500 block uppercase">CLIENT ACCOUNTS</span>
                                <span className="text-[10px] text-slate-350 tracking-wider limit-char select-text pr-2 font-bold">{cardDetails.cardName.toUpperCase()}</span>
                              </div>
                              <div className="text-right">
                                <span className="text-[7px] text-slate-500 block uppercase">EXPIRES</span>
                                <span className="text-[9px] text-slate-350 font-bold">{cardDetails.cardExpiry}</span>
                              </div>
                            </div>
                          </div>

                          {/* Inputs inside payment card form details */}
                          <div className="space-y-3 font-mono text-[10px]">
                            <div className="grid grid-cols-2 gap-3">
                              <div className="col-span-2">
                                <label className="text-slate-500 block mb-1">DIGITAL CHIP CARD NUMBER</label>
                                <input
                                  type="text"
                                  value={cardDetails.cardNumber}
                                  onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
                                  className="w-full bg-zinc-900 border border-white/10 rounded py-2 px-3 text-xs text-white focus:outline-none"
                                />
                              </div>
                              <div>
                                <label className="text-slate-500 block mb-1">EXPIRY VALIDITY</label>
                                <input
                                  type="text"
                                  placeholder="MM/YY"
                                  value={cardDetails.cardExpiry}
                                  onChange={(e) => setCardDetails({ ...cardDetails, cardExpiry: e.target.value })}
                                  className="w-full bg-zinc-900 border border-white/10 rounded py-2 px-3 text-xs text-white focus:outline-none"
                                />
                              </div>
                              <div>
                                <label className="text-slate-500 block mb-1">CVV SECURE COREV2</label>
                                <input
                                  type="text"
                                  value={cardDetails.cardCvv}
                                  onChange={(e) => setCardDetails({ ...cardDetails, cardCvv: e.target.value })}
                                  className="w-full bg-zinc-900 border border-white/10 rounded py-2 px-3 text-xs text-white focus:outline-none"
                                />
                              </div>
                            </div>
                          </div>

                        </div>
                      ) : (
                        <div className="glass-panel border-white/5 rounded-xl p-5 flex flex-col items-center justify-center text-center space-y-4 min-h-[220px]">
                          <QrCode size={48} className="text-cyan-400 animate-pulse" />
                          <div>
                            <div className="text-xs font-mono font-bold text-white uppercase">GENERATE ENCRYPTED QR CODE Link</div>
                            <p className="text-[10px] font-mono text-slate-500 mt-1 max-w-sm">
                              Instantly scan the quantum QR block below inside your secure local wallet to authorized payments on-demand.
                            </p>
                          </div>
                          <span className="px-3 py-1 bg-cyan-950 border border-cyan-500/25 text-cyan-400 text-[8px] font-mono rounded">
                            NEX_QR_PRODUCER READY
                          </span>
                        </div>
                      )}

                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: RECAP / DIAGNOSTIC OVERVIEW */}
              {step === 2 && (
                <motion.div
                  key="step-recap"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div className="glass-panel border-white/5 rounded-xl p-5 space-y-4">
                    <div className="flex items-center gap-2 border-b border-white/5 pb-2.5">
                      <ClipboardList size={14} className="text-violet-400" />
                      <span className="text-[10px] font-mono tracking-widest text-white uppercase">ORDER RECAP DIAGNOSTICS</span>
                    </div>

                    <div className="space-y-3">
                      {cartItems.map((item) => {
                        const finalItemPrice = item.product.price + item.selectedStorage.priceModifier;
                        return (
                          <div key={`${item.id}-${item.selectedColor.name}`} className="flex justify-between items-center bg-zinc-950/40 p-3 rounded-lg border border-white/5">
                            <div>
                              <div className="text-xs font-bold text-white tracking-wide uppercase">{item.product.name}</div>
                              <div className="text-[8.5px] font-mono text-slate-400 mt-1 flex gap-2">
                                <span>HUE: {item.selectedColor.name.toUpperCase()}</span>
                                <span>CAPACITY: {item.selectedStorage.size.toUpperCase()}</span>
                              </div>
                            </div>
                            <div className="text-right font-mono">
                              <span className="text-xs font-bold text-white block">${finalItemPrice * item.quantity}</span>
                              <span className="text-[8.5px] text-slate-500">QTY: {item.quantity} MODULE</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Delivery destination report details overlay */}
                  <div className="glass-panel border-white/5 rounded-xl p-5 font-mono text-xs text-left grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span className="text-[8px] text-slate-500 block uppercase">SHIPPING DESTINATION COORDS</span>
                      <span className="text-white block mt-1 font-bold">{addressDetails.name}</span>
                      <span className="text-slate-400 block mt-1">{addressDetails.addressLine}, {addressDetails.city}</span>
                    </div>
                    <div>
                      <span className="text-[8px] text-slate-500 block uppercase">SECURE COMM CHANNEL</span>
                      <span className="text-white block mt-1">{addressDetails.email}</span>
                      <span className="text-cyan-400 block mt-1">Free Atmospheric Drone Delivery active</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 4: PREMIERE LUXURY CONFIRMATION */}
              {step === 3 && (
                <motion.div
                  key="step-confirm animate-pulse"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass-panel border-violet-500/25 bg-violet-950/5 rounded-2xl p-6 sm:p-8 text-center space-y-6"
                >
                  {/* Glowing checked radar badge */}
                  <div className="relative w-16 h-16 rounded-full border border-violet-500 flex items-center justify-center mx-auto bg-violet-950/40 animate-bounce">
                    <span className="absolute w-20 h-20 rounded-full border border-dashed border-cyan-400/20 animate-spin" style={{ animationDuration: '8s' }} />
                    <Check size={32} className="text-violet-400" />
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-cyan-400 tracking-[0.3em] uppercase">TRANSACTION SECURE & REGISTERED</span>
                    <h3 className="text-2xl font-black text-white tracking-widest mt-1 uppercase">ORDER ACQUISITION ENGAGED</h3>
                    <p className="text-xs text-slate-400 max-w-md mx-auto mt-2 font-mono leading-relaxed">
                      We have broadcasted your shipping parameters to Supersonic Drone Node Sector-4. Your cryptographic validation ticket is registered. Supersonic flight departs imminently.
                    </p>
                  </div>

                  {/* Simulated Receipt parameters lists */}
                  <div className="border-t border-b border-white/5 py-4 max-w-sm mx-auto font-mono text-[10px] text-left space-y-1.5 bg-zinc-950/40 rounded-xl p-3.5 border border-white/5">
                    <div className="flex justify-between items-center text-slate-400">
                      <span>SHIPMENT IDENTIFIER:</span>
                      <span className="font-bold text-slate-300">NXR-DRN-荷兰-9821</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-400">
                      <span>ESTIMATED DURATION:</span>
                      <span className="font-bold text-emerald-400">18 EARTH HOURS</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-400">
                      <span>SECURE CREDITS BILLED:</span>
                      <span className="font-bold text-white text-xs">$ {currentTotal}</span>
                    </div>
                  </div>

                  <span className="text-[8.5px] font-mono text-slate-500 block uppercase">
                    THANK YOU FOR CHOOSING NEXORA MOBILES CORE VAULT
                  </span>
                </motion.div>
              )}

            </AnimatePresence>

            {/* Back & Next Navigation controls panel on bottom of forms */}
            {step < 3 && (
              <div className="mt-6 flex justify-between items-center">
                <button
                  onClick={triggerPrevStep}
                  disabled={step === 0}
                  className={`px-4 py-2 text-xs font-mono tracking-wider border rounded ${
                    step === 0
                      ? 'border-transparent text-slate-600 cursor-not-allowed'
                      : 'border-white/5 hover:border-white/15 text-slate-300 bg-zinc-950/40'
                  }`}
                >
                  PREVIOUS
                </button>

                <button
                  onClick={triggerNextStep}
                  className="px-6 py-3 bg-white text-black font-semibold font-mono text-[10px] tracking-widest rounded-lg flex items-center gap-1.5 hover:bg-slate-200 transition-all shadow-xl shadow-white/5"
                >
                  <span>{step === 2 ? 'REGISTER ORDER & FLY' : 'CONTINUE'}</span>
                  <ArrowRight size={12} />
                </button>
              </div>
            )}

            {step === 3 && (
              <div className="mt-6 text-center">
                <button
                  onClick={() => {
                    onClearCart();
                    onClose();
                  }}
                  className="px-8 py-3.5 bg-white text-black font-extrabold font-mono text-[10px] tracking-widest rounded-xl transition-all hover:bg-slate-200 uppercase"
                >
                  Dismount checkout interface
                </button>
              </div>
            )}
          </div>

          {/* R. RIGHT COLUMN: ORDER SUMMARY SHEET BILLING PANEL (4 COLS) */}
          <div className="lg:col-span-4 glass-panel border-white/5 rounded-2xl p-5 space-y-4">
            
            <div className="flex items-center gap-1.5 border-b border-white/5 pb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase">CREDIT ASSESSMENT recap</span>
            </div>

            {/* Injected mini scroll products panel */}
            <div className="max-h-36 overflow-y-auto space-y-2.5 pr-1 select-none">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-2 justify-between items-center text-[11px] font-mono text-slate-350">
                  <div className="truncate flex-1 text-left">
                    <span className="text-white font-bold block truncate uppercase">{item.product.name}</span>
                    <span className="text-[8px] text-slate-500 font-light lowercase">qty: {item.quantity} x {item.selectedStorage.size.split(' ')[0]}</span>
                  </div>
                  <span className="text-white font-semibold flex-shrink-0">${(item.product.price + item.selectedStorage.priceModifier) * item.quantity}</span>
                </div>
              ))}
            </div>

            {/* Promo Code injector block */}
            <div className="border-t border-b border-white/5 py-4 space-y-2">
              <span className="text-[8.5px] font-mono text-slate-500 tracking-wider block uppercase">APPLY CIPHER OVERRIDE DISCOUNTS</span>
              <div className="flex gap-1.5">
                <input
                  type="text"
                  placeholder="Insert Promo Code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  disabled={step === 3}
                  className="flex-1 bg-zinc-900 border border-white/10 rounded py-1.5 px-2.5 text-[10px] font-mono text-white placeholder-slate-600 focus:outline-none focus:border-violet-500/50 uppercase"
                />
                <button
                  onClick={handleApplyPromo}
                  disabled={step === 3}
                  className="px-3 py-1.5 rounded border border-white/10 hover:border-violet-500 hover:bg-violet-950/20 font-mono text-[9px] tracking-wider text-slate-300 transition-colors"
                >
                  DECRYPT
                </button>
              </div>

              {appliedPromo && (
                <div className="flex justify-between items-center bg-violet-950/20 p-2 rounded border border-violet-500/20 text-[9px] font-mono">
                  <span className="text-violet-400">CIPHER: {appliedPromo.code}</span>
                  <span className="text-green-400 font-bold">- $ {appliedPromo.discount}</span>
                </div>
              )}
            </div>

            {/* Dynamic ledger calculation totals list */}
            <div className="font-mono text-[11px] space-y-1.5">
              <div className="flex justify-between items-center text-slate-500">
                <span>SUBTOTAL STREAMS:</span>
                <span className="text-slate-300">$ {getSubtotal()}</span>
              </div>
              <div className="flex justify-between items-center text-slate-500">
                <span>DRONE TRANSPORT:</span>
                <span className="text-emerald-400 font-bold">FREE SIGNAL</span>
              </div>
              {appliedPromo && (
                <div className="flex justify-between items-center text-slate-500">
                  <span>OVERRIDE REBATE:</span>
                  <span className="text-red-400">- $ {appliedPromo.discount}</span>
                </div>
              )}
              <div className="flex justify-between items-center text-sm font-black text-white pt-2.5 border-t border-white/5 uppercase">
                <span>TOTAL NET CREDITS:</span>
                <span className="text-cyan-400 text-lg shadow-[0_0_8px_rgba(6,182,212,0.15)]">$ {currentTotal}</span>
              </div>
            </div>

            {/* Direct secure checkout validation credentials */}
            <div className="flex items-center gap-1.5 p-2 bg-zinc-950 rounded border border-white/5 text-[8.5px] font-mono text-slate-500">
              <ShieldCheck size={12} className="text-green-500 shrink-0" />
              <span>TLS SECUR V5 CHANNEL DEPLOYED INSTANTLY</span>
            </div>

          </div>

        </div>

      </div>
    </motion.div>
  );
}
