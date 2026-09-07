/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#07090E',
          900: '#0B0F17',
          850: '#101724',
          800: '#161F33',
          700: '#222E48'
        },
        gold: {
          400: '#F59E0B',
          500: '#D97706',
          600: '#B45309',
          glow: '#FBBF24'
        },
        skyline: {
          400: '#38BDF8',
          500: '#0EA5E9',
          600: '#0284C7'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif']
      },
      backgroundImage: {
        'grid-pattern': "radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.05) 0%, transparent 80%), linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)",
        'drone-radial': "radial-gradient(circle at 50% 20%, rgba(14, 165, 233, 0.15), rgba(7, 9, 14, 0.95))",
        'gold-gradient': "linear-gradient(135deg, #FBBF24 0%, #D97706 50%, #B45309 100%)",
        'cyber-gradient': "linear-gradient(135deg, #38BDF8 0%, #0EA5E9 50%, #6366F1 100%)"
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'radar-sweep': 'radarSweep 6s linear infinite',
        'float': 'float 5s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite linear'
      },
      keyframes: {
        radarSweep: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        }
      }
    },
  },
  plugins: [],
}
