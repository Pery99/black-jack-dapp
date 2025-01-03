/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary': '#070510',      // Dark background
        'secondary': '#02010F',    // Slightly lighter dark
        'accent-1': '#3BC0F8',     // Bright blue
        'accent-2': '#1881C8',     // Medium blue
        'surface': 'rgba(7, 5, 16, 0.95)',
        'surface-border': 'rgba(59, 192, 248, 0.1)',
        'surface-lighter': 'rgba(2, 1, 15, 0.98)',
        'brand': {
          blue: '#3BC0F8',
          darkBlue: '#1881C8',
          dark: '#070510',
          darker: '#02010F',
        },
        'text': {
          primary: '#FEFCC1',  // Updated from #FEF47E
          secondary: '#3BC0F8',
        },
        'game-action': {
          primary: '#3BC0F8',
          secondary: '#1881C8',
          highlight: '#4CD7FF',
          border: 'rgba(59, 192, 248, 0.5)',
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
        'gradient-radial': 'radial-gradient(circle at top, #1881C8, #070510)',
        'mesh-pattern': 'linear-gradient(to bottom right, rgba(59, 130, 246, 0.1), rgba(16, 185, 129, 0.1))',
        'gradient-game': 'linear-gradient(210deg, #1881C8 0%, #3BC0F8 100%)',
        'gradient-dark': 'linear-gradient(to bottom, #070510, #02010F)',
      },
      boxShadow: {
        'neon': '0 0 20px rgba(59, 192, 248, 0.3)',
        'card': '0 8px 32px rgba(7, 5, 16, 0.4), 0 0 0 1px rgba(59, 192, 248, 0.1)',
        'glow': '0 0 20px rgba(59, 192, 248, 0.15)',
        'game': '0 0 40px rgba(0, 0, 0, 0.5)',
      },
      screens: {
        'xs': '475px',
      },
    },
  },
  plugins: [],
};
