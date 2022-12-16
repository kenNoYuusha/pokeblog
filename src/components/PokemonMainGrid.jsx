export const PokemonMainGrid = ({
  state: { error, loading, pokemonList },
  children,
  skeleton,
  error: pokemonError,
}) => {
  return (
    <div className="w-full h-auto grid grid-cols-pokeGrilla auto-rows-auto gap-4 p-4">
      {error.isError && pokemonError(error)}
      {!error.isError && loading && (
        <PokemonSkeleton amount={151}>{skeleton}</PokemonSkeleton>
      )}
      {!error.isError &&
        !loading &&
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
