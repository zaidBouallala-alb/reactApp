import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getModules } from "../api/educationService";
import LoadingSpinner from "../components-app/LoadingSpinner";
import ErrorMessage from "../components-app/ErrorMessage";
import ThemeToggle from "../components/ThemeToggle";
import SEO from "../components/SEO";

// 3D Tilt Card Component
const TiltCard = ({ children, onClick, delay, className }) => {
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

        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;

        setRotation({ x: rotateX, y: rotateY });
        setGlare({ x: (x / rect.width) * 100, y: (y / rect.height) * 100, opacity: Math.max(0, 1 - Math.abs(rotateX / 10) - Math.abs(rotateY / 10)) + 0.5 });
    };

    const handleMouseLeave = () => {
        setRotation({ x: 0, y: 0 });
        setGlare(prev => ({ ...prev, opacity: 0 }));
    };

    return (
        <div className={`perspective-1000 animate-slide-up ${className}`} style={{ animationDelay: `${delay}s` }}>
            <button
                ref={cardRef}
                onClick={onClick}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative w-full h-full transition-all duration-200 ease-out preserve-3d group outline-none focus:outline-none"
                style={{ transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` }}
            >
                {children}
                <div
                    className="absolute inset-0 rounded-[28px] pointer-events-none z-20 mix-blend-overlay transition-opacity duration-200"
                    style={{
                        background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 80%)`,
                        opacity: glare.opacity
                    }}
                />
            </button>
        </div>
    );
};

export default function ModulesPage() {
    const navigate = useNavigate();
    const { formationId } = useParams();
    const [modules, setModules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchModules = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await getModules(formationId);
                setModules(data || []);
            } catch (err) {
                setError(err.message || "Failed to load modules");
                setModules([]);
            } finally {
                setLoading(false);
            }
        };
        fetchModules();
    }, [formationId]);

    return (
        <div className="relative min-h-screen w-full overflow-hidden transition-colors duration-500">
            <SEO
                title={`Modules - Formation ${formationId}`}
                description={`Explore modules for formation ${formationId}. Access course details and resources.`}
                keywords={`ofppt, modules, formation ${formationId}, cours, education`}
            />
            <ThemeToggle />

            {/* Dynamic Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[20%] right-[10%] w-[600px] h-[600px] bg-blue-300/20 dark:bg-blue-600/10 rounded-full blur-[80px] animate-float"></div>
                <div className="absolute bottom-[20%] left-[10%] w-[500px] h-[500px] bg-indigo-300/20 dark:bg-indigo-600/10 rounded-full blur-[80px] animate-pulse-slow"></div>
                {/* Hexagon Grid Overlay */}
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.04] dark:opacity-[0.06]"></div>
            </div>

            <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col max-w-6xl">

                {/* Header */}
                <div className="flex flex-col mb-10 w-full animate-slide-up bg-white/40 dark:bg-slate-800/40 backdrop-blur-md p-6 rounded-3xl border border-white/20 dark:border-slate-700/30">
                    <button
                        onClick={() => navigate(-1)}
                        className="self-start mb-6 flex items-center gap-2 px-4 py-2 rounded-xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-md 
                                 border border-white/20 dark:border-slate-700/30 text-slate-600 dark:text-slate-300 font-medium 
                                 hover:bg-white dark:hover:bg-slate-800 hover:shadow-lg transition-all duration-300 group"
                    >
                        <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back
                    </button>

                    <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400 to-indigo-500 rounded-2xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity"></div>
                            <div className="relative w-20 h-20 bg-white dark:bg-slate-800 rounded-2xl shadow-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-10 h-10 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            </div>
                        </div>
                        <div className="text-center md:text-left">
                            <h1 className="text-3xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-indigo-600 dark:from-white dark:to-indigo-300 mb-2">
                                Modules
                            </h1>
                            <p className="text-slate-500 dark:text-slate-400 font-medium">
                                Select a module to access course resources and exams
                            </p>
                        </div>
                    </div>
                </div>

                {/* Grid Content */}
                <div className="flex-1 w-full relative min-h-[400px]">
                    {loading ? (
                        <LoadingSpinner />
                    ) : error ? (
                        <ErrorMessage
                            message={error}
                            onRetry={() => window.location.reload()}
                        />
                    ) : modules.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
                            {modules.map((module, index) => {
                                const gradient = getModuleGradient(index);
                                const letter = ((module.name || module.code)?.[0] || 'M').toUpperCase();

                                return (
                                    <TiltCard key={module.id || index} onClick={() => navigate(`/courses/${module.id}`)} delay={index * 0.05}>
                                        <div className="relative overflow-hidden bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border border-white/60 dark:border-slate-700/60
                                                     rounded-[28px] p-6 shadow-xl h-full flex flex-col items-start gap-5 group hover:border-indigo-500/30 dark:hover:border-indigo-400/30 transition-colors">

                                            {/* Top Row: Icon + Code Badge */}
                                            <div className="w-full flex justify-between items-start">
                                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg bg-gradient-to-br ${gradient} 
                                                                transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 ring-4 ring-white/30 dark:ring-slate-800/30`}>
                                                    {letter}
                                                </div>

                                                {module.code && (
                                                    <span className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 
                                                                    text-xs font-bold text-slate-600 dark:text-slate-300 shadow-sm backdrop-blur-md">
                                                        {module.code}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 w-full">
                                                <h3 className="text-xl font-bold text-slate-800 dark:text-white leading-tight mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-3">
                                                    {module.name || 'Untitled Module'}
                                                </h3>
                                                <div className="h-1 w-12 bg-slate-200 dark:bg-slate-700 rounded-full group-hover:w-20 group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-purple-500 transition-all duration-500"></div>
                                            </div>

                                            {/* Bottom Action */}
                                            <div className="w-full flex items-center justify-between text-sm font-medium text-slate-400 dark:text-slate-500 pt-2">
                                                <span>Tap to open</span>
                                                <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-700/50 flex items-center justify-center group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300 transform group-hover:translate-x-1">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </div>
                                            </div>

                                            {/* Decorative Bg Blob */}
                                            <div className={`absolute -right-12 -top-12 w-40 h-40 rounded-full bg-gradient-to-br ${gradient} opacity-5 group-hover:opacity-10 blur-2xl transition-opacity duration-500 pointer-events-none`}></div>
                                        </div>
                                    </TiltCard>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center mt-20 p-8 bg-white/50 dark:bg-slate-800/50 backdrop-blur-md rounded-3xl border border-dashed border-slate-300 dark:border-slate-600 animate-fade-in">
                            <div className="text-6xl mb-4 grayscale opacity-50">🧩</div>
                            <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">No Modules Found</h3>
                            <p className="text-slate-500 dark:text-slate-400">There are no modules available for this formation.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function getModuleGradient(index) {
    const gradients = [
        'from-emerald-400 to-cyan-500',
        'from-orange-400 to-rose-500',
        'from-blue-400 to-indigo-600',
        'from-violet-400 to-fuchsia-500',
        'from-pink-400 to-red-500',
        'from-teal-400 to-emerald-600'
    ];
    return gradients[index % gradients.length];
}
