import { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { getAllPokemon, getPokemon } from "../api/pokemon";
const Pokemon = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);

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
          //console.log(dataPokemon);
        }

        //console.log(list);
        setPokemonList(list);
        setLoading(false);
        console.log("si cargo las imagenes wey");
      } catch (error) {
        console.log("error atrapadooo", error);
        console.log(error.message);
      }

      // getPokemon
    };
    fetchAllPokemon();
  }, []);

  return (
    <>
      <div className="w-full h-auto grid grid-cols-pokeGrilla auto-rows-auto gap-4 p-4">
        {!loading &&
          pokemonList.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        {!!loading && <PokemonSkeleton />}
      </div>
      <Outlet />
    </>
  );
};
export { Pokemon };

const PokemonCard = ({ pokemon: { img, id, name, type } }) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <Link to={`/pokemon/${name}`}>
        <figure
          className="bg-slate-50 p-4 rounded-lg shadow-md will-change-transform
                     hover:animate-wiggle hover:cursor-pointer
                     dark:bg-slate-900"
        >
          <img className="object-contain object-center" src={img} alt={name} />
          <figcaption className="font-bold text-lg text-slate-900 dark:text-slate-50">{`#${id}`}</figcaption>
        </figure>
      </Link>
      <div className="self-start">
        <h3 className="text-xl font-bold text-slate-900 capitalize dark:text-slate-50">
          {name}
        </h3>
        <div className="flex gap-1 mt-2">
          {type.map((item) => (
            <PokemonTagType key={item.type.name} type={item.type.name} />
          ))}
        </div>
      </div>
    </div>
  );
};
const PokemonSkeleton = () => {
  return (
    <>
      <SkeletonPokemonCard />
      <SkeletonPokemonCard />
      <SkeletonPokemonCard />
      <SkeletonPokemonCard />
      <SkeletonPokemonCard />
      <SkeletonPokemonCard />
      <SkeletonPokemonCard />
      <SkeletonPokemonCard />
      <SkeletonPokemonCard />
      <SkeletonPokemonCard />
      <SkeletonPokemonCard />
      <SkeletonPokemonCard />
      <SkeletonPokemonCard />
      <SkeletonPokemonCard />
      <SkeletonPokemonCard />
      <SkeletonPokemonCard />
      <SkeletonPokemonCard />
      <SkeletonPokemonCard />
      <SkeletonPokemonCard />
      <SkeletonPokemonCard />
      <SkeletonPokemonCard />
      <SkeletonPokemonCard />
      <SkeletonPokemonCard />
      <SkeletonPokemonCard />
      <SkeletonPokemonCard />
      <SkeletonPokemonCard />
      <SkeletonPokemonCard />
      <SkeletonPokemonCard />
      <SkeletonPokemonCard />
      <SkeletonPokemonCard />
      <SkeletonPokemonCard />
      <SkeletonPokemonCard />
      <SkeletonPokemonCard />
      <SkeletonPokemonCard />
      <SkeletonPokemonCard />
      <SkeletonPokemonCard />
      <SkeletonPokemonCard />
      <SkeletonPokemonCard />
      <SkeletonPokemonCard />
      <SkeletonPokemonCard />
      <SkeletonPokemonCard />
      <SkeletonPokemonCard />
      <SkeletonPokemonCard />
      <SkeletonPokemonCard />
      <SkeletonPokemonCard />
      <SkeletonPokemonCard />
      <SkeletonPokemonCard />
      <SkeletonPokemonCard />
      <SkeletonPokemonCard />
      <SkeletonPokemonCard />
    </>
  );
};
const SkeletonPokemonCard = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      {/* Image */}
      <div className="w-full h-auto bg-zinc-500 p-4 animate-pulse">
        <div className="w-full aspect-square"></div>
        <p className="text-lg text-transparent">1</p>
      </div>
      {/* Description */}
      <div className="self-start">
        <h3 className="w-32 text-xl text-transparent bg-zinc-500 animate-pulse">
          A
        </h3>

        <div className="flex gap-1 mt-2">
          <p className="px-10 py-[1px] text-transparent bg-zinc-500 animate-pulse">
            B
          </p>
          <p className="px-10 py-[1px] text-transparent bg-zinc-500 animate-pulse">
            C
          </p>
        </div>
      </div>
    </div>
  );
};

const PokemonTagType = ({ type }) => {
  switch (type) {
    case "grass":
      return (
        <p
          className="px-3 py-[1px] bg-grass font-bold 
                   text-black capitalize rounded-full shadow-sm"
        >
          {type}
        </p>
      );
    case "poison":
      return (
        <p
          className="px-3 py-[1px] bg-poison font-bold 
                   text-white capitalize rounded-full shadow-sm"
        >
          {type}
        </p>
      );
    case "fire":
      return (
        <p
          className="px-3 py-[1px] bg-fire font-bold 
                   text-white capitalize rounded-full shadow-sm"
        >
          {type}
        </p>
      );
    case "flying":
      return (
        <p
          className="px-3 py-[1px] bg-flying font-bold 
                   text-black capitalize rounded-full shadow-sm"
        >
          {type}
        </p>
      );
    case "water":
      return (
        <p
          className="px-3 py-[1px] bg-water font-bold 
                   text-white capitalize rounded-full shadow-sm"
        >
          {type}
        </p>
      );
    case "bug":
      return (
        <p
          className="px-3 py-[1px] bg-bug font-bold 
                   text-white capitalize rounded-full shadow-sm"
        >
          {type}
        </p>
      );
    case "normal":
      return (
        <p
          className="px-3 py-[1px] bg-normal font-bold 
                   text-black capitalize rounded-full shadow-sm"
        >
          {type}
        </p>
      );
    case "electric":
      return (
        <p
          className="px-3 py-[1px] bg-electric font-bold 
                   text-black capitalize rounded-full shadow-sm"
        >
          {type}
        </p>
      );
    case "ground":
      return (
        <p
          className="px-3 py-[1px] bg-ground font-bold 
                   text-black capitalize rounded-full shadow-sm"
        >
          {type}
        </p>
      );
    case "fairy":
      return (
        <p
          className="px-3 py-[1px] bg-fairy font-bold 
                   text-black capitalize rounded-full shadow-sm"
        >
          {type}
        </p>
      );
    case "fighting":
      return (
        <p
          className="px-3 py-[1px] bg-fighting font-bold 
                   text-white capitalize rounded-full shadow-sm"
        >
          {type}
        </p>
      );
    case "psychic":
      return (
        <p
          className="px-3 py-[1px] bg-psychic font-bold 
                   text-white capitalize rounded-full shadow-sm"
        >
          {type}
        </p>
      );
    case "rock":
      return (
        <p
          className="px-3 py-[1px] bg-rock font-bold 
                   text-white capitalize rounded-full shadow-sm"
        >
          {type}
        </p>
      );
    case "steel":
      return (
        <p
          className="px-3 py-[1px] bg-steel font-bold 
                   text-black capitalize rounded-full shadow-sm"
        >
          {type}
        </p>
      );
    case "ice":
      return (
        <p
          className="px-3 py-[1px] bg-ice font-bold 
                   text-black capitalize rounded-full shadow-sm"
        >
          {type}
        </p>
      );
    case "ghost":
      return (
        <p
          className="px-3 py-[1px] bg-ghost font-bold 
                   text-white capitalize rounded-full shadow-sm"
        >
          {type}
        </p>
      );
    case "dragon":
      return (
        <p
          className="px-3 py-[1px] bg-dragon font-bold 
                   text-white capitalize rounded-full shadow-sm"
        >
          {type}
        </p>
      );
    case "dark":
      return (
        <p
          className="px-3 py-[1px] bg-dark font-bold 
                   text-white capitalize rounded-full shadow-sm"
        >
          {type}
        </p>
      );
    default:
      return (
        <p
          className="px-3 py-[1px] bg-sky-700 font-bold 
                   text-white capitalize rounded-full shadow-sm"
        >
          {type}
        </p>
      );
  }
};
