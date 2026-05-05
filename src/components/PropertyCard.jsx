import React, { useState } from 'react';
import { MapPin, Bed, Bath, Move, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';

export default function PropertyCard({ property, isFavorite, onToggleFavorite }) {
  const [imgIndex, setImgIndex] = useState(0);

  const nextImg = (e) => {
    e.stopPropagation();
    setImgIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImg = (e) => {
    e.stopPropagation();
    setImgIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="group bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-900/5 transition-all duration-500"
    >
      {/* Image Gallery Section */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={imgIndex}
            src={property.images[imgIndex]}
            alt={property.title}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, ease: "circOut" }}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
        </AnimatePresence>

        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

        {/* Controls */}
        <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button 
            onClick={prevImg} 
            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center text-white border border-white/20 hover:bg-white hover:text-indigo-600 transition-all"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={nextImg} 
            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center text-white border border-white/20 hover:bg-white hover:text-indigo-600 transition-all"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        <button 
          onClick={onToggleFavorite}
          className="absolute top-5 right-5 z-10 p-2.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 transition-all hover:bg-white active:scale-90"
        >
          <Heart className={clsx("w-5 h-5 transition-colors", isFavorite ? "fill-rose-500 text-rose-500" : "text-white group-hover:text-rose-400")} />
        </button>

        <div className="absolute bottom-5 left-5">
          <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md text-indigo-950 text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
            {property.category}
          </span>
        </div>

        {/* Pagination Dots */}
        <div className="absolute bottom-6 right-6 flex gap-1.5">
          {property.images.map((_, i) => (
            <div 
              key={i} 
              className={clsx("h-1 rounded-full transition-all duration-300 shadow-sm", i === imgIndex ? "bg-white w-6" : "bg-white/40 w-1")}
            />
          ))}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-8">
        <div className="flex justify-between items-start mb-2 gap-4">
          <h3 className="text-xl font-bold text-slate-900 tracking-tight leading-tight">{property.title}</h3>
          <p className="text-xl font-black text-indigo-600 whitespace-nowrap">
            ${(property.price / 1000000).toFixed(1)}M
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-slate-400 text-sm mb-6">
          <MapPin className="w-4 h-4 text-indigo-400" />
          {property.location}
        </div>

        <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-50">
          <div className="flex flex-col items-center gap-1.5">
            <div className="flex items-center gap-2 text-slate-700 font-bold">
              <Bed className="w-4 h-4 text-indigo-500" />
              {property.beds}
            </div>
            <span className="text-[9px] uppercase tracking-widest text-slate-400 font-black">Beds</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <div className="flex items-center gap-2 text-slate-700 font-bold">
              <Bath className="w-4 h-4 text-indigo-500" />
              {property.baths}
            </div>
            <span className="text-[9px] uppercase tracking-widest text-slate-400 font-black">Baths</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <div className="flex items-center gap-2 text-slate-700 font-bold">
              <Move className="w-4 h-4 text-indigo-500" />
              {property.sqft.toLocaleString()}
            </div>
            <span className="text-[9px] uppercase tracking-widest text-slate-400 font-black">Sqft</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
