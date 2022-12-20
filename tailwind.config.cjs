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
        // bugSimbol: "url('public/images/emblemas/bug.png')",
        // darkSimbol: "url('/public/images/emblemas/dark.png')",
        // dragonSimbol: "url('/public/images/emblemas/dragon.png')",
        // electricSimbol: "url('/public/images/emblemas/electric.png')",
        // fairySimbol: "url('/public/images/emblemas/fairy.png')",
        // fightingSimbol: "url('/public/images/emblemas/fighting.png')",
        // fireSimbol: "url('/public/images/emblemas/fire.png')",
        // flyingSimbol: "url('/public/images/emblemas/flying.png')",
        // ghostSimbol: "url('/public/images/emblemas/ghost.png')",
        // grassSimbol: "url('/public/images/emblemas/grass.png')",
        // groundSimbol: "url('/public/images/emblemas/ground.png')",
        // iceSimbol: "url('/public/images/emblemas/ice.png')",
        // normalSimbol: "url('/public/images/emblemas/normal.png')",
        // poisonSimbol: "url('/public/images/emblemas/poison.png')",
        // psychicSimbol: "url('/public/images/emblemas/psychic.png')",
        // rockSimbol: "url('/public/images/emblemas/rock.png')",
        // steelSimbol: "url('/public/images/emblemas/steel.png')",
        // waterSimbol: "url('/public/images/emblemas/water.png')",
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
