/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bronze: {
          950: '#0E0C0A',
          900: '#14110F',
          850: '#1C1815',
          800: '#26211C',
          700: '#3D342D',
          600: '#6E5C4F',
          500: '#B48B5E',
          400: '#D4A373',
          300: '#E6C594',
          200: '#F0DBC0',
          100: '#FAF4ED',
        },
        gold: {
          500: '#D97706',
          400: '#F59E0B',
          300: '#FBBF24',
          glow: 'rgba(245, 158, 11, 0.25)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        impact: ['Anton', 'sans-serif'],
        anton: ['Anton', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
