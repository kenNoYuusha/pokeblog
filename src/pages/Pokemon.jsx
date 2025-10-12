import { Outlet } from "react-router-dom";
import { PokemonMainGrid } from "../components/PokemonMainGrid";
import { PokemonCard, PokemonCardSkeleton } from "../components/PokemonCard";
import { PokemonError } from "../components/PokemonError";
import { usePokemonList } from "../hooks/usePokemonList";
export const Pokemon = () => {

  const { state } = usePokemonList();

  return (
    <>
      <PokemonMainGrid
        state={state}
        error={(error) => <PokemonError error={error} />}
        skeleton={(id) => <PokemonCardSkeleton key={id} />}
      >
        {(pokemon) => <PokemonCard key={pokemon.id} pokemon={pokemon} />}
      </PokemonMainGrid>

      {/* {!state.loading && <Outlet context={setState}/>} */}
    </>
  );
};
