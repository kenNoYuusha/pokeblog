import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getPokemon, getResource } from "../api/pokemon";

const PokeInfo = () => {
  const { pokemonName } = useParams();
  const [pokemonInfo, setPokemonInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    const getPokemonInfo = async () => {
      try {
        //setLoading(true);
        //getting basic info
        const pokemonData = {};
        const basicInfo = await getPokemon(
          `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
        );
        pokemonData.id = basicInfo.id;
        pokemonData.name = basicInfo.name;
        pokemonData.image =
          basicInfo.sprites.other["official-artwork"].front_default;
        //getting extra info
        const speciesInfo = await getResource(basicInfo.species.url);
        pokemonData.description = speciesInfo.flavor_text_entries.filter(
          (item) => item.language.name === "es"
        )[0];
        pokemonData.varieties = speciesInfo.varieties.map(
          (item) => item.pokemon.name
        );
        //getting evolution chain
        const evolutionChain = await getResource(
          speciesInfo.evolution_chain.url
        );

        const loopChain = (chain) => {
          let obj = {};
          if (!chain.evolves_to.length) {
            obj.name = chain.species.name;
            return obj;
          }
          obj.name = chain.species.name;
          //obj.evolvesTo = loopChain(chain.evolves_to[0]);
          //obj.evolvesTo = chain.evolves_to.map( item => loopChain(item));
          obj.evolvesTo =
            chain.evolves_to.length > 1
              ? chain.evolves_to.map((item) => loopChain(item))
              : loopChain(chain.evolves_to[0]);
          return obj;
        };

        pokemonData.evolutionChain = loopChain(evolutionChain.chain);
        setPokemonInfo(pokemonData);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError(err);
        setLoading(false);
      }
    };
    getPokemonInfo();
  }, [pokemonName]);
  const { id, name, image, description, varieties, evolutionChain } = pokemonInfo;
  console.log(pokemonInfo);

  return (
    <div
      className="fixed top-0 left-0 w-full min-h-screen h-auto bg-slate-700/80
                        flex flex-col items-center "
    >
      {!!error && <p className="text-3xl font-bold text-white">Hubo un error wey!</p>}

      {!error && !!loading && <p className="text-6xl font-bold text-white">Cargandooo......</p>}

      {!error && !loading && (
        <>
          <p className="text-6xl font-bold text-white">
            <span>#{id}</span>
            {name}
          </p>
          <img src={image} alt={name} />
          <p className="text-6xl font-bold text-white">{description.flavor_text}</p>
        </>
      )}
    </div>
  );
};
export { PokeInfo };
