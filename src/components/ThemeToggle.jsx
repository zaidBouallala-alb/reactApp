import React, { useState, useEffect } from 'react';

const BACKGROUNDS = [
    { id: 1, name: 'Geometric' },
    { id: 2, name: 'Fluid Glass' },
    { id: 3, name: 'Minimal Tech' },
    { id: 4, name: 'Nature Clean' },
    { id: 5, name: 'Neon Dark' },
    { id: 0, name: 'Default Gradient' } // Fallback
];

export default function ThemeToggle() {
    // Theme State
    const [isDark, setIsDark] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('theme');
            if (saved) return saved === 'dark';
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        return false;
    });

    // Background State
    const [currentBg, setCurrentBg] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('app_bg');
            return saved ? parseInt(saved) : 1;
        }
        return 1;
    });

    // Apply Theme
    useEffect(() => {
        const root = window.document.documentElement;
        if (isDark) {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]);

    // Apply Background
    useEffect(() => {
        const root = window.document.documentElement;
        // Remove old bg classes
        for (let i = 0; i <= 5; i++) root.classList.remove(`app-bg-${i}`);

        // Add new bg class
        if (currentBg > 0) {
            root.classList.add(`app-bg-${currentBg}`);
            root.style.setProperty('--bg-image', `url('/backgrounds/bg-${currentBg}.png')`);
        } else {
            root.style.removeProperty('--bg-image');
        }

        localStorage.setItem('app_bg', currentBg);
    }, [currentBg]);

    const toggleTheme = () => setIsDark(!isDark);

    const cycleBackground = () => {
        setCurrentBg(prev => (prev >= 5 ? 1 : prev + 1));
    };

    return (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2">

            {/* Background Switcher */}
            <button
                onClick={cycleBackground}
                className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg 
                     hover:bg-white/20 hover:scale-110 active:scale-95 transition-all duration-300 group relative"
                title={`Change Background: ${BACKGROUNDS.find(b => b.id === currentBg)?.name}`}
            >
                <div className="w-6 h-6 flex items-center justify-center">
                    <svg className="w-5 h-5 text-indigo-500 dark:text-indigo-400 group-hover:rotate-180 transition-transform duration-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                </div>
                {/* Tooltip */}
                <div className="absolute top-full right-0 mt-2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    BG: {BACKGROUNDS.find(b => b.id === currentBg)?.name}
                </div>
            </button>

            {/* Theme Toggle */}
            <button
                onClick={toggleTheme}
                className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg 
                     hover:bg-white/20 hover:scale-110 active:scale-95 transition-all duration-300 group relative overflow-hidden"
                aria-label="Toggle Dark Mode"
            >
                <div className="relative w-6 h-6">
                    {/* Sun Icon */}
                    <svg
                        className={`absolute inset-0 w-6 h-6 text-yellow-400 transform transition-all duration-500 ease-spring
                         ${isDark ? 'translate-y-8 rotate-90 opacity-0' : 'translate-y-0 rotate-0 opacity-100'}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>

                    {/* Moon Icon */}
                    <svg
                        className={`absolute inset-0 w-6 h-6 text-indigo-300 transform transition-all duration-500 ease-spring
                         ${isDark ? 'translate-y-0 rotate-0 opacity-100' : '-translate-y-8 -rotate-90 opacity-0'}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                </div>

                {/* Glow */}
                <div className={`absolute inset-0 rounded-full blur-md transition-opacity duration-300 
                          ${isDark ? 'bg-indigo-500/30' : 'bg-yellow-400/30'} opacity-0 group-hover:opacity-100`}></div>
            </button>
        </div>
    );
}
