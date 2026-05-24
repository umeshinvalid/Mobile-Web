import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Cpu, Send, RefreshCw, BarChart, CheckCircle, Smartphone, User, Terminal, Star, ExternalLink, MessageSquareText } from 'lucide-react';
import { Product, PhoneColor, PhoneStorage, ChatMessage } from '../types';

interface AICoreProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, color: PhoneColor, storage: PhoneStorage) => void;
  onApplySpecialOffer: (discount: number, rawCode: string) => void;
  onTriggerVoiceToast: (text: string) => void;
}

export default function AICore({
  products,
  onSelectProduct,
  onAddToCart,
  onApplySpecialOffer,
  onTriggerVoiceToast
}: AICoreProps) {
  // 1. Diagnostic Recommendation flow states
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recommendedProduct, setRecommendedProduct] = useState<Product | null>(null);
  const [matchPercentage, setMatchPercentage] = useState(0);

  // 2. Chatbot core states
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'nexora-core',
      text: 'Greetings. I am NEXORA-CORE Neural Assembly Suite v5.02. I can assist you with spec diagnostics, cipher overrides, and hardware recommendations. What parameters are we recalibrating today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      options: ['Show flagship specs', 'Apply checkout promo', 'Explain quantum security']
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on chatbot messages update
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const diagnosticQuestions = [
    {
      id: 'priority',
      title: 'What is your primary computing priority?',
      subtitle: 'Specify core logic load priorities.',
      options: [
        { id: 'gaming', label: 'Overclocked Spatial Simulation & Ultra FPS', icon: Cpu },
        { id: 'creative', label: 'Cinematic Chromatography & Optics Synthesizer', icon: Star },
        { id: 'security', label: 'Absolute Cryptographic Privacy & Sovereignty', icon: Terminal },
        { id: 'multitask', label: 'Balanced Graphene Flagship General Purpose', icon: Smartphone }
      ]
    },
    {
      id: 'cooling',
      title: 'Select desired thermal allowance limit:',
      subtitle: 'Dynamic cooling backplates adjust based on this index.',
      options: [
        { id: 'vent', label: 'Active Mechanical Rising Vent (Maximum Cooling)', icon: Smartphone },
        { id: 'diamond', label: 'Liquid Active Diamond-Matrix Vapor Chamber', icon: Terminal },
        { id: 'passive', label: 'Standard Silent Passive Core Graphene Dissipation', icon: Cpu }
      ]
    },
    {
      id: 'investment',
      title: 'Specify hardware credit investment range:',
      subtitle: 'Luxury and prototype grades demand higher core credentials.',
      options: [
        { id: 'sovereign', label: 'Sovereign Luxury Core (No structural budget limits)', icon: Star },
        { id: 'professional', label: 'Professional Standard Tier ($1300 - $1800 Credits)', icon: Cpu },
        { id: 'essential', label: 'Optimized Accessory Systems & Prototypes', icon: Terminal }
      ]
    }
  ];

  // Handle Question Responses
  const handleAnswerSelect = (optionId: string) => {
    const activeQ = diagnosticQuestions[currentStep].id;
    const nextAnswers = { ...selectedAnswers, [activeQ]: optionId };
    setSelectedAnswers(nextAnswers);

    if (currentStep < diagnosticQuestions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      runNeuralDiagnostics(nextAnswers);
    }
  };

  const resetDiagnostics = () => {
    setCurrentStep(0);
    setSelectedAnswers({});
    setRecommendedProduct(null);
    setMatchPercentage(0);
  };

  // Diagnostic recommendation simulation
  const runNeuralDiagnostics = (answers: Record<string, string>) => {
    setIsAnalyzing(true);
    setTimeout(() => {
      let targetId = 'nxr-x1-phantom'; // Fallback flagship

      const priority = answers.priority;
      const cooling = answers.cooling;
      const investment = answers.investment;

      if (priority === 'gaming' || cooling === 'vent') {
        targetId = 'nxr-chronos-g8';
      } else if (priority === 'creative') {
        targetId = 'nxr-spectra-ocular';
      } else if (priority === 'security' && investment === 'sovereign') {
        targetId = 'nxr-avalon-prime';
      } else if (investment === 'sovereign') {
        targetId = 'nxr-arc-fold';
      } else {
        targetId = 'nxr-x1-phantom';
      }

      const foundProduct = products.find(p => p.id === targetId) || products[0];
      setRecommendedProduct(foundProduct);
      setMatchPercentage(Math.floor(Math.random() * 6) + 94); // 94% to 99% match
      setIsAnalyzing(false);
    }, 2800);
  };

  // Chatbot core logic responders
  const handleSendMessage = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setInputVal('');

    // Pre-calculated core engine replies
    setTimeout(() => {
      const chatLower = textToSend.toLowerCase();
      let responseText = '';
      let options: string[] = [];

      if (chatLower.includes('specs') || chatLower.includes('phantom') || chatLower.includes('x1')) {
        const p = products.find(item => item.id === 'nxr-x1-phantom');
        responseText = `NEXORA X1 PHANTOM specs: Processor is ${p?.specs.processor}. Armed with ${p?.specs.ram} LPDDR6, ${p?.specs.display} dynamic refresh view, and a solid graphene polymer body. Current price: $${p?.price}. Would you like me to inspect this device?`;
        options = ['Inspect Phantom X1', 'Compare devices'];
      } else if (chatLower.includes('promo') || chatLower.includes('code') || chatLower.includes('coupon') || chatLower.includes('discount')) {
        responseText = 'Holographic override active! Applying core discount cyber key: "NEXORA2026" (-$150). Code has been registered and verified in your secure checkout vault.';
        onApplySpecialOffer(150, 'NEXORA2026');
        onTriggerVoiceToast('AI Action: Discount core payload executed successfully!');
      } else if (chatLower.includes('security') || chatLower.includes('quantum') || chatLower.includes('crypt')) {
        responseText = 'All Nexora smartphones feature physical-isolated Quantum Security. Selected luxury models like Avalon Prime include hardware security keys forged inside crystalline sapphire matrices for military-grade protection.';
        options = ['About Avalon Prime', 'Show other devices'];
      } else if (chatLower.includes('shipping') || chatLower.includes('ship') || chatLower.includes('coordinates')) {
        responseText = 'Synchronizing space orbital tracking... Your shipments depart via automated supersonic hyper-drones from Nevada Sector-4 or Amsterdam Terminal. Zero radiation profile, pristine signature lock. Arrival guaranteed within 18 Earth hours.';
      } else {
        responseText = 'I have aligned the diagnostic beams to your request. If you wish to bypass standard rates, type "Apply checkout promo". For hardware alignment, try answering our Perfect Match survey.';
        options = ['Apply checkout promo', 'Reset Diagnostic System'];
      }

      const botMsg: ChatMessage = {
        id: Math.random().toString(),
        sender: 'nexora-core',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        options
      };

      setChatMessages((prev) => [...prev, botMsg]);
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 relative select-none">
      
      {/* 1. DIAGNOSTIC SURVEY WRAPPER: LEFT COLUMN (7 COLS) */}
      <div className="lg:col-span-7 flex flex-col justify-between glass-panel rounded-2xl p-6 border border-white/5 relative min-h-[480px]">
        
        {/* Animated matrix border light */}
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-violet-500/20 via-cyan-400 to-transparent" />

        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Cpu size={16} className="text-violet-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">NEURAL HARMONIZER MODULE</span>
          </div>
          <span className="font-mono text-[9px] text-zinc-500">SYS_V5.0</span>
        </div>

        <div>
          <AnimatePresence mode="wait">
            
            {/* Step 1-3 Questions display */}
            {currentStep < diagnosticQuestions.length && !isAnalyzing && !recommendedProduct && (
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <span className="text-xs font-mono text-cyan-400 font-semibold block mb-1">
                    CALIBRATION STEP {currentStep + 1} OF {diagnosticQuestions.length}
                  </span>
                  <h3 className="text-xl font-bold text-white tracking-tight uppercase">
                    {diagnosticQuestions[currentStep].title}
                  </h3>
                  <p className="text-xs font-mono text-slate-500 tracking-wide mt-1">
                    {diagnosticQuestions[currentStep].subtitle}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {diagnosticQuestions[currentStep].options.map((opt) => {
                    const OptIcon = opt.icon;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => handleAnswerSelect(opt.id)}
                        className="w-full text-left p-4 rounded-xl border border-white/5 hover:border-violet-500/20 bg-zinc-950/40 hover:bg-violet-950/10 transition-all duration-300 flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-zinc-900 group-hover:bg-violet-950/50 rounded-lg text-slate-400 group-hover:text-violet-400 border border-white/5 transition-all">
                            <OptIcon size={16} />
                          </div>
                          <span className="text-xs font-mono tracking-wide text-slate-300 group-hover:text-white transition-all">
                            {opt.label}
                          </span>
                        </div>
                        <div className="w-2.5 h-2.5 rounded-full bg-zinc-800 border border-white/10 group-hover:bg-violet-500 group-hover:border-transparent transition-all" />
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Neural calculation stage */}
            {isAnalyzing && (
              <motion.div
                key="analyzing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-16 text-center space-y-6 flex flex-col items-center justify-center min-h-[300px]"
              >
                <div className="relative w-24 h-24 rounded-full border border-dashed border-cyan-400 flex items-center justify-center animate-spin" style={{ animationDuration: '6s' }}>
                  <div className="absolute w-16 h-16 rounded-full border border-dashed border-violet-500/60 flex items-center justify-center animate-[spin_3s_linear_infinite_reverse]">
                    <Sparkles size={18} className="text-cyan-400" />
                  </div>
                </div>

                <div>
                  <h4 className="font-mono text-xs tracking-[0.3em] text-white uppercase animate-pulse">ALGORITHMIC QUANTUM ASSEMBLY...</h4>
                  <p className="text-[10px] font-mono text-slate-500 tracking-widest mt-1">CROSS-COMPILING COORDS // SPEC ALIGNMENT</p>
                </div>
              </motion.div>
            )}

            {/* Recommended device card revealed */}
            {recommendedProduct && !isAnalyzing && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3">
                  <div className="px-2.5 py-1 rounded bg-emerald-950 border border-emerald-500/25 text-emerald-400 text-[10px] font-mono font-bold uppercase tracking-widest">
                    ALIGNMENT RATIFIED
                  </div>
                  <span className="text-sm font-mono text-slate-400 tracking-wide">
                    {matchPercentage}% NEURAL MATCH RATIO
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-xl border border-white/5 bg-zinc-950/60">
                  {/* CSS Mobile preview */}
                  <div className="w-20 h-32 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center relative shrink-0">
                    <Smartphone size={24} className="text-violet-400" />
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-6 h-1.5 bg-black rounded-lg" />
                    <span className="absolute bottom-1 right-1 text-[5px] font-mono text-cyan-400">NXR_RECS</span>
                  </div>

                  {/* Recommendation description */}
                  <div className="text-left space-y-1.5 flex-1">
                    <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">{recommendedProduct.category} category suggestion</span>
                    <h4 className="text-lg font-bold text-white tracking-widest uppercase">{recommendedProduct.name}</h4>
                    <p className="text-[11px] font-mono text-slate-400 leading-relaxed max-w-md">{recommendedProduct.description}</p>
                    
                    <div className="flex items-center gap-4 pt-2">
                      <span className="text-xs font-mono font-black text-cyan-400">${recommendedProduct.price}</span>
                      <span className="text-[9px] font-mono text-green-400 font-bold uppercase tracking-wider">SECURE INSTANT SHIPPING</span>
                    </div>
                  </div>
                </div>

                {/* Direct CTA */}
                <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-white/5">
                  <button
                    onClick={() => onSelectProduct(recommendedProduct!)}
                    className="w-full sm:w-auto px-6 py-3 border border-white/10 hover:border-violet-500/40 bg-zinc-900 text-white font-mono text-[10px] tracking-widest font-semibold rounded-lg flex items-center justify-center gap-2 transition-all"
                  >
                    INSPECT CORRESPONDENT MODEL
                    <ExternalLink size={12} />
                  </button>
                  
                  <button
                    onClick={() => {
                      onAddToCart(recommendedProduct!, recommendedProduct!.colors[0], recommendedProduct!.storageOptions[0]);
                      onTriggerVoiceToast(`Added suggested model to shopping module!`);
                    }}
                    className="w-full sm:w-auto px-6 py-3 bg-white text-black font-mono text-[10px] tracking-widest font-bold rounded-lg transition-all"
                  >
                    LAUNCH ACQUISITION
                  </button>
                  
                  <button
                    onClick={resetDiagnostics}
                    className="w-full sm:w-auto text-xs px-4 py-2 font-mono border border-white/5 text-slate-500 hover:text-white rounded"
                  >
                    RETEST LOGIC
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Back navigation options */}
        {currentStep > 0 && currentStep < diagnosticQuestions.length && !recommendedProduct && (
          <div className="pt-4 border-t border-white/5 flex justify-end">
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              className="text-[10px] font-mono text-slate-500 hover:text-white uppercase tracking-wider flex items-center gap-1"
            >
              <RefreshCw size={10} className="animate-spin" style={{ animationDuration: '10s' }} />
              <span>RETURN STEP BACK</span>
            </button>
          </div>
        )}

      </div>

      {/* 2. CHATBOT WINDOW WRAPPER: RIGHT COLUMN (5 COLS) */}
      <div className="lg:col-span-5 flex flex-col justify-between glass-panel rounded-2xl h-[480px] border border-white/5 relative overflow-hidden">
        
        {/* Animated active neural node widget in title bar */}
        <div className="p-4 border-b border-white/5 bg-zinc-950/40 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full border border-violet-500/30 flex items-center justify-center bg-violet-950/20">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-ping" />
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-widest text-white uppercase block leading-none">NEXORA-CORE AI</span>
              <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">LOCAL SYS COPROCESSOR</span>
            </div>
          </div>
          
          <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-950/20 text-cyan-400 text-[8px] font-mono tracking-widest uppercase">
            MATRIX ACTIVE
          </span>
        </div>

        {/* Dynamic scrollable chats area */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs font-sans select-text">
          {chatMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col max-w-[85%] ${
                msg.sender === 'user' ? 'ml-auto items-end' : 'items-start'
              }`}
            >
              {/* Message Content Bubble */}
              <div
                className={`p-3 rounded-xl border ${
                  msg.sender === 'user'
                    ? 'bg-zinc-900 border-white/10 text-slate-200 rounded-br-none'
                    : 'bg-indigo-950/15 border-violet-500/20 text-slate-300 rounded-bl-none'
                }`}
              >
                <p className="leading-relaxed tracking-wide font-light text-left pr-1">{msg.text}</p>
              </div>

              {/* Time display */}
              <span className="text-[8px] font-mono text-slate-600 mt-1 uppercase tracking-widest">
                {msg.sender === 'user' ? 'USER COORD' : 'SYS CORE'} // {msg.timestamp}
              </span>

              {/* Injected Action suggestions under bot response */}
              {msg.options && msg.options.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2 justify-start max-w-full">
                  {msg.options.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleSendMessage(option)}
                      className="px-2 py-1 border border-white/5 hover:border-violet-500/20 bg-zinc-950/40 hover:bg-violet-950/5 text-[9px] font-mono tracking-[0.05em] text-cyan-400 hover:text-white rounded transition-all"
                    >
                      {option.toUpperCase()}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div ref={chatBottomRef} />
        </div>

        {/* Quick Suggest triggers ribbon above text input */}
        <div className="px-4 py-2 border-t border-white/5 bg-zinc-950/20 flex gap-1.5 overflow-x-auto select-none no-scrollbar">
          {['Specs for Raptor', 'Apply checkout promo', 'Ship coordinates'].map((q) => (
            <button
              key={q}
              onClick={() => handleSendMessage(q)}
              className="px-2 py-1 border border-transparent hover:border-white/5 bg-white/5 text-[8.5px] font-mono text-slate-400 hover:text-white rounded whitespace-nowrap shrink-0 transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input submission box */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(inputVal);
          }}
          className="p-3 border-t border-white/5 bg-zinc-950/60 flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Type neural directive..."
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="flex-1 bg-zinc-900 border border-white/10 rounded-lg py-2 px-3 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/50"
          />
          <button
            type="submit"
            className="p-2.5 rounded-lg bg-zinc-900 border border-white/10 hover:border-violet-500 hover:bg-violet-950 hover:text-white text-slate-400 transition-colors"
            title="Transmit protocol"
          >
            <Send size={14} />
          </button>
        </form>

      </div>

    </div>
  );
}
