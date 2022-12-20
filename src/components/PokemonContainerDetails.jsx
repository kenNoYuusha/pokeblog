export const PokemonContainerDetails = ({
  error,
  loading,
  pokemonInfo,
  pokemonCard,
  pokemonError,
  arrow,
}) => {
  const {
    id,
    name,
    image,
    description,
    evolutionChainNames,
    evolutionDetails,
    varieties,
  } = pokemonInfo;
  // console.log(evolutionChainNames, evolutionDetails);
  return (
    <div
      className="w-full max-w-5xl min-h-screen h-auto flex flex-col items-center gap-y-10 p-10 bg-slate-50 text-slate-900
                       dark:bg-slate-900 dark:text-slate-50"
    >
      {!loading && (
        <>
          <div className="flex gap-x-4 text-3xl">
            <h2 className="capitalize">{name}</h2>
            <p className="-order-1 text-slate-700 dark:text-slate-400">#{id}</p>
          </div>

          <div className="w-5/6 flex items-center justify-center gap-x-4">
            <figure className="basis-96 grow p-8 bg-slate-700  border-2 border-slate-200 rounded-full">
              <img
                className="w-full h-full"
                src={image}
                alt={`${name} image description`}
              />
            </figure>
            <p className="basis-96 text-xl p-4 leading-10 ">
              {description.flavor_text}
            </p>
          </div>

          <div>
            <h2 className="text-3xl text-center mb-4">Evolutions</h2>
            <div className="flex justify-center  items-center p-10 bg-slate-600 rounded-xl">
              <EvolutionChain
                evolutionChainNames={evolutionChainNames}
                evolutionDetails={evolutionDetails}
                arrow={arrow}
              >
                {pokemonCard}
              </EvolutionChain>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const PokemonSingle = ({ children }) => {
  return (
    <div className="basis-40 grow text-lg">{children}</div>
  );
};
const PokemonGroup = ({ children }) => {
  return <div className="basis-40 grow-[8] grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] auto-rows-auto gap-4">{children}</div>;
};
const ContainerArrow = ({ children }) => {
  return (
    <div className="basis-20 grid place-items-center text-4xl">{children}</div>
  );
};

const EvolutionChain = ({
  evolutionChainNames,
  evolutionDetails,
  children,
  arrow,
}) => {
  const saveChain = [];

  let index = 0;
  for (const item of evolutionChainNames) {
    index += 1;
    if (Array.isArray(item)) {
      saveChain.push(
        <PokemonGroup>
          {item.map((pokemon) => children(evolutionDetails[pokemon]))}
        </PokemonGroup>
      );
    } else if (item === ">>") {
      saveChain.push(
        <ContainerArrow key={`arrow_${index}`}>{arrow()}</ContainerArrow>
      );
    } else {
      saveChain.push(
        <PokemonSingle key={`container_${index}`}>
          {children(evolutionDetails[item])}
        </PokemonSingle>
      );
    }
  }

  return saveChain;
};
