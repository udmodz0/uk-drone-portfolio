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
          950: '#05070A',
          900: '#090D14',
          850: '#0E1522',
          800: '#141E30',
          700: '#1D2A42'
        },
        gold: {
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          glow: '#FDE047'
        },
        cyber: {
          300: '#7DD3FC',
          400: '#38BDF8',
          500: '#0EA5E9',
          600: '#0284C7',
          glow: '#00E5FF'
        },
        neon: {
          green: '#00FF41',
          amber: '#FACC15',
          cyan: '#00E5FF'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif'],
        mono: ['Space Mono', 'monospace']
      },
      backgroundImage: {
        'grid-pattern': "radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.08) 0%, transparent 70%), linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px)",
        'hud-pattern': "linear-gradient(to right, rgba(56, 189, 248, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(56, 189, 248, 0.03) 1px, transparent 1px)",
        'gold-gradient': "linear-gradient(135deg, #FDE047 0%, #F59E0B 50%, #D97706 100%)",
        'cyber-gradient': "linear-gradient(135deg, #00E5FF 0%, #38BDF8 50%, #6366F1 100%)"
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'radar-sweep': 'radarSweep 6s linear infinite',
        'float': 'float 5s ease-in-out infinite',
        'shimmer': 'shimmer 3s infinite linear',
        'scanline': 'scanline 8s linear infinite',
        'glow-pulse': 'glowPulse 2.5s ease-in-out infinite alternate',
        'slow-spin': 'spin 20s linear infinite'
      },
      keyframes: {
        radarSweep: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' }
        },
        glowPulse: {
          '0%': { opacity: '0.4', filter: 'drop-shadow(0 0 8px rgba(245, 158, 11, 0.4))' },
          '100%': { opacity: '0.9', filter: 'drop-shadow(0 0 25px rgba(245, 158, 11, 0.8))' }
        }
      }
    },
  },
  plugins: [],
}
