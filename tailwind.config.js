/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx'
  ],
  theme: {
    extend: {
      fontFamily: {
        arial: ['arial', 'sans-serif']
      },
      backgroundSize: {
        '16': '1.25rem'
      },
      colors : {
        'blue-link': '#1a0dab'
      }
    }
  },
  plugins: [],
}
