import React from "react";

/**
 * Premium animated loading spinner using SVG and CSS animations
 */
export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] w-full gap-6 animate-fade-in">
      <div className="relative w-20 h-20">
        {/* Outer Ring */}
        <div className="absolute inset-0 rounded-full border-4 border-primary-100 dark:border-slate-700 opacity-30"></div>

        {/* Spinning Gradient Ring */}
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary-600 border-r-accent-500 
                      animate-spin duration-1000 ease-linear shadow-[0_0_15px_rgba(99,102,241,0.5)]"></div>

        {/* Inner Pulse Circle */}
        <div className="absolute inset-4 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 opacity-20 
                      animate-pulse-slow"></div>

        {/* Center Dot */}
        <div className="absolute inset-[30px] rounded-full bg-white dark:bg-slate-800 shadow-sm z-10 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-primary-500 animate-bounce"></div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-1">
        <span className="text-xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-accent-600 animate-pulse">
          Loading
        </span>
        <span className="text-xs text-slate-400 dark:text-slate-500">Please wait...</span>
      </div>
    </div>
  );
}
