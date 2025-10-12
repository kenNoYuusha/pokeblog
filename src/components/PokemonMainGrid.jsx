export const PokemonMainGrid = ({
  state: { error, loading, pokemonList },
  children,
  skeleton,
  error: pokemonError,
}) => {
  return (
    <div className={`w-full h-auto grid grid-cols-pokeGrilla auto-rows-auto gap-4 px-4 py-8 text-lg`}>
      {error.isError && pokemonError(error)}
      {!error.isError && loading && pokemonList.length === 0 && (
        <PokemonSkeleton amount={30}>{skeleton}</PokemonSkeleton>
      )}
      {!error.isError &&
        pokemonList.map((pokemon) => children(pokemon))}
    </div>
  );
};

const PokemonSkeleton = ({ children, amount }) => {
  const skeleton = [];

  for (let index = 1; index <= amount; index++) {
    skeleton.push(children(index));
  }

  return skeleton;
};
