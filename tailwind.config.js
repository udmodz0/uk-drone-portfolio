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
          950: '#05080E',
          900: '#090E1A',
          850: '#0E172A',
          800: '#162038',
          700: '#1E2B4A'
        },
        brand: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
          glow: '#00F0FF'
        },
        gold: {
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          glow: '#00F0FF'
        },
        cyber: {
          300: '#7DD3FC',
          400: '#38BDF8',
          500: '#0EA5E9',
          600: '#0284C7',
          glow: '#00E5FF'
        },
        neon: {
          green: '#10B981',
          amber: '#3B82F6',
          cyan: '#00E5FF'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif'],
        mono: ['Space Mono', 'monospace']
      },
      backgroundImage: {
        'grid-pattern': "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.12) 0%, transparent 70%), linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)",
        'hud-pattern': "linear-gradient(to right, rgba(59, 130, 246, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(59, 130, 246, 0.04) 1px, transparent 1px)",
        'gold-gradient': "linear-gradient(135deg, #60A5FA 0%, #2563EB 50%, #1D4ED8 100%)",
        'blue-gradient': "linear-gradient(135deg, #60A5FA 0%, #2563EB 50%, #1D4ED8 100%)",
        'white-blue-gradient': "linear-gradient(135deg, #FFFFFF 0%, #93C5FD 50%, #3B82F6 100%)",
        'cyber-gradient': "linear-gradient(135deg, #00F0FF 0%, #38BDF8 50%, #6366F1 100%)"
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
          '0%': { opacity: '0.4', filter: 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.4))' },
          '100%': { opacity: '0.9', filter: 'drop-shadow(0 0 25px rgba(59, 130, 246, 0.8))' }
        }
      }
    },
  },
  plugins: [],
}

