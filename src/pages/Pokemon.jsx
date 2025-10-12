import { useRef } from "react";
import { PokemonMainGrid } from "../components/PokemonMainGrid";
import { PokemonCard, PokemonCardSkeleton } from "../components/PokemonCard";
import { PokemonError } from "../components/PokemonError";
import { usePokemonList } from "../hooks/usePokemonList";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

export const Pokemon = () => {
  const { state, loadNextPage } = usePokemonList();
  const triggerRef = useRef(null);

  useIntersectionObserver({
    targetRef: triggerRef,
    onIntersect: loadNextPage,
    enabled: state.hasMore,
  });

  return (
    <>
      <PokemonMainGrid
        state={state}
        error={(error) => <PokemonError error={error} />}
        skeleton={(id) => <PokemonCardSkeleton key={id} />}
      >
        {(pokemon) => <PokemonCard key={pokemon.id} pokemon={pokemon} />}
      </PokemonMainGrid>

      {state.hasMore && (
        <div ref={triggerRef} className="flex justify-center mt-4 py-8">
          {state.loadingNextPage && (
            <p className="text-white">Loading more Pokémon...</p>
          )}
        </div>
      )}
    </>
  );
};
