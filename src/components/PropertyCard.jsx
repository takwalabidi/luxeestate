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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] transition-all duration-700"
    >
      <div className="relative aspect-[5/4] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={imgIndex}
            src={property.images[imgIndex]}
            alt={property.title}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="absolute inset-0 flex items-center justify-between px-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <button 
            onClick={prevImg} 
            className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-2xl flex items-center justify-center text-white border border-white/20 hover:bg-white hover:text-slate-950 transition-all"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={nextImg} 
            className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-2xl flex items-center justify-center text-white border border-white/20 hover:bg-white hover:text-slate-950 transition-all"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        <button 
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
          className="absolute top-6 right-6 z-10 p-3 rounded-full bg-white/10 backdrop-blur-2xl border border-white/20 transition-all hover:bg-white active:scale-90 shadow-xl"
        >
          <Heart className={clsx("w-5 h-5 transition-colors", isFavorite ? "fill-rose-500 text-rose-500" : "text-white group-hover:text-rose-400")} />
        </button>

        <div className="absolute bottom-6 left-6">
          <span className="px-4 py-2 bg-emerald-500/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-lg">
            {property.category}
          </span>
        </div>

        <div className="absolute bottom-8 right-8 flex gap-1.5">
          {property.images.map((_, i) => (
            <div 
              key={i} 
              className={clsx("h-1 rounded-full transition-all duration-500", i === imgIndex ? "bg-white w-8" : "bg-white/40 w-2")}
            />
          ))}
        </div>
      </div>

      <div className="p-8 pb-10">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-2xl font-black text-slate-900 tracking-tighter leading-tight group-hover:text-emerald-600 transition-colors">{property.title}</h3>
          <div className="text-right">
            <p className="text-2xl font-black text-slate-950">
              ${(property.price / 1000000).toFixed(1)}M
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-slate-400 text-[13px] font-bold mb-8">
          <MapPin className="w-4 h-4 text-emerald-500" />
          {property.location}
        </div>

        <div className="flex items-center justify-between pt-8 border-t border-slate-50">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-slate-950 font-black">
              <Bed className="w-4 h-4 text-slate-400" />
              {property.beds}
            </div>
            <span className="text-[9px] uppercase tracking-widest text-slate-400 font-black">Bedrooms</span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-slate-950 font-black">
              <Bath className="w-4 h-4 text-slate-400" />
              {property.baths}
            </div>
            <span className="text-[9px] uppercase tracking-widest text-slate-400 font-black">Bathrooms</span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-slate-950 font-black">
              <Move className="w-4 h-4 text-slate-400" />
              {property.sqft.toLocaleString()}
            </div>
            <span className="text-[9px] uppercase tracking-widest text-slate-400 font-black">Sq. Ft.</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
