import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getPokemon, getResource } from "../api/pokemon";

const PokeInfo = () => {
  const { pokemonName } = useParams();
  const [pokemonInfo, setPokemonInfo] = useState({});
  useEffect(() => {
    const getPokemonInfo = async () => {
      //getting basic info
      const pokemonData = {};
      const basicInfo = await getPokemon(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
      );
      pokemonData.id = basicInfo.id;
      pokemonData.image =
        basicInfo.sprites.other["official-artwork"].front_default;
      //getting extra info
      const speciesInfo = await getResource(basicInfo.species.url);
      pokemonData.description = speciesInfo.flavor_text_entries.filter(
        (item) => item.language.name === "en"
      )[0];
      pokemonData.varieties = speciesInfo.varieties.map(
        (item) => item.pokemon.name
      );
      //getting evolution chain
      const evolutionChain = await getResource(speciesInfo.evolution_chain.url);
      //pokemonData.evolutionChain = evolutionChain.chain;
      
      const loopChain = (chain) => {
        
            let obj = {}
            if(!chain.evolves_to.length){
                obj.name = chain.species.name
                return obj;
            }
            obj.name = chain.species.name;
            obj.evolvesTo = loopChain(chain.evolves_to[0]);
            return obj; 
      }
      pokemonData.evolutionChain = loopChain(evolutionChain.chain)


      console.log(pokemonData);

    };
    getPokemonInfo();
  }, [pokemonName]);

  return (
    <div className="fixed top-0 left-0 w-full min-h-screen h-auto bg-slate-700/80">
      <p className="text-6xl font-bold text-white">{pokemonName}</p>
    </div>
  );
};
export { PokeInfo };
