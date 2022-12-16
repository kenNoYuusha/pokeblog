import { useParams, Link, useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import { getPokemon, getResource } from "../api/pokemon";
import { PokemonTagType } from "../components/PokemonTagType";

const PokeInfo = () => {
  const { pokemonName } = useParams();
  const [pokemonInfo, setPokemonInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({ isTrue: false });

  useEffect(() => {
    const getPokemonInfo = async () => {
      try {
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
        setError({ isTrue: true, name: err.name, message: err.message });
      }
    };
    getPokemonInfo();
   
  }, [pokemonName]);
  const { id, name, image, description, varieties, evolutionChain } =
    pokemonInfo;
  //console.log(pokemonInfo);
  return (
    <div
      className="absolute top-0 left-0 w-full min-h-screen h-auto bg-slate-700/80 overflow-y-scroll
                 grid grid-rows-6 grid-cols-5 p-20"
    >
      {error.isTrue && (
        <div className="text-3xl font-bold text-white">
          <p>{error.name}</p>
          <p>{error.message}</p>
        </div>
      )}

      {!error.isTrue && !!loading && (
        <p className="text-6xl font-bold text-white">Cargandooo......</p>
      )}

      {!error.isTrue && !loading && (
        <>
          <h3
            className="col-start-1 col-end-6 row-start-1 row-end-2 grid place-items-center
          text-6xl font-bold text-white"
          >{`#${id} ${name}`}</h3>

          <figure className="col-start-1 col-end-4 row-start-2 row-end-5 grid place-items-center p-10">
            <img
              className="object-contain object-center"
              src={image}
              alt={name}
            />
          </figure>
          <p
            className="col-start-4 col-end-6 row-start-2 row-end-5 grid place-items-center p-10
          text-3xl font-bold text-white"
          >
            {description.flavor_text}
          </p>

          <div className="col-start-1 col-end-6 row-start-5 row-end-7 grid place-items-center gap-4">
            <h4 className="text-white text-xl font-bold">Evolution Chaine</h4>
            <div className="flex flex-row gap-x-8 justify-center items-center">
              <EvolutionChain
                chain={evolutionChain}
                direction={() => <p>-----</p>}
              >
                {(character) => (
                  <PokemonCardChain key={character} pokeName={character} />
                )}
              </EvolutionChain>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const EvolutionChain = (props) => {
  let items = [];
  const loopChain = (chain) => {
    if (chain.hasOwnProperty("evolvesTo")) {
      items.push(props.children(chain.name));
      //items.push(props.direction());
      //validar si es array o no
      if (Array.isArray(chain.evolvesTo)) {
        chain.evolvesTo.forEach((item) => loopChain(item));
      } else {
        loopChain(chain.evolvesTo);
      }
    } else {
      items.push(props.children(chain.name));
    }
  };
  loopChain(props.chain);

  return items;
};

const PokemonCardChain = ({ pokeName }) => {
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({ isError: false });
  const { img, id, name, type } = state;

  useEffect(() => {
    const getPokemonChain = async () => {
      try {
        const detailsPokemon = await getPokemon(
          `https://pokeapi.co/api/v2/pokemon/${pokeName}`
        );
        const dataPokemon = {
          id: detailsPokemon.id,
          name: detailsPokemon.name,
          type: detailsPokemon.types,
          img: detailsPokemon.sprites.other["official-artwork"].front_default,
        };

        setState(dataPokemon);
        setLoading(false);
      } catch (err) {
        setError({ isError: true, name: err.name, message: err.message });
      }
    };
    getPokemonChain();
  }, []);

  return (
    <div className="w-80 h-96 flex flex-col items-center gap-4">
      {error.isError && (
        <div>
          <p>{error.name}</p>
          <p>{error.message}</p>
        </div>
      )}
      {!error.isError && !!loading && <p>Estamos Cargando....</p>}
      {!error.isError && !loading && (
        <>
          <Link to={`/pokemon/${name}`}>
            <figure
              className="bg-slate-50 p-4 rounded-lg shadow-md will-change-transform
                     hover:animate-wiggle hover:cursor-pointer
                     dark:bg-slate-900"
            >
              <img
                className="object-contain object-center"
                src={img}
                alt={name}
              />
              <figcaption className="font-bold text-lg text-slate-900 dark:text-slate-50">{`#${id}`}</figcaption>
            </figure>
          </Link>
          <div className="self-start">
            <h3 className="text-xl font-bold text-slate-900 capitalize dark:text-slate-50">
              {name}
            </h3>
            <div className="flex gap-1 mt-2">
              {type.map((item) => (
                <PokemonTagType key={item.type.name} type={item.type.name} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export { PokeInfo };
