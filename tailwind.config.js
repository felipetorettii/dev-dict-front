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
      }
    }
  },
  plugins: [],
}
