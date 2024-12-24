/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary': '#0F172A',      // Deep blue-black
        'secondary': '#1E293B',    // Lighter blue-black
        'accent-1': '#F43F5E',     // Soft rose
        'accent-2': '#3B82F6',     // Gentle blue
        'accent-3': '#10B981',     // Mint green
        'surface': 'rgba(0, 0, 0, 0.85)',
        'surface-border': 'rgba(255, 255, 255, 0.1)',
        'text-primary': '#F8FAFC',
        'text-secondary': '#CBD5E1',
        'card-back': '#334155',
        'brand': {
          red: '#FF0032',
          purple: '#8000FF',
          dark: '#000000',
          pink: '#C204D3',
          crimson: '#CC0606',
        },
      },
      fontFamily: {
        'casino': ['casino', 'Sans-serif'],
        'body': ['Plus Jakarta Sans', 'sans-serif'],
      },
      backdropBlur: {
        'xl': '20px',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle at top, var(--tw-gradient-stops))',
        'mesh-pattern': 'linear-gradient(to bottom right, rgba(59, 130, 246, 0.1), rgba(16, 185, 129, 0.1))',
        'gradient-game': 'linear-gradient(210deg, #CC0606 0%, #C204D3 100%)',
        'gradient-dark': 'linear-gradient(to bottom, #000000, #1a0012)',
      },
      boxShadow: {
        'neon': '0 0 20px rgba(59, 130, 246, 0.3)',
        'card': '0 8px 32px rgba(0, 0, 0, 0.2)',
        'glow': '0 0 20px rgba(59, 130, 246, 0.15)',
      },
      screens: {
        'xs': '475px',
      },
    },
  },
  plugins: [],
};
