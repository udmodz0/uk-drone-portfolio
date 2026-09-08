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
          950: '#FFFFFF',
          900: '#F8FAFC',
          850: '#F1F5F9',
          800: '#E2E8F0',
          700: '#CBD5E1'
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
          glow: '#3B82F6'
        },
        gold: {
          300: '#2563EB',
          400: '#1D4ED8',
          500: '#2563EB',
          600: '#1E40AF',
          glow: '#3B82F6'
        },
        cyber: {
          300: '#0284C7',
          400: '#0369A1',
          500: '#0284C7',
          600: '#075985',
          glow: '#0284C7'
        },
        neon: {
          green: '#10B981',
          amber: '#2563EB',
          cyan: '#0284C7'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif'],
        mono: ['Space Mono', 'monospace']
      },
      backgroundImage: {
        'grid-pattern': "radial-gradient(circle at 50% 50%, rgba(37, 99, 235, 0.06) 0%, transparent 70%), linear-gradient(to right, rgba(0, 0, 0, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.03) 1px, transparent 1px)",
        'hud-pattern': "linear-gradient(to right, rgba(37, 99, 235, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(37, 99, 235, 0.03) 1px, transparent 1px)",
        'gold-gradient': "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
        'blue-gradient': "linear-gradient(135deg, #3B82F6 0%, #2563EB 50%, #1D4ED8 100%)",
        'white-blue-gradient': "linear-gradient(135deg, #2563EB 0%, #1D4ED8 50%, #1E40AF 100%)",
        'cyber-gradient': "linear-gradient(135deg, #0284C7 0%, #2563EB 100%)"
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
          '0%': { opacity: '0.4', filter: 'drop-shadow(0 0 8px rgba(37, 99, 235, 0.3))' },
          '100%': { opacity: '0.9', filter: 'drop-shadow(0 0 25px rgba(37, 99, 235, 0.5))' }
        }
      }
    },
  },
  plugins: [],
}


