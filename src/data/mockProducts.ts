import { Product } from '../types';

export const initialProducts: Product[] = [
  {
    id: 'nxr-x1-phantom',
    name: 'NEXORA X1 PHANTOM',
    tagline: 'The invisible boundary of mobile computing.',
    category: 'flagship',
    price: 1499,
    originalPrice: 1699,
    description: 'Constructed from aerospace-grade seamless diamond-carbon alloy. Feats dynamic liquid-cooling, 100% active screen ratio, and neural-sensory biometric access.',
    longDescription: 'Witness the absolute pinnacle of contemporary tech elegance. The NEXORA X1 Phantom utilizes molecularly engineered carbon frames that disperse heat on contact with human touch. Equipped with the Synapse Core Q-1, it has the highest real-time local model generation capabilities of any mobile device, enabling perfect local AI operations, sub-millisecond encryption, and dynamic light deflection styling. Experience zero bezel, absolute luxury, and instant response.',
    rating: 4.90,
    reviewsCount: 382,
    availability: 'In Stock',
    colors: [
      { name: 'Cosmic Violet', hex: '#8b5cf6', glowColor: 'rgba(139, 92, 246, 0.4)' },
      { name: 'Liquid Chrome', hex: '#60a5fa', glowColor: 'rgba(96, 165, 250, 0.4)' },
      { name: 'Shadow Obsidian', hex: '#1f2937', glowColor: 'rgba(31, 41, 55, 0.4)' }
    ],
    storageOptions: [
      { size: '512 GB', priceModifier: 0 },
      { size: '1 TB Quantum', priceModifier: 200 },
      { size: '2 TB Neural Cache', priceModifier: 450 }
    ],
    specs: {
      processor: 'Synapse Core Q-1 (Holographic)',
      ram: '24GB Ultra LPDDR6',
      storage: '512GB - 2TB Molecular SSD',
      display: '6.8" Fluid Retina 180Hz LTPO',
      camera: '200MP Active Optic + Liquid Resonance Lens',
      battery: '6200mAh Graphene-Polymer Solid State',
      neuralScore: 98,
      holoCapable: true,
      quantumSecure: true
    },
    images: [
      'front_view', // We will render gorgeous interactive CSS-based mockups instead of relying on external fragile images!
      'angled_view',
      'back_view'
    ],
    trendingScore: 95
  },
  {
    id: 'nxr-chronos-g8',
    name: 'CHRONOS G-8 RAPTOR',
    tagline: 'Sub-atomic overclocking. Absolute dominance.',
    category: 'gaming',
    price: 1699,
    originalPrice: 1899,
    description: 'Engineered for competitive spatial simulation. Features active hyper-ventilated micro-fans, a liquid nitrogen-grade vapor chamber, and reactive tactile trigger induction.',
    longDescription: 'The Chronos G-8 is created for elite digital architects and simulator specialists. Built on a titanium-carbide skeletal frame with double-insulated electromagnetic mesh, it handles up to 8.4 GHz clock speeds under optimal local load. Complete with an integrated backplate active vent that rises automatically when active simulation starts, providing pristine cooling with zero physical drag.',
    rating: 4.95,
    reviewsCount: 219,
    availability: 'Limited Drop',
    colors: [
      { name: 'Plasma Blue', hex: '#06b6d4', glowColor: 'rgba(6, 182, 212, 0.5)' },
      { name: 'Pulse Crimson', hex: '#ef4444', glowColor: 'rgba(239, 68, 68, 0.5)' }
    ],
    storageOptions: [
      { size: '1 TB Solid State', priceModifier: 0 },
      { size: '2 TB Overclock Cache', priceModifier: 300 }
    ],
    specs: {
      processor: 'Tachyon Overlord Octa-Chip',
      ram: '32GB Graphene LPDDR6X',
      storage: '1TB - 2TB Supercharged Cache',
      display: '6.9" Spatial Dual-Layer OLED 240Hz',
      camera: '50MP Liquid Motion Cam + 120fps Tracking',
      battery: '7000mAh Dual-Cell Graphene 180W',
      neuralScore: 94,
      holoCapable: false,
      quantumSecure: true
    },
    images: ['front_view', 'angled_view', 'back_view'],
    trendingScore: 99,
    isPrototype: true
  },
  {
    id: 'nxr-spectra-ocular',
    name: 'SPECTRA S-OCULAR',
    tagline: 'Retinal resonance. Quad-core optical synthesizers.',
    category: 'camera',
    price: 1399,
    originalPrice: 1499,
    description: 'Co-developed with orbital imaging experts. Incorporates true liquid-crystal refocus lens array and spectral chromatography for zero-noise night vision.',
    longDescription: 'For capture artisans seeking uncompromised reality. The Spectra S-Ocular breaks traditional barrier limits by placing four liquid lenses on active electromagnetic gimbals. It enables optical zoom continuously from 1x to 15x with no moving mechanical barrels, capturing absolute photon purity. Post-processed through the specialized Lumina AI engine running locally at 1.2 tera-flops.',
    rating: 4.88,
    reviewsCount: 412,
    availability: 'In Stock',
    colors: [
      { name: 'Lunar Silver', hex: '#e2e8f0', glowColor: 'rgba(226, 232, 240, 0.4)' },
      { name: 'Nova Amber', hex: '#f59e0b', glowColor: 'rgba(245, 158, 11, 0.4)' }
    ],
    storageOptions: [
      { size: '512 GB High-Speed', priceModifier: 0 },
      { size: '1.5 TB Ultra Buffer', priceModifier: 250 }
    ],
    specs: {
      processor: 'Lumina Optic-Core v4',
      ram: '16GB Photonic-Accelerated RAM',
      storage: '512GB - 1.5TB Laser-Flash Storage',
      display: '6.7" Super-Bright Spectrum 144Hz',
      camera: '320MP Liquid Spectrum Quad-System',
      battery: '5800mAh High-Charge Graphene',
      neuralScore: 92,
      holoCapable: true,
      quantumSecure: false
    },
    images: ['front_view', 'angled_view', 'back_view'],
    trendingScore: 88
  },
  {
    id: 'nxr-arc-fold',
    name: 'NEXORA ARC FOLD IX',
    tagline: 'Unfold the third spatial dimension.',
    category: 'foldable',
    price: 2199,
    originalPrice: 2499,
    description: 'A revolutionary molecular flex-hinge with dynamic memory alloy. Opens seamlessly into an immersive holographic console workspace.',
    longDescription: 'Unifying the mobility of a modern pocket flagship with the massive utility of a 10-inch terminal, the Arc Fold IX is a masterclass in structural engineering. It features an impact-resistant polymer shielding that repairs minor scratches in under 5 minutes at room temperature, while the hinge structure incorporates custom hydraulic dampeners for a zero-resonance snap fold.',
    rating: 4.97,
    reviewsCount: 124,
    availability: 'Pre-Order',
    colors: [
      { name: 'Matte Carbon', hex: '#111827', glowColor: 'rgba(17, 24, 39, 0.5)' },
      { name: 'Aurora Plasma', hex: '#ec4899', glowColor: 'rgba(236, 72, 153, 0.5)' }
    ],
    storageOptions: [
      { size: '1 TB Flex SSD', priceModifier: 0 },
      { size: '2 TB Dynamic Matrix', priceModifier: 350 }
    ],
    specs: {
      processor: 'Synapse Core Arc-2 Dual',
      ram: '24GB High-Bandwidth RAM',
      storage: '1TB - 2TB Double-Parallel SSD',
      display: '8.2" Ultra-Flexible Infinite-Bezel folding OLED',
      camera: '108MP Cover Zoom + Under-Panel Pro Lens',
      battery: '6800mAh Balanced Dual Graphene',
      neuralScore: 97,
      holoCapable: true,
      quantumSecure: true
    },
    images: ['front_view', 'angled_view', 'back_view'],
    trendingScore: 94
  },
  {
    id: 'nxr-avalon-prime',
    name: 'NEXORA AVALON PRIME',
    tagline: 'Sculpted in meteorite alloy. Pure timeless mechanics.',
    category: 'luxury',
    price: 4999,
    originalPrice: 5999,
    description: 'A masterpiece created on individual order. Composed of raw meteorite alloy chassis, custom cryptographic security engine, and active solid gold accent pins.',
    longDescription: 'Luxury redefined for the selected elite. The NEXORA Avalon Prime is not mass-manufactured. Each unit is polished and calibrated in highly isolated cleanrooms, featuring individual numerical branding etched with laser beams. Complete with physical security keys embedded inside natural gemstones, offering an unbreakable crypto-vault protocol, keeping your personal identity private under any level of network breach.',
    rating: 5.00,
    reviewsCount: 42,
    availability: 'Limited Drop',
    colors: [
      { name: 'Imperial Gold & Onyx', hex: '#d97706', glowColor: 'rgba(217, 119, 6, 0.6)' },
      { name: 'Cosmic Onyx & Ivory', hex: '#f8fafc', glowColor: 'rgba(248, 250, 252, 0.5)' }
    ],
    storageOptions: [
      { size: '2 TB Immutable Storage', priceModifier: 0 }
    ],
    specs: {
      processor: 'Quantum Cryptographic Sovereign Chip',
      ram: '32GB Ultra-Security Cache',
      storage: '2TB Vault-Grade Hardened Shield',
      display: '6.7" Diamond-Resonance 120Hz Core',
      camera: '100MP Retro-Resonant Pure-Filter System',
      battery: '6000mAh Solid State Thermal Charge',
      neuralScore: 99,
      holoCapable: true,
      quantumSecure: true
    },
    images: ['front_view', 'angled_view', 'back_view'],
    trendingScore: 92
  },
  {
    id: 'nxr-pods-sound',
    name: 'NEXORA NEURAL AUDIOPODS',
    tagline: 'Direct spatial auditory resonance.',
    category: 'accessory',
    price: 349,
    originalPrice: 399,
    description: 'Utilizes bone conduction resonance and real-time brainwave auditory processing to output ultra-pure sound directly inside your audio cortex.',
    longDescription: 'The Nexora Neural Audiopods deliver deep, uncompressed luxury audio directly through bone conduction and spatial-cortex feedback. Completely bypassing standard canal fatigue, the pods synchronize with your heartbeat to dynamically adjust background isolation and active frequency dampening.',
    rating: 4.85,
    reviewsCount: 198,
    availability: 'In Stock',
    colors: [
      { name: 'Sleek Chrome', hex: '#94a3b8', glowColor: 'rgba(148, 163, 184, 0.4)' },
      { name: 'Sovereign Violet', hex: '#c084fc', glowColor: 'rgba(192, 132, 252, 0.4)' }
    ],
    storageOptions: [
      { size: 'Static Sound Matrix', priceModifier: 0 }
    ],
    specs: {
      processor: 'Nexora Audio-Sensing N1',
      ram: '8GB Buffering Matrix',
      storage: 'Integrated streaming audio receiver (No files)',
      display: 'None (Dynamic Sound Control)',
      camera: 'Spatial Directional Tracking Mic Arrays',
      battery: '12 Hours Active Cortex Playback',
      neuralScore: 90,
      holoCapable: false,
      quantumSecure: true
    },
    images: ['front_view', 'angled_view', 'back_view'],
    trendingScore: 78
  },
  {
    id: 'nxr-dock-holo',
    name: 'NEXORA HOLO-DOCK CHARGER',
    tagline: 'Holographic ambient projection charger.',
    category: 'accessory',
    price: 249,
    originalPrice: 299,
    description: 'Charges devices inductively via localized resonance. Simultaneously projects an interactive, atmospheric desktop display of notifications and 3D visual clocks.',
    longDescription: 'The Holo-Dock Charger is an elegant baseplate utilizing safe magnetic resonance charging fields to power your Nexora smartphone. While resting, a specialized mirror prism projects a custom holographic layout into thin air, featuring dynamic time, notifications, calls, and ambient visual graphs.',
    rating: 4.91,
    reviewsCount: 265,
    availability: 'In Stock',
    colors: [
      { name: 'Hyper Obsidian', hex: '#1e293b', glowColor: 'rgba(30, 41, 59, 0.5)' },
      { name: 'Aether White', hex: '#f1f5f9', glowColor: 'rgba(241, 245, 249, 0.4)' }
    ],
    storageOptions: [
      { size: 'Direct Stream Grid', priceModifier: 0 }
    ],
    specs: {
      processor: 'Nexora Lumos-Emitter LightEngine',
      ram: '4GB Dynamic Grid Handler',
      storage: 'Integrated Holographic Projections',
      display: 'Interactive Holographic Light Display',
      camera: 'Hand/Finger Depth Sensor for gesture sweep',
      battery: 'Direct AC wall power',
      neuralScore: 85,
      holoCapable: true,
      quantumSecure: false
    },
    images: ['front_view', 'angled_view', 'back_view'],
    trendingScore: 82
  }
];

export const mockPromoCodes = [
  { code: 'NEXORA2026', discountAmount: 150, description: '$150 off initial futuristic launch' },
  { code: 'NEURALCORE', discountAmount: 300, description: 'Exclusive neural flagship discount' },
  { code: 'CYBERPUNK', discountAmount: 200, description: 'Futuristic theme discount' }
];

export const mockTestimonials = [
  {
    id: 1,
    name: 'Valeria Dax',
    role: 'Digital Architect',
    quote: 'The X1 Phantom feels completely ahead of its time. The active glass transition is breathtaking and the neural-sensory biometric works instantly.',
    rating: 5
  },
  {
    id: 2,
    name: 'Trace Vandal',
    role: 'Cyber-Sim Competitor',
    quote: 'Absolutely flawless frame rate stability under heaviest computing loads. The auto-rising heat vent on G-8 Raptor is mechanical poetry.',
    rating: 5
  },
  {
    id: 3,
    name: 'Aron Sterling',
    role: 'Luxury Curator',
    quote: 'I purchased the Avalon Prime. The meteorite alloy chassis feels heavy, organic, and beautifully sculpted. The hardware crypto-key is supreme peace of mind.',
    rating: 5
  }
];
