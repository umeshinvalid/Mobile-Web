import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Sparkles, Star, Cpu, Radio, ShieldCheck, Zap } from 'lucide-react';
import { AdminSettings } from '../types';

interface HeroProps {
  onExploreClick: () => void;
  adminSettings: AdminSettings;
}

export default function Hero({ onExploreClick, adminSettings }: HeroProps) {
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 18, seconds: 24 });
  const [showHoloDemo, setShowHoloDemo] = useState(false);
  const [activeChipNode, setActiveChipNode] = useState('Neural-X1');

  // Decrement countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { hours: prev.hours, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 12, minutes: 0, seconds: 0 }; // Loop it
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Theme-driven gradients
  const glowBorderClass = {
    'purple-blue': 'from-violet-500 to-cyan-400',
    'monochrome-silver': 'from-slate-400 to-zinc-200',
    'neon-green': 'from-emerald-500 to-lime-400'
  }[adminSettings.accentTheme] || 'from-violet-500 to-cyan-400';

  const glowShadowClass = {
    'purple-blue': 'rgba(139, 92, 246, 0.4)',
    'monochrome-silver': 'rgba(148, 163, 184, 0.2)',
    'neon-green': 'rgba(16, 185, 129, 0.4)'
  }[adminSettings.accentTheme] || 'rgba(139, 92, 246, 0.4)';

  const formatNum = (num: number) => num.toString().padStart(2, '0');

  return (
    <section className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center py-12 px-4 overflow-hidden bg-black">
      {/* Dynamic Cyber Ambient Glowing Backgrounds */}
      <div className="absolute top-1/4 left-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-violet-900/10 blur-[130px] -z-10 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-cyan-900/10 blur-[130px] -z-10 pointer-events-none" />

      {/* Futuristic Grid Overlay */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] -z-10" 
      />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Column Content Header */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
          
          {/* Micro-label trending alert */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/15 bg-violet-950/20 text-[10px] font-mono tracking-[0.2em] text-violet-400"
          >
            <Sparkles size={12} className="text-violet-400" />
            <span>NEXORA QUANTUM DIRECT drops NOW LIVE</span>
          </motion.div>

          {/* Epic luxury typography header */}
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.1]"
            >
              THE FUTURE OF<br />
              <span className="text-shiny-hologram">SMARTPHONES</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-slate-400 max-w-xl text-base sm:text-lg font-light tracking-wide leading-relaxed"
            >
              Experience next-generation technology with premium flagship devices, liquid-graphene cores, and immersive molecularly flexible displays. Built for the cyber elitist.
            </motion.p>
          </div>

          {/* Interactive actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <button
              onClick={onExploreClick}
              className="w-full sm:w-auto px-8 py-4 font-mono text-xs tracking-[0.2em] font-semibold text-black bg-white hover:bg-slate-200 transition-all rounded-lg flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(255,255,255,0.15)] group"
              id="hero-explore-btn"
            >
              EXPLORE DEVICES
              <Zap size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button
              onClick={() => setShowHoloDemo(true)}
              className="w-full sm:w-auto px-8 py-4 font-mono text-xs tracking-[0.2em] font-semibold text-white border border-white/10 hover:border-violet-500/30 bg-zinc-950/40 hover:bg-zinc-950/80 transition-all rounded-lg flex items-center justify-center gap-2 group"
              id="hero-watch-btn"
            >
              <div className="w-5 h-5 rounded-full bg-violet-500/10 border border-violet-500/30 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Play size={10} className="text-violet-400 fill-violet-400/40 ml-0.5" />
              </div>
              WATCH EXPERIENCE
            </button>
          </motion.div>

          {/* Interactive Flash Sale Live Ticker Drop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="w-full max-w-lg mt-6"
          >
            <div className="glass-panel rounded-xl p-4 border border-violet-500/15 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-left">
                <div className="text-[10px] font-mono text-slate-500 tracking-wider">LIMITED BATCH DEVIATION</div>
                <div className="text-xs font-semibold tracking-wide text-violet-300">NXR Raptor Prototype Drops:</div>
              </div>
              
              {/* Dynamic segmented digits */}
              <div className="flex gap-2">
                {[
                  { label: 'HR', val: formatNum(timeLeft.hours) },
                  { label: 'MIN', val: formatNum(timeLeft.minutes) },
                  { label: 'SEC', val: formatNum(timeLeft.seconds) }
                ].map((token) => (
                  <div key={token.label} className="flex flex-col items-center">
                    <div className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/5 font-mono text-sm font-bold text-cyan-400 shadow-[inset_0_1px_5px_rgba(0,0,0,0.8)]">
                      {token.val}
                    </div>
                    <span className="text-[8px] font-mono text-slate-500 mt-1">{token.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column Epic Fluid Device Representation */}
        <div className="lg:col-span-5 flex items-center justify-center relative min-h-[420px]">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative w-72 h-[500px]"
          >
            {/* Ambient Background Aura behind device */}
            <div 
              className="absolute -inset-4 bg-gradient-to-tr from-violet-600/20 to-cyan-500/20 rounded-[50px] blur-3xl opacity-60 animate-pulse pointer-events-none"
              style={{ filter: `blur(50px) drop-shadow(0 0 30px ${glowShadowClass})` }}
            />

            {/* Premium Graphene SmartPhone Vector Case */}
            <div className="absolute inset-0 rounded-[48px] border-[6px] border-zinc-850 bg-black overflow-hidden shadow-2xl flex flex-col justify-between p-1.5">
              
              {/* Phone Inner Notch Indicator */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-4 bg-black rounded-full border border-white/5 flex items-center justify-between px-3 z-30">
                <div className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-ping" />
                <div className="w-1 h-1 rounded-full bg-blue-500" />
                <span className="text-[7px] font-mono text-slate-500 tracking-widest scale-95">BIO-LOC</span>
              </div>

              {/* Dynamic screen content */}
              <div className="w-full h-full rounded-[38px] bg-zinc-950 overflow-hidden relative border border-white/5 flex flex-col justify-between p-4 pt-10">
                
                {/* Visual Glass Shimmer Sweep lines */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-150%] animate-[shimmer_5s_infinite_linear]" />
                
                {/* Interactive Star grid background on device */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950/40 via-transparent to-transparent opacity-80 pointer-events-none" />

                {/* Top Telemetry */}
                <div className="relative z-10 flex justify-between items-center text-[8px] font-mono text-slate-500">
                  <span>MODEL_SPEC // P-1</span>
                  <span>CRYPTO_SECURE</span>
                </div>

                {/* Main Holographic Phone Wallpaper Element */}
                <div className="relative flex flex-col items-center justify-center my-auto py-4 space-y-4">
                  <div className="relative w-32 h-32 rounded-full border-2 border-dashed border-cyan-400/20 flex items-center justify-center animate-[spin_40s_linear_infinite]">
                    <div className="absolute w-24 h-24 rounded-full border border-violet-500/30 flex items-center justify-center animate-[spin_20s_linear_infinite_reverse]">
                      <Cpu size={24} className="text-violet-400 rotate-[spin]" />
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-xs font-mono font-bold tracking-[0.25em] text-white">SYNAPSE CORE</div>
                    <div className="text-[8px] font-mono text-cyan-400 mt-1 tracking-widest">N1 PURE AI PROVENANCE</div>
                  </div>
                </div>

                {/* Bottom Telemetry Display overlay */}
                <div className="relative z-10 glass-panel rounded-lg p-2.5 border-white/10 flex flex-col space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-[8px] font-mono text-slate-400">CORE REFLEX:</span>
                    <span className="text-[8px] font-mono text-green-400 font-bold">120 G-FLOPS</span>
                  </div>
                  <div className="w-full bg-slate-900 h-1 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-violet-500 to-cyan-400 h-full w-[85%] animate-pulse" />
                  </div>
                </div>
              </div>

            </div>

            {/* Glowing borders of the device outside body */}
            <div className={`absolute -inset-[3px] rounded-[51px] bg-gradient-to-tr ${glowBorderClass} -z-10 opacity-30`} />
            
            {/* Floating Mini hologram card overlays */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -right-6 top-1/4 glass-panel border-violet-500/20 rounded-xl p-3 shadow-xl flex items-center gap-2 cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-violet-950/50 border border-violet-500/30 flex items-center justify-center">
                <Radio size={14} className="text-violet-400" />
              </div>
              <div>
                <div className="text-[8px] font-mono text-slate-500">PROTOTYPE BEZEL</div>
                <div className="text-[10px] font-bold text-white tracking-wide">0.00mm Pure Air</div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -left-10 bottom-1/4 glass-panel border-cyan-500/20 rounded-xl p-3 shadow-xl flex items-center gap-2 cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-cyan-950/50 border border-cyan-500/30 flex items-center justify-center">
                <ShieldCheck size={14} className="text-cyan-400" />
              </div>
              <div>
                <div className="text-[8px] font-mono text-slate-500">QUANTUM SECURITY</div>
                <div className="text-[10px] font-bold text-white tracking-wide">Solid Crypt-Key</div>
              </div>
            </motion.div>

          </motion.div>
        </div>

      </div>

      {/* Holographic Cinematic Experiential Modal */}
      <AnimatePresence>
        {showHoloDemo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="glass-panel-neon border-violet-500/30 rounded-2xl max-w-2xl w-full p-6 text-left relative overflow-hidden"
            >
              {/* Scanning visual overlay */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-[shimmer_3s_infinite]" />
              
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-lg font-mono font-bold tracking-widest text-white">NEXORA TELEMETRY ARCHITECTURE</h3>
                  <p className="text-xs font-mono text-cyan-400">Virtual teardown: Model NXR-V98</p>
                </div>
                <button
                  onClick={() => setShowHoloDemo(false)}
                  className="px-2 py-1 text-slate-400 hover:text-white font-mono text-xs border border-white/5 hover:border-white/20 rounded bg-zinc-900"
                >
                  CLOSE CORE
                </button>
              </div>

              {/* Holographic Internal Teardown Wireframe Graphic */}
              <div className="h-64 rounded-xl border border-white/5 bg-zinc-950/80 relative overflow-hidden flex items-center justify-center p-4">
                
                {/* Background matrix coordinate system */}
                <span className="absolute top-2 left-2 text-[8px] font-mono text-slate-600">SYS_COORD: [52.122, -90.111, 4.2]</span>
                <span className="absolute bottom-2 right-2 text-[8px] font-mono text-slate-600">SYSTEM STABLE // NO ERRORS</span>

                <div className="relative w-44 h-56 border border-cyan-400/20 rounded-3xl flex flex-col items-center p-4 justify-between">
                  {/* Wireframe internal battery */}
                  <div className="w-full h-1/3 border border-dashed border-violet-500/40 rounded-lg flex items-center justify-center text-[9px] font-mono text-violet-300">
                    Graphene Poly: 6200mAh
                  </div>
                  
                  {/* Dynamic Chip node */}
                  <div className="w-20 h-20 rounded-xl bg-violet-950/20 border border-violet-400/40 flex flex-col items-center justify-center text-center p-1.5">
                    <Cpu size={18} className="text-cyan-400 animate-spin" style={{ animationDuration: '8s' }} />
                    <span className="text-[7px] font-mono text-white select-none mt-1">{activeChipNode}</span>
                  </div>

                  {/* Antenna Node */}
                  <div className="w-full h-6 border-t border-dashed border-slate-500/30 flex items-center justify-between text-[7px] font-mono text-slate-500">
                    <span>5G SOL_A</span>
                    <span>BEAM_ACTIVE</span>
                  </div>
                </div>

                {/* Telemetry settings side selectors */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2">
                  {['Neural-X1', 'Tachyon-G8', 'Photonic-Ocular'].map((node) => (
                    <button
                      key={node}
                      onClick={() => setActiveChipNode(node)}
                      className={`px-2 py-1 text-[8px] font-mono border rounded transition-all text-left ${
                        activeChipNode === node
                          ? 'border-violet-500 bg-violet-950/50 text-white shadow-[0_0_8px_rgba(139,92,246,0.3)]'
                          : 'border-white/5 hover:border-white/10 text-slate-500'
                      }`}
                    >
                      {node.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Specifications summaries */}
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                <div className="p-2.5 rounded bg-zinc-900 border border-white/5 font-mono">
                  <div className="text-[9px] text-slate-500">STABILITY INDEX</div>
                  <div className="text-xs font-bold text-green-400">99.98%</div>
                </div>
                <div className="p-2.5 rounded bg-zinc-900 border border-white/5 font-mono">
                  <div className="text-[9px] text-slate-500">ENCRYPTION INTEGRATION</div>
                  <div className="text-xs font-bold text-cyan-400">Quantum-V5</div>
                </div>
                <div className="p-2.5 rounded bg-zinc-900 border border-white/5 font-mono">
                  <div className="text-[9px] text-slate-500">EMISSION STATUS</div>
                  <div className="text-xs font-bold text-white">0% Thermal Leak</div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
