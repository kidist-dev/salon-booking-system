
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Star, CheckCircle, CreditCard, DollarSign, Calendar, Clock, User, Plus, Minus, ShieldCheck, ShoppingBag, ArrowRight, Sparkles, Gem, Crown, LogIn } from "lucide-react";

// --- DETAILED LUXURY PRODUCT INTERFACE ---
interface Product {
  id: number;
  name: string;
  type: string;         
  quality: string;      
  description: string;
  price: number;        
  rating: number;
  image: string;
}

const FEATURED_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Olaplex No.7 Bonding Oil",
    type: "Restorative Styling Serum",
    quality: "Premium Professional Grade (Sulfate & Paraben Free)",
    description: "A highly-concentrated, weightless reparative styling oil that dramatically increases hair shine, softness, and vibrant color tone depth while minimizing thermal flyaways up to 450°F.",
    price: 30.0,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1608248597481-496100c8c836?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 2,
    name: "Hydrating Caviar Mask",
    type: "Intensive Deep Conditioner",
    quality: "100% Organic Clinical Esthetic Grade",
    description: "Deep conditioning molecular treatment designed to rebuild severely damaged luxury hair strands, locking in rich moisture, pure proteins, and natural scalp nutrients.",
    price: 45.0,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&q=80&w=600",
  },
];

export default function SalonLandingPage() {
  // State Management
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedTipPercentage, setSelectedTipPercentage] = useState<number | null>(20);
  const [customTip, setCustomTip] = useState<string>("");
  
  const [productQuantities, setProductQuantities] = useState<{ [key: number]: number }>({
    1: 1,
    2: 1,
  });

  const baseServiceTotal = 150.00; 

  const handleIncrement = (id: number) => {
    setProductQuantities(prev => ({ ...prev, [id]: prev[id] + 1 }));
  };

  const handleDecrement = (id: number) => {
    setProductQuantities(prev => ({ ...prev, [id]: Math.max(1, prev[id] - 1) }));
  };

  const calculateTotal = () => {
    const tipAmount = customTip 
      ? parseFloat(customTip) || 0 
      : (baseServiceTotal * (selectedTipPercentage || 0)) / 100;
    return baseServiceTotal + tipAmount;
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white font-sans antialiased selection:bg-amber-500 selection:text-black overflow-x-hidden">
      
      {/* 1. PREMIUM FIXED NAVIGATION BAR (NAVBAR) */}
      <nav className="fixed top-0 w-full z-50 bg-[#000000]/80 backdrop-blur-md border-b border-amber-500/20 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          <div className="text-xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500">
            AURA SALON
          </div>

          <div className="hidden md:flex items-center space-x-8 text-sm uppercase tracking-wider text-gray-300">
            <a href="#hero" className="hover:text-amber-400 transition-colors">Home</a>
            <a href="#experience" className="hover:text-amber-400 transition-colors">Experience</a>
            <a href="#products" className="hover:text-amber-400 transition-colors">Products</a>
            <a href="#payment" className="hover:text-amber-400 transition-colors">Checkout</a>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => alert("Redirecting to Salon Member Secure Login Portal...")}
              className="flex items-center gap-2 text-xs font-semibold tracking-widest border border-white/10 hover:border-amber-400/50 px-4 py-2.5 rounded-full text-white transition-all"
            >
              <LogIn size={14} className="text-amber-400" />
              LOGIN
            </motion.button>

            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(245, 158, 11, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsBookingModalOpen(true)}
              className="bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold px-5 py-2.5 rounded-full text-xs transition-all tracking-widest"
            >
              BOOK APPOINTMENT
            </motion.button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white focus:outline-none">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden absolute top-20 left-0 w-full bg-[#0b0b0b] border-b border-amber-500/20 px-6 py-8 flex flex-col space-y-6 text-center tracking-widest z-50"
            >
              <a href="#hero" onClick={() => setIsMobileMenuOpen(false)} className="text-lg text-gray-300 hover:text-amber-400">HOME</a>
              <a href="#experience" onClick={() => setIsMobileMenuOpen(false)} className="text-lg text-gray-300 hover:text-amber-400">EXPERIENCE</a>
              <a href="#products" onClick={() => setIsMobileMenuOpen(false)} className="text-lg text-gray-300 hover:text-amber-400">PRODUCTS</a>
              <a href="#payment" onClick={() => setIsMobileMenuOpen(false)} className="text-lg text-gray-300 hover:text-amber-400">CHECKOUT</a>
              
              <button 
                onClick={() => { setIsMobileMenuOpen(false); alert("Opening login modal..."); }}
                className="border border-white/10 text-white font-bold py-3 rounded-full w-full flex items-center justify-center gap-2"
              >
                <LogIn size={16} className="text-amber-400" />
                LOGIN
              </button>

              <button 
                onClick={() => { setIsMobileMenuOpen(false); setIsBookingModalOpen(true); }}
                className="bg-amber-500 text-black font-bold py-3 rounded-full w-full"
              >
                BOOK NOW
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* 2. RESTRUCTURED HERO SECTION: TEXT LEFT, FULL FACE PHOTO RIGHT */}
      <section id="hero" className="min-h-screen pt-24 pb-12 flex items-center justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          
          {/* Left Column: Heading Content */}
          <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left order-2 lg:order-1">
            <p className="text-xs uppercase tracking-[0.3em] text-amber-400 mb-4 font-semibold">
              Redefining High-End Hair & Beauty
            </p>
            <h1 className="text-4xl sm:text-6xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
              Where Luxury <br className="hidden lg:inline" />
              Meets <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">Perfection</span>
            </h1>
            <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 font-light mb-8 leading-relaxed">
              Step into an exclusive world designed entirely around elite aesthetics. Experience bespoke clinical scalp profiling, private relaxation suites, and runway-ready transformations.
            </p>
            <div className="flex justify-center lg:justify-start">
              <motion.button 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsBookingModalOpen(true)}
                className="bg-gradient-to-r from-amber-400 to-amber-600 text-black font-bold uppercase tracking-widest text-xs px-8 py-4 rounded-full hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] transition-all"
              >
                Reserve Premium Session
              </motion.button>
            </div>
          </div>

          {/* Right Column: Custom Portrait Image (See Full Face) */}
          <div className="lg:col-span-5 flex justify-center order-1 lg:order-2 w-full">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-full max-w-md aspect-[4/5] rounded-[2rem] overflow-hidden border border-amber-500/20 shadow-[0_0_50px_rgba(245,158,11,0.05)] bg-neutral-900"
            >
              <img 
                src="/beauty.jpg" 
                alt="Aura Salon Featured Luxury Portrait" 
                className="w-full h-full object-cover object-center" 
              />
              {/* Subtle elegant gradient overlay cornering the card */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </motion.div>
          </div>

        </div>
      </section>

      {/* 3. SIGNATURE EXPERIENCE PATHWAY */}
      <section id="experience" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="text-center mb-20">
          <h2 className="text-xs uppercase tracking-[0.25em] text-amber-400 font-semibold mb-2">The Signature Pathway</h2>
          <p className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            From Premium Consultation <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-600 font-light italic">to Elite Transformation</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {[
            { phase: "Phase 01", title: "Premium Consultation & Scan", desc: "We begin with deep digital scalp mapping and micro-level chemical composition hair diagnostics to read your profile completely before any cutting begins.", icon: <Sparkles className="text-amber-400" size={24} /> },
            { phase: "Phase 02", title: "The VIP Oasis Treatment", desc: "Relax inside a private bay room. Your hair is treated with bespoke molecular organic formulas, coupled with a deep scalp architectural pressure massage.", icon: <Gem className="text-amber-400" size={24} /> },
            { phase: "Phase 03", title: "Elite Master Transformation", desc: "Our top global directors utilize advanced micro-layer cutting or high-definition balayage art to create a jaw-dropping look completely optimized around your bone structure.", icon: <Crown className="text-amber-400" size={24} /> }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, borderColor: "rgba(245, 158, 11, 0.4)" }}
              className="bg-[#0b0b0b] p-8 rounded-3xl border border-white/5 relative overflow-hidden flex flex-col justify-between group"
            >
              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">{item.phase}</span>
                  <div className="p-3 bg-neutral-900 border border-white/10 rounded-2xl group-hover:bg-amber-400 group-hover:text-black transition-all">{item.icon}</div>
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-amber-300 transition-colors">{item.title}</h3>
                <p className="text-gray-400 text-sm font-light leading-relaxed">{item.desc}</p>
              </div>
              {idx < 2 && (
                <div className="hidden lg:flex absolute top-1/2 -right-4 transform -translate-y-1/2 z-20 bg-black border border-white/10 p-1.5 rounded-full text-amber-400">
                  <ArrowRight size={14} />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. HIGH-INFORMATION FEATURED PRODUCTS WITH LIVE EXAMPLES */}
      <section id="products" className="py-24 bg-[#050505] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-xs uppercase tracking-[0.25em] text-amber-400 font-semibold mb-2">Curated Apothecary</h2>
            <p className="text-3xl sm:text-4xl font-bold tracking-tight">Premium Retail Products</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {FEATURED_PRODUCTS.map((product) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-[#0b0b0b] rounded-3xl overflow-hidden border border-white/10 flex flex-col sm:flex-row shadow-2xl group"
              >
                <div className="relative w-full sm:w-1/2 h-64 sm:h-auto min-h-[300px] bg-neutral-900 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                  />
                  <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full flex items-center space-x-1 border border-white/10">
                    <Star size={12} className="text-amber-400 fill-amber-400" />
                    <span className="text-xs font-bold text-white">{product.rating.toFixed(1)}</span>
                  </div>
                </div>

                <div className="p-6 sm:p-8 w-full sm:w-1/2 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2.5 py-1 rounded-md mb-2 inline-block">
                      {product.type}
                    </span>
                    <h3 className="text-xl font-bold tracking-tight text-white mb-1 group-hover:text-amber-300 transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center space-x-1.5 text-xs text-emerald-400 font-medium mb-3">
                      <ShieldCheck size={14} />
                      <span>{product.quality}</span>
                    </div>
                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-gray-500 block">Unit Price</span>
                      <span className="text-lg font-black text-amber-400">${product.price.toFixed(2)}</span>
                    </div>

                    <div className="flex items-center bg-black border border-white/10 rounded-xl p-1">
                      <button onClick={() => handleDecrement(product.id)} className="w-7 h-7 flex items-center justify-center bg-neutral-900 rounded-lg text-gray-400 hover:text-white">
                        <Minus size={12} />
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-white">
                        {productQuantities[product.id]}
                      </span>
                      <button onClick={() => handleIncrement(product.id)} className="w-7 h-7 flex items-center justify-center bg-neutral-900 rounded-lg text-gray-400 hover:text-white">
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>

                  <button 
                    onClick={() => alert(`Added ${productQuantities[product.id]}x ${product.name} to order total: $${(product.price * productQuantities[product.id]).toFixed(2)}`)}
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold uppercase tracking-widest text-[10px] py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 hover:shadow-[0_4px_15px_rgba(245,158,11,0.2)]"
                  >
                    <ShoppingBag size={12} />
                    Add to Session Order
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PAYMENT SUMMARY */}
      <section id="payment" className="py-24 max-w-4xl mx-auto px-4">
        <div className="bg-[#0b0b0b] p-8 rounded-3xl border border-amber-500/20 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-sm font-bold text-amber-400 mb-4 uppercase">Summary</h3>
            <div className="text-sm text-gray-400 space-y-2">
              <div className="flex justify-between"><span>Bespoke Styling Session</span><span>$150.00</span></div>
            </div>
            
            <div className="mt-4">
              <span className="text-xs text-gray-400 block mb-2">Stylist Tip Amount:</span>
              <div className="grid grid-cols-4 gap-2">
                {[15, 20, 25].map((p) => (
                  <button key={p} onClick={() => { setSelectedTipPercentage(p); setCustomTip(""); }} className={`py-1.5 text-xs font-bold rounded-lg ${selectedTipPercentage === p && !customTip ? "bg-amber-400 text-black" : "bg-black border border-white/5"}`}>{p}%</button>
                ))}
                <button onClick={() => setSelectedTipPercentage(null)} className={`py-1.5 text-xs font-bold rounded-lg ${selectedTipPercentage === null ? "bg-amber-400 text-black" : "bg-black border border-white/5"}`}>Custom</button>
              </div>
              {selectedTipPercentage === null && (
                <input type="number" placeholder="Enter tip amount" value={customTip} onChange={(e) => setCustomTip(e.target.value)} className="w-full mt-2 bg-black border border-white/10 rounded-lg p-2 text-xs text-white" />
              )}
            </div>

            <div className="mt-6 flex justify-between items-center bg-black p-4 rounded-xl">
              <span className="text-xs text-gray-400">Total Balance Due:</span>
              <span className="text-xl font-bold text-white">${calculateTotal().toFixed(2)}</span>
            </div>
          </div>
          
          <div className="bg-black/50 p-6 rounded-xl border border-white/5 flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-bold text-amber-400 mb-4 uppercase">Payment Details</h3>
              <input type="text" placeholder="Card Number" className="w-full bg-neutral-900 border border-white/10 rounded-lg p-2.5 text-sm mb-4 focus:outline-none focus:border-amber-400" />
            </div>
            <button className="w-full bg-amber-500 text-black font-bold py-2.5 rounded-lg text-xs uppercase tracking-wider">Pay Now</button>
          </div>
        </div>
      </section>

      {/* --- POPUP INTERACTIVE BOOKING MODAL --- */}
      <AnimatePresence>
        {isBookingModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsBookingModalOpen(false)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative bg-[#0b0b0b] border border-amber-400/30 w-full max-w-md rounded-3xl p-6 shadow-2xl z-10">
              <button onClick={() => setIsBookingModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X size={20} /></button>
              <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-400 mb-2">Bespoke Salon Appointment</h3>
              <p className="text-xs text-gray-400 mb-6">Select your preferred salon treatment slot block.</p>
              <div className="space-y-4">
                <div className="relative"><User size={16} className="absolute left-3 top-3.5 text-amber-500/60" /><input type="text" placeholder="Your Full Name" className="w-full bg-black border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-amber-400" /></div>
                <div className="relative"><Calendar size={16} className="absolute left-3 top-3.5 text-amber-500/60" /><input type="date" className="w-full bg-black border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-amber-400 color-scheme-dark" /></div>
                <div className="relative"><Clock size={16} className="absolute left-3 top-3.5 text-amber-500/60" /><input type="time" className="w-full bg-black border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-amber-400" /></div>
              </div>
              <button onClick={() => setIsBookingModalOpen(false)} className="w-full bg-gradient-to-r from-amber-400 to-amber-500 text-black font-bold uppercase tracking-widest text-xs py-4 rounded-xl mt-6">Confirm Appointment</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}