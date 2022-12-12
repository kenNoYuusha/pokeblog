import { useState, useEffect } from "react";
import { getAllPokemon, getPokemon } from "../api/pokemon";
const Pokemon = () => {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    const fetchAllPokemon = async () => {
      try {
        const list = [];
        const pokemonNames = await getAllPokemon();

        for (const pokemonObject of pokemonNames.results) {
          const detailsPokemon = await getPokemon(pokemonObject.url);
          const dataPokemon = {
            id: detailsPokemon.id,
            name: detailsPokemon.name,
            type: detailsPokemon.types,
            img: detailsPokemon.sprites.other["official-artwork"].front_default,
          };
          list.push(dataPokemon);
          console.log(dataPokemon);
        }

        //console.log(list);
        setPokemonList(list);
      } catch (error) {
        console.log("error atrapadooo", error);
        console.log(error.message);
      }

      // getPokemon
    };
    fetchAllPokemon();
  }, []);

  return (
    <div className="w-full h-auto grid grid-cols-pokeGrilla auto-rows-auto gap-4 p-4">
      {pokemonList.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
};
export { Pokemon };

const PokemonCard = ({ pokemon: { img, id, name, type } }) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <figure className="bg-slate-50 p-4 rounded-lg shadow-md will-change-transform
                           hover:animate-wiggle hover:cursor-pointer">
        <img className="object-contain object-center" src={img} alt={name} />
        <figcaption className="font-bold text-lg text-slate-900">{`#${id}`}</figcaption>
      </figure>
      <div className="self-start">
        <h3 className="text-xl font-bold capitalize">{name}</h3>
        <div className="flex gap-1 mt-2">
          {type.map((item) => (
            <p className="px-3 py-[1px] bg-sky-700 font-bold text-white capitalize rounded-full shadow-sm">{item.type.name}</p>
          ))}
        </div>
      </div>
    </div>
  );
};
