import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";

// 3D Tilt Container for Hero Image
const HeroTilt = ({ children }) => {
  const cardRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Subtle rotation
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="perspective-1000 transform-style-3d transition-transform duration-200 ease-out"
      style={{
        transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
      }}
    >
      {children}
    </div>
  );
};

export default function EducateWelcomePage() {
  const navigate = useNavigate();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Parallax Effect
  useEffect(() => {
    const handleWindowMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 20,
        y: (e.clientY / window.innerHeight) * 20,
      });
    };
    window.addEventListener('mousemove', handleWindowMouseMove);
    return () => window.removeEventListener('mousemove', handleWindowMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden transition-colors duration-500">
      <ThemeToggle />

      {/* Dynamic Parallax Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-[10%] -right-[10%] w-[800px] h-[800px] bg-gradient-to-br from-indigo-400/20 to-purple-500/20 dark:from-indigo-600/10 dark:to-purple-900/10 rounded-full blur-[100px] transition-transform duration-100 ease-out"
          style={{ transform: `translate(${-mousePos.x}px, ${mousePos.y}px)` }}
        ></div>
        <div
          className="absolute -bottom-[10%] -left-[10%] w-[600px] h-[600px] bg-gradient-to-tr from-cyan-400/20 to-blue-500/20 dark:from-cyan-600/10 dark:to-blue-900/10 rounded-full blur-[80px] transition-transform duration-100 ease-out"
          style={{ transform: `translate(${mousePos.x}px, ${-mousePos.y}px)` }}
        ></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 min-h-screen flex flex-col items-center justify-center max-w-4xl">

        {/* Hero Section */}
        <HeroTilt>
          <div className="relative flex flex-col items-center justify-center mb-16">

            {/* Logo Layer */}
            <div className="relative z-20 mb-8 transform translate-z-20 transition-transform duration-300 group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-3xl opacity-20 group-hover:opacity-40 animate-pulse-slow"></div>
              <img
                src="/logo.png"
                alt="OFPPT Logo"
                className="w-40 h-40 md:w-56 md:h-56 object-contain relative drop-shadow-2xl"
              />
            </div>

            {/* Illustration Layer (Floating behind/around) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-[120%] h-[120%] pointer-events-none">
              <img
                src="/student.png"
                alt="Background Decoration"
                className="w-full h-full object-contain opacity-10 dark:opacity-5 animate-float blur-sm scale-150"
              />
            </div>

            {/* Text Layer */}
            <div className="text-center transform translate-z-10 relative z-30">
              <h1 className="text-5xl md:text-7xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 dark:from-white dark:via-indigo-200 dark:to-white mb-4 drop-shadow-sm">
                Course <br /> Explorer
              </h1>
              <p className="text-lg md:text-2xl font-medium text-slate-600 dark:text-slate-400 max-w-lg mx-auto leading-relaxed">
                Your gateway to academic excellence and <span className="text-indigo-600 dark:text-indigo-400 font-bold">future success</span>.
              </p>
            </div>

          </div>
        </HeroTilt>

        {/* Smart Button */}
        <div className="w-full max-w-xs animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <button
            onClick={() => navigate("/levels")}
            className="group relative w-full h-16 md:h-20 bg-slate-900 dark:bg-white rounded-[2rem] shadow-2xl shadow-indigo-500/30 
                       hover:shadow-indigo-500/50 hover:scale-105 active:scale-95 transition-all duration-300 ease-spring overflow-hidden"
          >
            {/* Sliding Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>

            {/* Button Content */}
            <div className="absolute inset-0 flex items-center justify-between px-2 pl-8">
              <span className="text-xl md:text-2xl font-bold text-white dark:text-slate-900 group-hover:text-white transition-colors z-10">
                Let's Start
              </span>

              <div className="w-12 h-12 md:w-16 md:h-16 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center shadow-lg transform group-hover:rotate-90 transition-transform duration-500 z-10">
                <svg className="w-6 h-6 md:w-8 md:h-8 text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
          </button>

          <div className="mt-8 flex justify-center gap-2 opacity-50 animate-pulse-slow">
            <div className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-500"></div>
            <div className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-500"></div>
            <div className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-500"></div>
          </div>
        </div>

      </div>
    </div>
  );
}
