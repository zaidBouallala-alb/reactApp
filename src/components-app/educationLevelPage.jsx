import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useYears } from "../hooks/useYears";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";
import ThemeToggle from "../components/ThemeToggle";

// 3D Tilt Card Component
const TiltCard = ({ children, onClick, delay }) => {
  const cardRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation (max 15 degrees)
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setRotation({ x: rotateX, y: rotateY });
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 1
    });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setGlare(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      className="perspective-1000 w-full animate-slide-up"
      style={{ animationDelay: `${delay}s` }}
    >
      <button
        ref={cardRef}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full transition-all duration-200 ease-out preserve-3d group"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(1, 1, 1)`,
        }}
      >
        {children}

        {/* Glare Effect */}
        <div
          className="absolute inset-0 rounded-[24px] pointer-events-none z-20 mix-blend-overlay transition-opacity duration-200"
          style={{
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 80%)`,
            opacity: glare.opacity
          }}
        />
      </button>
    </div>
  );
};

export default function EducationLevelPage() {
  const navigate = useNavigate();
  const { years, loading, error } = useYears();

  // Smart metadata for years (now including 3rd year)
  const getYearMetadata = (yearName, index) => {
    const name = (yearName || "").toLowerCase();

    if (name.includes("1") || name.includes("premier")) {
      return {
        icon: (
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        ), // Lightning
        subtitle: "Start your journey",
        gradient: "from-cyan-400 to-blue-600",
        shadow: "shadow-blue-500/30"
      };
    } else if (name.includes("2") || name.includes("deux")) {
      return {
        icon: (
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        ), // Briefcase
        subtitle: "Professional Focus",
        gradient: "from-violet-400 to-fuchsia-600",
        shadow: "shadow-fuchsia-500/30"
      };
    } else if (name.includes("3") || name.includes("trois") || name.includes("licence")) {
      return {
        icon: (
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        ), // Shield/Badge for Mastery
        subtitle: "Mastery & Expert",
        gradient: "from-amber-400 to-orange-600",
        shadow: "shadow-orange-500/30"
      };
    }

    // Default fallback
    return {
      icon: <span className="text-xl font-bold text-white">{index + 1}</span>,
      subtitle: "Academic Year",
      gradient: "from-slate-400 to-slate-600",
      shadow: "shadow-slate-500/30"
    };
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden transition-colors duration-500">
      <ThemeToggle />

      {/* 3D Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-[100px] animate-pulse-slow"></div>
        <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-purple-400/20 dark:bg-purple-600/10 rounded-full blur-[100px] animate-float" style={{ animationDelay: '-2s' }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col max-w-lg md:max-w-4xl">

        {/* Header */}
        <div className="flex flex-col items-center mb-16 animate-slide-up">
          <div className="relative w-28 h-28 mb-6 group cursor-pointer perspective-1000">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-3xl rotate-6 opacity-30 group-hover:rotate-12 transition-transform duration-500"></div>
            <div className="absolute inset-0 bg-gradient-to-bl from-cyan-400 to-pink-400 rounded-3xl -rotate-6 opacity-30 group-hover:-rotate-12 transition-transform duration-500"></div>
            <div className="relative w-full h-full bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-4 transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-y-12">
              <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-indigo-800 to-slate-900 dark:from-white dark:via-indigo-200 dark:to-white mb-2 drop-shadow-sm">
            Select Level
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-center text-lg font-medium">
            Choose your path to excellence
          </p>
        </div>

        {/* 3D Cards Container */}
        <div className="flex-1 w-full max-w-md mx-auto relative flex flex-col gap-6">
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <ErrorMessage message={error} onRetry={() => window.location.reload()} />
          ) : (
            years.map((year, index) => {
              const meta = getYearMetadata(year.name, index);
              return (
                <TiltCard key={year.id} onClick={() => navigate(`/formations/${year.id}`)} delay={index * 0.15}>
                  <div className={`relative h-32 md:h-36 rounded-[24px] bg-white dark:bg-slate-800/80 backdrop-blur-xl border border-white/60 dark:border-slate-700/60
                                  shadow-2xl ${meta.shadow} flex items-center p-6 gap-6 overflow-hidden`}>

                    {/* Dynamic Background Gradient Blob */}
                    <div className={`absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br ${meta.gradient} opacity-10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500`}></div>

                    {/* Icon Container with 3D Pop */}
                    <div className={`relative w-20 h-20 flex-shrink-0 rounded-[20px] bg-gradient-to-br ${meta.gradient} 
                                   flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 z-10`}>
                      {meta.icon}
                      <div className="absolute inset-0 bg-white/20 rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>

                    {/* Text Content */}
                    <div className="flex-1 z-10 transform ml-2 group-hover:translate-x-2 transition-transform duration-300">
                      <span className="inline-block px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-300 mb-2">
                        {meta.subtitle}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white leading-none">
                        {year.name}
                      </h3>
                    </div>

                    {/* Action Arrow */}
                    <div className="w-10 h-10 rounded-full border-2 border-slate-100 dark:border-slate-700 flex items-center justify-center
                                   group-hover:bg-primary-600 group-hover:border-primary-600 group-hover:text-white
                                   text-slate-300 dark:text-slate-600 transition-all duration-300 transform group-hover:translate-x-1">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </TiltCard>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
