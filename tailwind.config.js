/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          dark: '#0C0C0C',
          card: '#12151B',
          glass: 'rgba(18, 21, 27, 0.7)',
        },
        text: {
          main: '#D7E2EA',
          muted: '#8A99AD',
          headingStart: '#646973',
          headingEnd: '#BBCCD7',
        },
        brand: {
          accent: '#3B82F6',
          purple: '#8B5CF6',
          cyan: '#06B6D4',
        }
      },
      fontFamily: {
        sans: ['Kanit', 'sans-serif'],
        kanit: ['Kanit', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        }
      }
    },
  },
  plugins: [],
}
