/**
 * @file AuthArt.jsx
 * @description Dedicated left-side SVG and CSS illustration replicating Screenshot 6.
 * Features medical doctor character, medicine bottle with floating capsules,
 * and background healthcare cross patterns.
 */

import React from 'react';
import { Heart, Plus } from 'lucide-react';

export default function AuthArt() {
  return (
    <div className="relative w-full h-full min-h-[460px] bg-[#07332F] flex flex-col items-center justify-center p-8 overflow-hidden select-none">
      
      {/* Background Medical Cross Watermarks */}
      <div className="absolute top-10 left-10 text-white/5 pointer-events-none">
        <Plus className="w-28 h-28 stroke-[3]" />
      </div>
      <div className="absolute bottom-16 right-6 text-white/5 pointer-events-none">
        <Plus className="w-36 h-36 stroke-[3]" />
      </div>
      <div className="absolute top-1/3 right-1/4 text-white/5 pointer-events-none">
        <Plus className="w-16 h-16 stroke-[3]" />
      </div>

      {/* Floating Hearts from design */}
      <div className="absolute top-20 left-12 animate-bounce duration-1000">
        <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/60 rotate-[-12deg]">
          <Heart className="w-6 h-6 fill-white/40" />
        </div>
      </div>
      <div className="absolute top-1/4 right-12 animate-pulse">
        <div className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/60 rotate-[15deg]">
          <Heart className="w-5 h-5 fill-white/40" />
        </div>
      </div>
      <div className="absolute bottom-24 right-16">
        <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/60 rotate-[-8deg]">
          <Heart className="w-4 h-4 fill-white/40" />
        </div>
      </div>

      {/* Main Composition: Doctor & Pill Bottle (Matching Screenshot 6) */}
      <div className="relative z-10 flex items-end justify-center gap-6 mt-8">
        
        {/* Doctor Figure Illustration */}
        <div className="flex flex-col items-center relative">
          {/* Hair & Head */}
          <div className="w-16 h-16 rounded-full bg-amber-100 border-2 border-slate-700 relative overflow-hidden flex items-center justify-center shadow-md">
            {/* Hair overlay */}
            <div className="absolute top-0 w-full h-7 bg-indigo-950 rounded-b-xl" />
            {/* Friendly face */}
            <div className="relative mt-2 flex gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-800" />
              <span className="w-1.5 h-1.5 rounded-full bg-slate-800" />
            </div>
            <div className="absolute bottom-2.5 w-3 h-1.5 rounded-full border-b-2 border-rose-500" />
          </div>

          {/* Stethoscope */}
          <div className="absolute top-12 z-20 w-8 h-8 border-2 border-slate-700 rounded-b-full border-t-0 flex items-end justify-center">
            <div className="w-2 h-2 rounded-full bg-slate-800 -mb-1" />
          </div>

          {/* Doctor Coat & Torso */}
          <div className="w-24 h-36 bg-white rounded-t-2xl shadow-xl relative border border-slate-200 flex flex-col items-center pt-2">
            {/* Dark inner scrub */}
            <div className="w-10 h-14 bg-indigo-900 rounded-b-md" />
            {/* Clipboard in hand */}
            <div className="absolute -left-3 top-8 w-8 h-12 bg-indigo-900 rounded border border-indigo-700 rotate-[-10deg] shadow-sm flex items-center justify-center">
              <div className="w-5 h-8 bg-white/80 rounded-sm" />
            </div>
          </div>

          {/* Trousers & Shoes */}
          <div className="flex gap-2 -mt-1">
            <div className="w-6 h-16 bg-indigo-950 rounded-b-md" />
            <div className="w-6 h-16 bg-indigo-950 rounded-b-md" />
          </div>
        </div>

        {/* Medicine Pill Bottle (Matching Screenshot 6) */}
        <div className="flex flex-col items-center relative -mb-2">
          {/* White Ridged Cap */}
          <div className="w-24 h-7 bg-slate-100 rounded-t-lg border-2 border-slate-300 shadow-sm flex justify-around items-center px-1">
            <span className="w-1 h-4 bg-slate-300 rounded" />
            <span className="w-1 h-4 bg-slate-300 rounded" />
            <span className="w-1 h-4 bg-slate-300 rounded" />
            <span className="w-1 h-4 bg-slate-300 rounded" />
            <span className="w-1 h-4 bg-slate-300 rounded" />
          </div>

          {/* Amber Bottle Body with White Label */}
          <div className="w-28 h-32 bg-amber-400 rounded-b-2xl shadow-2xl relative border-2 border-amber-500 overflow-hidden flex items-center justify-center">
            {/* Label */}
            <div className="w-full h-14 bg-white/95 border-y border-amber-300 flex items-center justify-center">
              <span className="text-[10px] font-bold text-amber-900 uppercase tracking-widest">
                MediNest
              </span>
            </div>
          </div>

          {/* Green Leaf sprigs behind bottle */}
          <div className="absolute -left-6 bottom-0 w-10 h-14 bg-emerald-400 rounded-full rotate-[-45deg] opacity-80 -z-10" />
          <div className="absolute -right-6 bottom-0 w-10 h-14 bg-emerald-400 rounded-full rotate-[45deg] opacity-80 -z-10" />

          {/* Scattered Capsules in foreground */}
          <div className="flex gap-2 mt-2">
            <div className="w-8 h-4 rounded-full bg-white border border-slate-300 shadow flex overflow-hidden rotate-[-12deg]">
              <span className="w-1/2 bg-amber-400" />
              <span className="w-1/2 bg-white" />
            </div>
            <div className="w-8 h-4 rounded-full bg-white border border-slate-300 shadow flex overflow-hidden rotate-[15deg]">
              <span className="w-1/2 bg-rose-400" />
              <span className="w-1/2 bg-white" />
            </div>
          </div>
        </div>

      </div>

      <div className="text-center mt-8 relative z-10">
        <h3 className="text-lg font-bold text-white tracking-wide">
          Safe & Compassionate Care
        </h3>
        <p className="text-xs text-slate-300 max-w-xs mt-1">
          Your health journey with verified physicians and modern clinical tools.
        </p>
      </div>
    </div>
  );
}
