/**
 * Centralized Theme Configuration
 * Contains all design tokens: colors, gradients, fonts, spacing, animations
 */

export const theme = {
    // Color Palette
    colors: {
        primary: '#131CC3',
        secondary: '#FFF200',
        white: '#FFFFFF',
        black: '#000000',
        gray: {
            light: '#D9D9D9',
            medium: '#737373',
        },
    },

    // Gradient Definitions
    gradients: {
        // Page backgrounds
        backgrounds: {
            welcomePage: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 100%), #FFF200',
            levelsPage: 'linear-gradient(168.09deg, #131CC3 0%, #FFFFFF 98.77%)',
            formationsPage: 'linear-gradient(192.02deg, #131CC3 0%, #FFF200 100%)',
            modulesPage: 'linear-gradient(168.09deg, #131CC3 0%, #FFFFFF 98.77%)',
            coursesPage: 'linear-gradient(192.02deg, #131CC3 0%, #FFF200 100%)',
            resourcesPage: 'linear-gradient(168.09deg, #131CC3 0%, #FFFFFF 98.77%)',
        },

        // Button gradients
        buttons: {
            primary: 'linear-gradient(90deg, #FFFFFF 0%, #FFF200 100%)',
            yearButtons: [
                'radial-gradient(50% 50% at 50% 50%, #D9D9D9 0%, #737373 100%)',
                'radial-gradient(50% 50% at 42.47% 50%, #D9D9D9 0%, #737373 100%)',
                'radial-gradient(50% 50% at 50% 50%, #D9D9D9 0%, #737373 100%)',
                'radial-gradient(50% 50% at 50% 50%, #D9D9D9 0%, #737373 100%)',
                'radial-gradient(50% 50% at 42.47% 50%, #D9D9D9 0%, #737373 100%)',
                'radial-gradient(50% 50% at 50% 50%, #D9D9D9 0%, #737373 100%)',
            ],
            formationButtons: [
                'linear-gradient(90deg, #330375 49.52%, #D9D9D9 100%)',
                'linear-gradient(90deg, #12650C 60.1%, #D9D9D9 100%)',
                'linear-gradient(90deg, #1D0C65 70%, #D9D9D9 100%)',
                'linear-gradient(90deg, #650C0C 80%, #D9D9D9 100%)',
            ],
        },
    },

    // Typography
    fonts: {
        primary: "'Itim', cursive",
        secondary: "'Aclonica', sans-serif",
        sizes: {
            xs: '16px',
            sm: '18px',
            md: '24px',
            lg: '32px',
            xl: '48px',
            xxl: '51px',
        },
        lineHeights: {
            xs: '20px',
            sm: '22px',
            md: '30px',
            lg: '38px',
            xl: '58px',
        },
    },

    // Spacing
    spacing: {
        xs: '10px',
        sm: '15px',
        md: '20px',
        lg: '30px',
        xl: '48px',
    },

    // Border Radius
    borderRadius: {
        sm: '10px',
        md: '13px',
        lg: '18px',
        xl: '20px',
        full: '50%',
    },

    // Animations
    animations: {
        duration: '0.3s',
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        transitions: {
            default: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        },
    },

    // Layout
    layout: {
        maxWidth: '430px',
        minHeight: '100vh',
    },

    // Shadows
    shadows: {
        sm: '0 2px 8px rgba(0, 0, 0, 0.08)',
        md: '0 4px 16px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.08)',
        lg: '0 10px 25px rgba(0, 0, 0, 0.15), 0 4px 10px rgba(0, 0, 0, 0.1)',
        xl: '0 10px 30px rgba(0, 0, 0, 0.18), 0 4px 12px rgba(0, 0, 0, 0.12)',
    },
};

export default theme;
