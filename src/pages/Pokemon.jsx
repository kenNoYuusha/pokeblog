import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { getAllPokemon, getPokemon } from "../api/pokemon";
import { PokemonMainGrid } from "../components/PokemonMainGrid";
import { PokemonCard, PokemonCardSkeleton } from "../components/PokemonCard";
import { PokemonError } from "../components/PokemonError";
export const Pokemon = () => {
  const [state, setState] = useState({
    error: { isError: false },
    loading: true,
    display: true,
    pokemonList: [],
  });
 
  useEffect(() => {
    const getPokemonList = async () => {
      try {
        const pokemonList = [];
        const pokemonNames = await getAllPokemon();

        for (const pokemonObject of pokemonNames.results) {
          const pokemonData = await getPokemon(pokemonObject.name);
          pokemonList.push({
            id: pokemonData.id,
            name: pokemonData.name,
            type: pokemonData.types,
            img: pokemonData.sprites.other["official-artwork"].front_default,
          });
        }

        setState({
          ...state,
          loading: false,
          pokemonList,
        });
      } catch (error) {
        setState({
          ...state,
          error: { isError: true, ...error },
        });
      }
    };
    getPokemonList();
  }, []);

  return (
    <>
      <PokemonMainGrid
        state={state}
        error={(error) => <PokemonError error={error} />}
        skeleton={(id) => <PokemonCardSkeleton key={id} />}
      >
        {(pokemon) => <PokemonCard key={pokemon.id} pokemon={pokemon} />}
      </PokemonMainGrid>

      {!state.loading && <Outlet context={setState}/>}
    </>
  );
};
