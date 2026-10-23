/**
 * @file NotFound.jsx
 * @description 404 Not Found error page precisely reproducing Screenshot 5.
 * Features vector illustrated 404 typography and a coral 'Back to home' action button.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Button from '../../components/common/Button.jsx';

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | MediNest</title>
      </Helmet>

      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center select-none">
        <div className="max-w-md w-full space-y-8 animate-in fade-in zoom-in-95 duration-300">
          
          {/* Header Typography (Matching Screenshot 5) */}
          <div className="space-y-1">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Sorry,
            </h1>
            <p className="text-lg sm:text-xl font-medium text-slate-600">
              This page is not found.
            </p>
          </div>

          {/* 404 Vector Illustration (Matching Screenshot 5) */}
          <div className="relative py-6 flex items-center justify-center">
            <div className="relative flex items-center justify-center gap-2">
              
              {/* Digit 4 */}
              <span className="text-8xl sm:text-9xl font-black text-[#E8A588] tracking-tighter drop-shadow-md">
                4
              </span>

              {/* Character inside the '0' */}
              <div className="relative w-28 sm:w-36 h-28 sm:h-36 flex items-center justify-center">
                {/* 0 Outer Ring */}
                <div className="w-full h-full rounded-full border-[18px] sm:border-[22px] border-[#DFA288] shadow-inner flex items-center justify-center bg-slate-50 relative overflow-hidden">
                  {/* Perplexed Character Illustration */}
                  <div className="flex flex-col items-center mt-4">
                    {/* Head & Hair */}
                    <div className="w-12 h-12 rounded-full bg-amber-100 border border-slate-700 relative overflow-hidden flex items-center justify-center">
                      <div className="absolute top-0 w-full h-5 bg-slate-900 rounded-b-md" />
                      <div className="mt-1 flex gap-1">
                        <span className="w-1 h-1 rounded-full bg-slate-800" />
                        <span className="w-1 h-1 rounded-full bg-slate-800" />
                      </div>
                    </div>
                    {/* Dark Shirt */}
                    <div className="w-16 h-12 bg-slate-800 rounded-t-xl -mt-1" />
                  </div>
                </div>

                {/* Floating Question Mark Bubble */}
                <div className="absolute -top-3 right-2 w-6 h-6 rounded-full bg-white border border-slate-300 shadow-sm flex items-center justify-center text-xs font-bold text-slate-700 animate-pulse">
                  ?
                </div>
              </div>

              {/* Digit 4 */}
              <span className="text-8xl sm:text-9xl font-black text-[#E8A588] tracking-tighter drop-shadow-md">
                4
              </span>
            </div>

            {/* Scattered Leaves */}
            <div className="absolute top-2 left-6 w-3 h-5 bg-[#C99178] rounded-full rotate-45 opacity-60" />
            <div className="absolute bottom-4 right-8 w-4 h-6 bg-[#C99178] rounded-full -rotate-12 opacity-60" />
            <div className="absolute bottom-10 left-12 w-2 h-4 bg-[#C99178] rounded-full rotate-12 opacity-40" />
          </div>

          {/* Action Button: 'Back to home' in coral peach (Screenshot 5) */}
          <div className="pt-2 flex justify-center">
            <Link to="/">
              <Button
                variant="coral"
                className="px-8 py-3 rounded-xl font-semibold text-sm shadow-md cursor-pointer"
              >
                Back to home
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}
