/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'heebo': ['Heebo', 'sans-serif'],
      },
      colors: {
        'warm': {
          50: '#faf8f5',
          100: '#f5f0e8',
          200: '#e8dcc8',
          300: '#d4c4a8',
          400: '#bea780',
          500: '#a88f64',
          600: '#8b7350',
          700: '#6d5a42',
          800: '#5a4a38',
          900: '#4a3e30',
        }
      }
    },
  },
  plugins: [],
}
