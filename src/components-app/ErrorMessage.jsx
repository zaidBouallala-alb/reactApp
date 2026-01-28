import React from "react";

/**
 * Premium error message component with glassmorphism and animations
 */
export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[300px] p-8 animate-fade-in">
      <div className="relative group">
        {/* Background Glow */}
        <div className="absolute inset-0 bg-red-500/20 blur-xl rounded-full transform group-hover:scale-110 transition-transform duration-500"></div>

        {/* Icon Container */}
        <div className="relative w-24 h-24 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-glass 
                      flex items-center justify-center border border-red-100 dark:border-red-900/30">
          <span className="text-5xl animate-bounce-slow">⚠️</span>
        </div>
      </div>

      <h2 className="mt-8 text-3xl font-bold text-slate-800 dark:text-slate-100 font-sans">
        Oops!
      </h2>

      <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-md text-center leading-relaxed text-balance">
        {message || "Something went wrong. Please try again."}
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-8 px-8 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold rounded-xl
                     shadow-lg shadow-red-500/30 hover:shadow-red-500/50 hover:scale-105 active:scale-95
                     transition-all duration-300 flex items-center gap-2 group"
        >
          <svg
            className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Try Again
        </button>
      )}
    </div>
  );
}
