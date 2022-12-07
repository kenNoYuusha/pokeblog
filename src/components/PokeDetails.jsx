import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
// import { pokemons } from "../js/arrayPokemon";
const PokeDetails = () => {
  const [pokemon, setPokemon] = useState({});
  const { pokemonName } = useParams();
  //   const {name, type, image} = pokemons.find((pokemon) => pokemon.slug === pokemonName) || {
  //     slug: pokemonName,
  //     type: "",
  //     name: "No disponible",
  //     img: "notFound",
  //   };

  useEffect(() => {
    const getPokemon = async () => {
      const result = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
      );
      const data = await result.json();
      const dataPokemon = {
        id: data.id,
        name: data.name,
        type: data.types[0].type.name,
        image: data.sprites.other["official-artwork"].front_default,
      };
      setPokemon(dataPokemon);
    };
    getPokemon();
    console.log("pokemonnn");
  }, [pokemonName]);

  const navigate = useNavigate();
  const getBack = () => {
    navigate("/pokedex");
  };

  return (
    <div
      className="w-full p-4 h-full flex flex-col items-center gap-4 justify-center
                    bg-slate-300 rounded-xl"
    >
      <h3>
        <span className="text-2xl text-slate-800">{`#${pokemon.id} `}</span>
        {pokemon.name}
      </h3>
      <p>{pokemon.type}</p>
      <figure className="w-[500px] h-[500px]">
        <img
          className="w-full h-full object-contain transition-transform duration-100 ease-in-out hover:scale-110 hover:rotate-3"
          src={pokemon.image}
          alt={name}
        />
      </figure>
      <button
        className="px-4 py-2 text-xl text-slate-50 bg-orange-700 rounded-md shadow-lg 
                         hover:bg-orange-800 
                         active:bg-orange-900"
        onClick={getBack}
      >
        Get back
      </button>
    </div>
  );
};
export { PokeDetails };
