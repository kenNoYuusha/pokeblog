import { useState, useEffect, useRef } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import { MdOutlineArrowForwardIos } from "react-icons/md";
//OTHERS
import { getPokemon, getResource } from "../api/pokemon";
import { parsePokemonChain, singleArrayChain } from "../js/utilities";
//COMPONENTS
import { PokemonCard } from "../components/PokemonCard";
import { PokemonContainerDetails } from "../components/PokemonContainerDetails";
import { PokemonError } from "../components/PokemonError";

export const PokemonDetails = () => {
  //const renderCount = useRef("")
  const setDisplayParent = useOutletContext();
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
        pokemonDetails.type = basicInfo.types;
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
        pokemonDetails.evolutionChainNames = parsePokemonChain(
          evolutionChain.chain
        );

        //getting details of evolutions
        pokemonDetails.evolutionDetails = {};
        const arrayPokemonNames = singleArrayChain(evolutionChain.chain);
        for (const pokemon of arrayPokemonNames) {
          const pokemonDataChain = await getPokemon(pokemon);
          pokemonDetails.evolutionDetails[pokemon] = {
            id: pokemonDataChain.id,
            name: pokemonDataChain.name,
            type: pokemonDataChain.types,
            img: pokemonDataChain.sprites.other["official-artwork"]
              .front_default,
          };
        }

        setPokemonInfo(pokemonDetails);
        setLoading(false);
      } catch (err) {
        setError({ isError: true, ...err });
      }
    };
    getPokemonDetails();
    setDisplayParent((state) => ({ ...state, display: false }));
    return () => setDisplayParent((state) => ({ ...state, display: true }));
  }, [pokemonName])
 
  return (
    <PokemonContainerDetails
      error={error}
      loading={loading}
      pokemonInfo={pokemonInfo}
      pokemonCard={(pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      )}
      pokemonError={(error) => <PokemonError error={error} />}
      arrow={() => <MdOutlineArrowForwardIos />}
    />
  );
};
