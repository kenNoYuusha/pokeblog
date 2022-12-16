import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPokemon, getResource } from "../api/pokemon";
import { PokemonCard } from "../components/PokemonCard";

export const PokemonDetails = () => {
  const { pokemonName } = useParams();
  const [error, setError] = useState({ isError: false });
  const [loading, setLoading] = useState(true);
  const [pokemonInfo, setPokemonInfo] = useState({});

  useEffect(() => {
    const getPokemonDetails = async () => {
      try {
        
        //getting basic info
        const pokemonDetails = {};
        const basicInfo = await getPokemon(pokemonName);
        pokemonDetails.id = basicInfo.id;
        pokemonDetails.name = basicInfo.name;
        pokemonDetails.image =
          basicInfo.sprites.other["official-artwork"].front_default;

        //getting extra info
        const speciesInfo = await getResource(basicInfo.species.url);
        pokemonDetails.description = speciesInfo.flavor_text_entries.filter(
          (item) => item.language.name === "es"
        )[0];
        pokemonDetails.varieties = speciesInfo.varieties.map(
          (item) => item.pokemon.name
        );
        
        //getting evolution chain
        const evolutionChain = await getResource(
          speciesInfo.evolution_chain.url
        );
        pokemonDetails.evolutionChainNames = [];
        const getChain = (chain) => {
          if (!chain.evolves_to.length) {
            pokemonDetails.evolutionChainNames.push(chain.species.name);
            return;
          }
          pokemonDetails.evolutionChainNames.push(chain.species.name);
          //en este punto se deberia insertar algun indicador tipo flecha
          //que representa cierto pokemon evoluciona a:
          chain.evolves_to.length > 1
            ? chain.evolves_to.forEach((item) => getChain(item))
            : getChain(chain.evolves_to[0]);
        };
        getChain(evolutionChain.chain);

        //getting details of evolutions
        pokemonDetails.evolutionDetails = [];
        for(const pokemon of pokemonDetails.evolutionChainNames){
          const pokemonDataChain = await getPokemon(pokemon);
          pokemonDetails.evolutionDetails.push({
            id: pokemonDataChain.id,
            name: pokemonDataChain.name,
            type: pokemonDataChain.types,
            img: pokemonDataChain.sprites.other["official-artwork"]
              .front_default,
          })
        }

        setPokemonInfo(pokemonDetails);
        setLoading(false);
      } catch (err) {
        setError({ isError: true, ...err });
      }
    };
    getPokemonDetails();
  }, [pokemonName]);
  const { id, name, image, description, evolutionDetails, varieties} =
    pokemonInfo;
  //console.log(pokemonInfo);
  return (
    <div
      className="absolute top-0 left-0 w-full min-h-screen h-auto bg-slate-700/80 overflow-y-scroll
                 grid grid-rows-6 grid-cols-5 p-20"
    >
      {error.isError && (
        <div className="text-3xl font-bold text-white">
          <p>{error.name}</p>
          <p>{error.message}</p>
        </div>
      )}

      {!error.isError && loading && (
        <p className="text-6xl font-bold text-white">Cargandooo......</p>
      )}

      {!error.isError && !loading && (
        <>
          <h3
            className="col-start-1 col-end-6 row-start-1 row-end-2 grid place-items-center
          text-6xl font-bold text-white"
          >{`#${id} ${name}`}</h3>

          <figure className="col-start-1 col-end-4 row-start-2 row-end-5 grid place-items-center p-10">
            <img
              className="object-contain object-center"
              src={image}
              alt={name}
            />
          </figure>
          <p
            className="col-start-4 col-end-6 row-start-2 row-end-5 grid place-items-center p-10
          text-3xl font-bold text-white"
          >
            {description.flavor_text}
          </p>

          <div className="col-start-1 col-end-6 row-start-5 row-end-7 grid place-items-center gap-4">
            <h4 className="text-white text-xl font-bold">Evolution Chaine</h4>
            <div className="flex flex-row gap-x-8 justify-center items-center">
              {evolutionDetails.map(pokemon => <PokemonCard key={pokemon.id} pokemon={pokemon} />)}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

