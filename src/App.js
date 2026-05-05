import React, { useState, useMemo } from 'react';
import { Search, MapPin, Heart, Menu, SlidersHorizontal, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROPERTIES } from './data';
import PropertyCard from './components/PropertyCard';
import { clsx } from 'clsx';

export default function App() {
  const [search, setSearch] = useState('');
  const [favorites, setFavorites] = useState(new Set());
  const [priceRange, setPriceRange] = useState(10000000);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');

  const toggleFavorite = (id) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) newFavorites.delete(id);
    else newFavorites.add(id);
    setFavorites(newFavorites);
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
    <div className="min-h-screen bg-[#FBFBFC] text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Global Navbar */}
      <nav className="sticky top-0 z-[60] bg-white/70 backdrop-blur-xl border-b border-slate-100/80">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black rotate-3 group-hover:rotate-0 transition-transform shadow-lg shadow-indigo-200">
              L
            </div>
            <span className="text-2xl font-black tracking-tighter text-slate-900">LUXE ESTATE</span>
          </div>
          
          <div className="hidden md:flex items-center gap-10 text-[13px] font-black uppercase tracking-widest text-slate-500">
            <a href="#" className="hover:text-indigo-600 transition-colors">Buy</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Rent</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Sell</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Agents</a>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative cursor-pointer group">
              <Heart className={clsx("w-6 h-6 transition-all duration-300", favorites.size > 0 ? "fill-rose-500 text-rose-500" : "text-slate-400 group-hover:text-slate-600")} />
              {favorites.size > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-rose-500 text-white text-[10px] font-black flex items-center justify-center rounded-full ring-4 ring-white">
                  {favorites.size}
                </span>
              )}
            </div>
            <button className="bg-slate-900 text-white px-8 py-3 rounded-full text-[13px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200 active:scale-95">
              Sign In
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Premium Hero Section */}
        <div className="mb-16 relative">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-[11px] font-black uppercase tracking-widest mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              Premier Real Estate Global
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tighter leading-[0.9]"
            >
              Find your dream <br/><span className="text-indigo-600">sanctuary.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-slate-500 text-xl mb-12 max-w-xl font-medium leading-relaxed"
            >
              Discover exclusive properties in the most prestigious locations worldwide. 
              Premium service for premium lifestyles.
            </motion.p>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4 p-3 bg-white border border-slate-100 rounded-[2.5rem] shadow-2xl shadow-indigo-900/5 backdrop-blur-sm">
            <div className="flex-1 relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search by city, neighborhood, or title..."
                className="w-full pl-16 pr-6 py-5 rounded-[2rem] bg-slate-50/50 text-slate-900 placeholder:text-slate-400 font-semibold focus:bg-white focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={clsx(
                "flex items-center justify-center gap-3 px-8 py-5 rounded-[2rem] font-black uppercase tracking-widest text-[11px] transition-all",
                isFilterOpen ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200" : "bg-slate-50 text-slate-600 hover:bg-slate-100"
              )}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>
            <button className="px-10 py-5 bg-indigo-600 text-white rounded-[2rem] font-black uppercase tracking-widest text-[11px] hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 flex items-center gap-2">
              Search <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <AnimatePresence>
            {isFilterOpen && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-8 p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-xl">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <label className="text-[11px] font-black uppercase tracking-widest text-slate-400">
                          Maximum Budget
                        </label>
                        <span className="text-indigo-600 font-black text-lg">${priceRange.toLocaleString()}</span>
                      </div>
                      <input 
                        type="range" 
                        min="500000" 
                        max="10000000" 
                        step="100000"
                        className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                        value={priceRange}
                        onChange={(e) => setPriceRange(Number(e.target.value))}
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-black uppercase tracking-widest text-slate-400 mb-6">
                        Property Category
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {['All', 'Villa', 'Apartment', 'Mansion', 'Penthouse', 'Cottage'].map(cat => (
                          <button 
                            key={cat} 
                            onClick={() => setActiveCategory(cat)}
                            className={clsx(
                              "px-5 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest transition-all",
                              activeCategory === cat 
                                ? "bg-indigo-600 text-white shadow-md" 
                                : "bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
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
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
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
              className="col-span-full py-32 text-center"
            >
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-[2rem] bg-slate-50 mb-8">
                <X className="w-10 h-10 text-slate-300" />
              </div>
              <h3 className="text-3xl font-black text-slate-900 tracking-tighter mb-2">No matching properties</h3>
              <p className="text-slate-500 font-medium">Try adjusting your search terms or expanding your budget.</p>
            </motion.div>
          )}
        </div>
      </main>

      <footer className="bg-slate-950 text-slate-500 py-24 mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black">L</div>
                <span className="text-2xl font-black text-white tracking-tighter">LUXE ESTATE</span>
              </div>
              <p className="text-lg font-medium text-slate-400 max-w-sm leading-relaxed mb-8">
                Redefining luxury living through curated architectural masterpieces and bespoke real estate services.
              </p>
            </div>
            <div>
              <h4 className="text-white font-black uppercase tracking-widest text-[11px] mb-8">Quick Links</h4>
              <div className="flex flex-col gap-4 font-bold">
                <a href="#" className="hover:text-white transition-colors">About Us</a>
                <a href="#" className="hover:text-white transition-colors">Contact</a>
                <a href="#" className="hover:text-white transition-colors">Our Process</a>
                <a href="#" className="hover:text-white transition-colors">News</a>
              </div>
            </div>
            <div>
              <h4 className="text-white font-black uppercase tracking-widest text-[11px] mb-8">Support</h4>
              <div className="flex flex-col gap-4 font-bold">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
                <a href="#" className="hover:text-white transition-colors">Help Center</a>
              </div>
            </div>
          </div>
          <div className="pt-12 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-8 text-[11px] font-black uppercase tracking-[0.2em]">
            <p>© 2024 LUXE ESTATE GLOBAL. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">INSTAGRAM</a>
              <a href="#" className="hover:text-white transition-colors">TWITTER</a>
              <a href="#" className="hover:text-white transition-colors">LINKEDIN</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
