/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        studio: {
          950: '#07080A',
          900: '#0B0D11',
          850: '#12151B',
          800: '#181C24',
          700: '#232833',
          600: '#323947',
          500: '#4B5565',
          400: '#717D91',
          300: '#9DA8B9',
          200: '#C8CFDB',
          100: '#E7EAF0',
          50: '#F5F7FA',
        },
        warm: {
          900: '#141312',
          800: '#21201D',
          700: '#363430',
          100: '#EDEBE6',
          50: '#FAF9F6',
        },
        aviation: {
          900: '#0F1E2E',
          800: '#172C42',
          700: '#1E3A56',
          600: '#2C4A6F',
          500: '#3B5E8A',
          400: '#5C7FA8',
          100: '#E4ECF5',
          50: '#F2F6FA',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        display: ['Manrope', 'Plus Jakarta Sans', 'sans-serif'],
        mono: ['Space Mono', 'monospace']
      },
      backgroundImage: {
        'cinematic-gradient': 'linear-gradient(to bottom, rgba(11, 13, 17, 0.4) 0%, rgba(11, 13, 17, 0.95) 100%)',
        'subtle-card': 'linear-gradient(180deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}


