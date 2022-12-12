/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns : {
        pokeGrilla : "repeat(auto-fit, minmax(256px, 1fr))",
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'translate(0,0)' },
          '50%': { transform: 'translate(0,5px)' },
        }
      },
      animation: {
        wiggle: 'wiggle .3s ease-out',
      }
    },
  },
  plugins: [],
}
