import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, ArrowRight, Github, Chrome } from 'lucide-react';

export default function LoginModal({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
          >
            <div className="p-10">
              <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-950 rounded-xl flex items-center justify-center text-white font-black">L</div>
                  <h2 className="text-2xl font-black tracking-tighter">Welcome back</h2>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input 
                    type="email" 
                    placeholder="Email Address"
                    className="w-full pl-14 pr-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-slate-200 outline-none font-semibold text-slate-900 transition-all placeholder:text-slate-400"
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input 
                    type="password" 
                    placeholder="Password"
                    className="w-full pl-14 pr-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-slate-200 outline-none font-semibold text-slate-900 transition-all placeholder:text-slate-400"
                  />
                </div>
              </div>

              <button className="w-full mt-8 bg-slate-950 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-emerald-600 transition-all flex items-center justify-center gap-3">
                Continue <ArrowRight className="w-4 h-4" />
              </button>

              <div className="relative my-10">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100" /></div>
                <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest">
                  <span className="bg-white px-4 text-slate-400">Or connect with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-3 py-4 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors font-bold text-slate-600 text-sm">
                  <Chrome className="w-5 h-5" /> Google
                </button>
                <button className="flex items-center justify-center gap-3 py-4 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors font-bold text-slate-600 text-sm">
                  <Github className="w-5 h-5" /> GitHub
                </button>
              </div>

              <p className="text-center mt-10 text-[11px] text-slate-400 font-bold">
                New to Luxe Estate? <a href="#" className="text-emerald-600 hover:underline">Create an account</a>
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
