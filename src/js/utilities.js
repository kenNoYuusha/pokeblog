export const parsePokemonChain = (pokemonChainApi) => {
  //objeto acumulador de la cadena
  const pokemonNames = {};

  // seteando funcion recursiva, que itera sobre cada objeto de tipo chain
  function getPokemonNames(chain, names) {
    if (Array.isArray(names)) {
      names.push(chain.species.name);
    } else {
      names[chain.species.name] = chain.species.name;
    }
    //si el objeto tiene evolucion se entrara en recursion
    if (chain.evolves_to.length > 0) {
      names[`${chain.species.name}_to`] = ">>";
      //si el objeto tiene mas de 1 evolucion se crea un array para contenerlos
      //de lo contrario se sigue acumulando normalmente
      if (chain.evolves_to.length > 1) {
        names[`${chain.species.name}_evolves`] = [];
        for (const pokemonChain of chain.evolves_to) {
          getPokemonNames(pokemonChain, names[`${chain.species.name}_evolves`]);
        }
      } else {
        getPokemonNames(chain.evolves_to[0], names);
      }
    }
  }
  getPokemonNames(pokemonChainApi, pokemonNames);

  return Object.values(pokemonNames);
};

export const singleArrayChain = (pokemonChainApi) => {
  const pokemonNames = [];

  const getPokemonNames = (chain) => {
    pokemonNames.push(chain.species.name);

    if (chain.evolves_to.length > 0) {
      for (const pokemonChain of chain.evolves_to) {
        getPokemonNames(pokemonChain);
      }
    }
  };
  getPokemonNames(pokemonChainApi);
  return pokemonNames;
};
