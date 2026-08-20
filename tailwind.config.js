/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        saffron: {
          50: '#fef7ee',
          100: '#fdf0db',
          200: '#fadcae',
          300: '#f7c07b',
          400: '#f39d4b',
          500: '#E07A5F', // Muted saffron gold
          600: '#c55f44',
          700: '#a34731',
          DEFAULT: '#E07A5F',
        },
        terracotta: {
          50: '#fbf6f5',
          100: '#f8ece9',
          200: '#f1d0c8',
          500: '#A0402C', // Deep rich terracotta clay
          600: '#8b3422',
          700: '#6f2618',
          DEFAULT: '#A0402C',
        },
        sage: {
          50: '#f4f7f5',
          100: '#e4ebe6',
          200: '#cdddcf',
          500: '#2E5A44', // Forest/sage organic green
          600: '#234735',
          700: '#1b3829',
          DEFAULT: '#2E5A44',
        },
        cream: {
          50: '#fffefa',
          100: '#FAF6F0', // Main premium cream background
          200: '#f5eee2',
          300: '#ebdcc5',
          DEFAULT: '#FAF6F0',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
