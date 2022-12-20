/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        pokeGrilla: "repeat(auto-fit, minmax(256px, 1fr))",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "translate(0,0)" },
          "50%": { transform: "translate(0,5px)" },
        },
      },
      animation: {
        wiggle: "wiggle .3s ease-out",
      },
      backgroundImage: {
        flying:
          "linear-gradient(180deg, rgba(61,199,239,1) 50%, rgba(189,185,184,1) 51%)",
        ground:
          "linear-gradient(180deg, rgba(247,222,63,1) 50%, rgba(171,152,66,1) 51%)",
        dragon:
          "linear-gradient(180deg, rgba(83,164,207,1) 50%, rgba(241,110,87,1) 51%)",
      },
      colors: {
        grass: "#9bcc50",
        poison: "#b97fc9",
        fire: "#fd7d24",
        water: "#4592c4",
        bug: "#729f3f",
        normal: "#a4acaf",
        electric: "#eed535",
        fairy: "#fdb9e9",
        fighting: "#d56723",
        psychic: "#f366b9",
        rock: "#a38c21",
        steel: "#9eb7b8",
        ice: "#51c4e7",
        ghost: "#7b62a3",
        dark: "#707070",
      },
    },
  },
  plugins: [],
};
