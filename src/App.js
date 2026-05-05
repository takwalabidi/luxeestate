import React, { useState, useMemo, useEffect } from 'react';
import { Search, Heart, SlidersHorizontal, X, ArrowRight, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROPERTIES } from './data';
import PropertyCard from './components/PropertyCard';
import LoginModal from './components/LoginModal';
import { clsx } from 'clsx';

export default function App() {
  const [search, setSearch] = useState('');
  const [favorites, setFavorites] = useState(new Set());
  const [priceRange, setPriceRange] = useState(10000000);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // Load favorites from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('luxe_favorites');
    if (saved) {
      setFavorites(new Set(JSON.parse(saved)));
    }
  }, []);

  // Persist favorites to localStorage
  const toggleFavorite = (id) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) newFavorites.delete(id);
    else newFavorites.add(id);
    setFavorites(newFavorites);
    localStorage.setItem('luxe_favorites', JSON.stringify(Array.from(newFavorites)));
  };

  const filteredProperties = useMemo(() => {
    return PROPERTIES.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || 
                            p.location.toLowerCase().includes(search.toLowerCase());
      const matchesPrice = p.price <= priceRange;
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
      return matchesSearch && matchesPrice && matchesCategory;
    });
  }, [search, priceRange, activeCategory]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      
      {/* Global Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-[60] bg-white/70 backdrop-blur-xl border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="w-10 h-10 bg-slate-950 rounded-2xl flex items-center justify-center text-white font-black rotate-3 group-hover:rotate-0 transition-transform shadow-lg shadow-slate-200">
              L
            </div>
            <span className="text-2xl font-black tracking-tighter text-slate-900">LUXE ESTATE</span>
          </div>
          
          <div className="hidden md:flex items-center gap-10 text-[12px] font-black uppercase tracking-widest text-slate-500">
            <a href="#" className="hover:text-slate-950 transition-colors">Properties</a>
            <a href="#" className="hover:text-slate-950 transition-colors">Collections</a>
            <a href="#" className="hover:text-slate-950 transition-colors">Agents</a>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative cursor-pointer group p-2">
              <Heart className={clsx("w-5 h-5 transition-all duration-300", favorites.size > 0 ? "fill-rose-500 text-rose-500" : "text-slate-400 group-hover:text-slate-600")} />
              {favorites.size > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-rose-500 text-white text-[9px] font-black flex items-center justify-center rounded-full ring-2 ring-white">
                  {favorites.size}
                </span>
              )}
            </div>
            <button 
              onClick={() => setIsLoginOpen(true)}
              className="bg-slate-950 text-white px-8 py-3 rounded-full text-[12px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 active:scale-95"
            >
              Sign In
            </button>
          </div>
        </div>
      </nav>

      {/* Cinematic Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2400"
            className="w-full h-full object-cover"
            alt="Hero Background"
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/20 to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-4xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-full text-[11px] font-black uppercase tracking-[0.2em] mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Curated Global Collection
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black text-white mb-10 tracking-tighter leading-[0.9] drop-shadow-2xl"
          >
            Find your dream <br/><span className="text-emerald-400">sanctuary.</span>
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col md:flex-row gap-3 p-3 bg-white/90 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)]"
          >
            <div className="flex-1 relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="City, neighborhood, or lifestyle..."
                className="w-full pl-16 pr-6 py-5 rounded-[2rem] bg-slate-100/50 text-slate-900 placeholder:text-slate-400 font-bold focus:bg-white outline-none transition-all"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={clsx(
                "flex items-center justify-center gap-3 px-8 py-5 rounded-[2rem] font-black uppercase tracking-widest text-[11px] transition-all",
                isFilterOpen ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              )}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>
            <button className="px-10 py-5 bg-slate-950 text-white rounded-[2rem] font-black uppercase tracking-widest text-[11px] hover:bg-emerald-600 transition-all shadow-xl flex items-center justify-center gap-2">
              Search <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 -mt-16 relative z-20 pb-32">
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-12"
            >
              <div className="p-10 bg-white border border-slate-100 rounded-[2.5rem] shadow-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                  <div>
                    <div className="flex justify-between items-center mb-8">
                      <label className="text-[11px] font-black uppercase tracking-widest text-slate-400">
                        Maximum Investment
                      </label>
                      <span className="text-slate-950 font-black text-2xl">${(priceRange/1000000).toFixed(1)}M</span>
                    </div>
                    <input 
                      type="range" 
                      min="500000" 
                      max="10000000" 
                      step="100000"
                      className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                      value={priceRange}
                      onChange={(e) => setPriceRange(Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-black uppercase tracking-widest text-slate-400 mb-8">
                      Refine by Category
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {['All', 'Villa', 'Apartment', 'Mansion', 'Penthouse', 'Cottage'].map(cat => (
                        <button 
                          key={cat} 
                          onClick={() => setActiveCategory(cat)}
                          className={clsx(
                            "px-6 py-3 rounded-full text-[11px] font-black uppercase tracking-widest transition-all",
                            activeCategory === cat 
                              ? "bg-slate-950 text-white shadow-lg" 
                              : "bg-slate-50 text-slate-400 hover:bg-slate-100"
                          )}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredProperties.length > 0 ? (
            filteredProperties.map(property => (
              <PropertyCard 
                key={property.id} 
                property={property} 
                isFavorite={favorites.has(property.id)}
                onToggleFavorite={() => toggleFavorite(property.id)}
              />
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full py-32 text-center bg-white rounded-[3rem] border border-dashed border-slate-200"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-50 mb-6">
                <X className="w-8 h-8 text-slate-300" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tighter mb-2">No matching havens found</h3>
              <p className="text-slate-400 font-medium">Try broadening your search or adjusting your budget.</p>
            </motion.div>
          )}
        </div>
      </main>

      <footer className="bg-slate-950 text-slate-500 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-emerald-600 rounded-2xl flex items-center justify-center text-white font-black">L</div>
                <span className="text-2xl font-black text-white tracking-tighter">LUXE ESTATE</span>
              </div>
              <p className="text-xl font-medium text-slate-400 max-w-sm leading-relaxed">
                Curating the world's most exceptional architectural living spaces.
              </p>
            </div>
            <div>
              <h4 className="text-white font-black uppercase tracking-widest text-[11px] mb-8">Discover</h4>
              <div className="flex flex-col gap-4 font-bold text-[13px]">
                <a href="#" className="hover:text-white transition-colors">Collections</a>
                <a href="#" className="hover:text-white transition-colors">Market Analysis</a>
                <a href="#" className="hover:text-white transition-colors">Architects</a>
              </div>
            </div>
            <div>
              <h4 className="text-white font-black uppercase tracking-widest text-[11px] mb-8">Legal</h4>
              <div className="flex flex-col gap-4 font-bold text-[13px]">
                <a href="#" className="hover:text-white transition-colors">Privacy</a>
                <a href="#" className="hover:text-white transition-colors">Terms</a>
                <a href="#" className="hover:text-white transition-colors">Compliance</a>
              </div>
            </div>
          </div>
          <div className="pt-12 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black uppercase tracking-[0.3em]">
            <p>© 2024 LUXE ESTATE GLOBAL</p>
            <div className="flex gap-12">
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
              <a href="#" className="hover:text-white transition-colors">X</a>
              <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
