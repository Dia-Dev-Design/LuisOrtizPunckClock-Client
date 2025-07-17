/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    darkMode: false,
    theme: {
      extend: {
        fontFamily: {
          sans: [
            'Aileron',
            'Inter',
            'system-ui',
            'Avenir',
            'Helvetica',
            'Arial',
            'sans-serif',
          ],
        },
        colors: {
          aquaGreen: '#01402F',
          aqua: '#2A6E6A',
          mint: '#48D994',
          skyBlue: '#77B9F3',
          marshmallow: '#F2F2F2',
          darkGreen: '#070D0D',
        },
      },
    },
    plugins: [],
  }